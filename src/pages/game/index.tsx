import { useEffect, useRef, useState, useCallback } from "react";
import { BASE_GAME_STATE, COLORS, FONTS, GAME_SETTINGS, PARTICLE_SETTINGS, PARTICLE_TYPES } from "../../data/config";
import type { GameState, Particle, ParticleColors, ParticleEventType, PowerUp, PowerUpType } from "../../types";

const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(GAME_SETTINGS.INITIAL_BALL_SPEED);
  const [paddleSpeedMultiplier, setPaddleSpeedMultiplier] = useState(GAME_SETTINGS.BASE_PADDLE_SPEED);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  // check the fps.md file in info folder for more info
  const lastTimeRef = useRef<number>(0);
  const fpsIntervalRef = useRef<number>(1000 / 60);
  const startTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  const gameState = useRef<GameState>(BASE_GAME_STATE);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    gameState.current = {
      ...gameState.current,
      ...BASE_GAME_STATE,
      ballSpeedX: GAME_SETTINGS.INITIAL_BALL_SPEED * speedMultiplier,
      ballSpeedY: GAME_SETTINGS.INITIAL_BALL_SPEED * speedMultiplier,
      paddleX: canvas.width / 2 - GAME_SETTINGS.INITIAL_PADDLE_WIDTH / 2,
      score: 0,
      paddleWidth: GAME_SETTINGS.INITIAL_PADDLE_WIDTH,
      powerUps: [],
      isGameOver: false,
    };

    setCurrentScore(0);

    lastTimeRef.current = performance.now();
    startTimeRef.current = performance.now();
    frameCountRef.current = 0;

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [speedMultiplier]);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= GAME_SETTINGS.MOBILE_BREAKPOINT);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleSpeedChange = (multiplier: number) => {
    setSpeedMultiplier(multiplier);
    const state = gameState.current;

    const directionX = Math.sign(state.ballSpeedX);
    const directionY = Math.sign(state.ballSpeedY);

    const ballSpeedX = GAME_SETTINGS.INITIAL_BALL_SPEED * directionX * multiplier;
    const ballSpeedY = GAME_SETTINGS.INITIAL_BALL_SPEED * directionY * multiplier;

    state.ballSpeedX = ballSpeedX;
    state.ballSpeedY = ballSpeedY;
  };

  const handlePaddleSpeedChange = (multiplier: number) => {
    setPaddleSpeedMultiplier(multiplier);
  };

  const createParticles = useCallback((x: number, y: number, type: ParticleEventType, powerUpType?: PowerUpType) => {
    const count = PARTICLE_SETTINGS.COUNTS[type];
    let color: string;

    if (type === "POWER_UP_COLLECT" && powerUpType) {
      color = COLORS.PARTICLES.POWER_UPS.COLLECT[powerUpType];
    } else {
      color = COLORS.PARTICLES[type as keyof Omit<ParticleColors, "POWER_UPS">];
    }

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      particles.push({
        x,
        y,
        speedX: Math.cos(angle) * PARTICLE_SETTINGS.SPEED,
        speedY: Math.sin(angle) * PARTICLE_SETTINGS.SPEED,
        life: PARTICLE_SETTINGS.INITIAL_LIFE,
        color,
      });
    }

    gameState.current.particles.push(...particles);
  }, []);

  const spawnPowerUp = useCallback(() => {
    const types: Array<PowerUp["type"]> = ["wider", "smaller", "faster", "slower"];
    const type = types[Math.floor(Math.random() * types.length)];

    gameState.current.powerUps.push({
      x: Math.random() * (canvasRef.current?.width || GAME_SETTINGS.CANVAS.WIDTH - 20) + 10,
      y: 0,
      type,
      speed: 2,
      color: COLORS.POWER_UPS[type],
    });
  }, []);

  const applyPowerUp = useCallback(
    (type: PowerUp["type"]) => {
      const state = gameState.current;
      switch (type) {
        case "wider":
          state.paddleWidth = Math.min(state.paddleWidth * GAME_SETTINGS.SPEED_MULTIPLIERS.PADDLE_WIDER, 150);
          break;
        case "smaller":
          state.paddleWidth = Math.max(state.paddleWidth * GAME_SETTINGS.SPEED_MULTIPLIERS.PADDLE_SMALLER, 40);
          break;
        case "faster":
          state.ballSpeedX *= GAME_SETTINGS.SPEED_MULTIPLIERS.POWER_UP_FASTER;
          state.ballSpeedY *= GAME_SETTINGS.SPEED_MULTIPLIERS.POWER_UP_FASTER;
          break;
        case "slower":
          state.ballSpeedX *= GAME_SETTINGS.SPEED_MULTIPLIERS.POWER_UP_SLOWER;
          state.ballSpeedY *= GAME_SETTINGS.SPEED_MULTIPLIERS.POWER_UP_SLOWER;
          break;
      }

      setTimeout(() => {
        if (type === "wider" || type === "smaller") {
          state.paddleWidth = 80;
        } else if (type === "faster" || type === "slower") {
          state.ballSpeedX = state.ballSpeedX > 0 ? 5 * speedMultiplier : -5 * speedMultiplier;
          state.ballSpeedY = state.ballSpeedY > 0 ? 5 * speedMultiplier : -5 * speedMultiplier;
        }
      }, GAME_SETTINGS.POWER_UP_DURATION);
    },
    [speedMultiplier]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      keysPressed.current.add(e.code);

      if (e.code === "Space") {
        if (gameState.current.isGameOver) {
          resetGame();
        } else {
          gameState.current.isPaused = !gameState.current.isPaused;
          if (!gameState.current.isPaused) {
            lastTimeRef.current = performance.now();
            requestRef.current = requestAnimationFrame(updateGame);
          }
        }
      }
    },
    [resetGame]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current.delete(e.code);
  }, []);

  const updatePaddlePosition = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState.current.isPaused) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    const currentSpeed = GAME_SETTINGS.BASE_PADDLE_SPEED * paddleSpeedMultiplier;

    if (keysPressed.current.has("ArrowLeft")) {
      gameState.current.paddleX -= currentSpeed;
    }
    if (keysPressed.current.has("ArrowRight")) {
      gameState.current.paddleX += currentSpeed;
    }

    const isPaddleHittingLeftWall = gameState.current.paddleX < 0;
    const isPaddleHittingRightWall = gameState.current.paddleX > canvas.width - gameState.current.paddleWidth;

    if (isPaddleHittingLeftWall) gameState.current.paddleX = 0;
    if (isPaddleHittingRightWall) gameState.current.paddleX = canvas.width - gameState.current.paddleWidth;
  }, [paddleSpeedMultiplier]);

  const updateGame = useCallback(() => {
    const currentTime = performance.now();
    const elapsed = currentTime - lastTimeRef.current;

    requestRef.current = requestAnimationFrame(updateGame);

    const isTimeLessThanFrameRate = elapsed < fpsIntervalRef.current;

    if (isTimeLessThanFrameRate) {
      return;
    }

    const sinceStart = currentTime - startTimeRef.current;

    frameCountRef.current++;

    if (sinceStart > 1000) {
      startTimeRef.current = currentTime;
      frameCountRef.current = 0;
    }

    const delta = elapsed / (1000 / 60);
    lastTimeRef.current = currentTime - (elapsed % fpsIntervalRef.current);

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;

    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = COLORS.BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const state = gameState.current;

    if (state.isPaused) {
      ctx.font = `${FONTS.SIZES.LARGE} ${FONTS.PRIMARY}`;
      ctx.fillStyle = COLORS.TEXT;
      ctx.textAlign = "center";
      ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    if (state.isGameOver) {
      ctx.font = `${FONTS.SIZES.LARGE} ${FONTS.PRIMARY}`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(String(state.score), canvas.width / 2, canvas.height / 2.5 - 30);
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 30);
      ctx.font = `${FONTS.SIZES.MEDIUM} ${FONTS.PRIMARY}`;
      ctx.fillText("Press Space to Try Again", canvas.width / 2, canvas.height / 2 + 10);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    updatePaddlePosition();

    state.ballX += state.ballSpeedX * delta;

    state.ballY += state.ballSpeedY * delta;

    const isBallHittingWall = state.ballX > canvas.width - state.ballSize || state.ballX < state.ballSize;

    const isBallHittingCeiling = state.ballY < state.ballSize;

    const isBallInPaddleZone = state.ballY > canvas.height - (GAME_SETTINGS.PADDLE_BOTTAM_DELTA + GAME_SETTINGS.PADDLE_HEIGHT) - state.ballSize;

    const isBallAlignedWithPaddle = state.ballX > state.paddleX && state.ballX < state.paddleX + state.paddleWidth;

    const isBallHittingPaddle = isBallInPaddleZone && isBallAlignedWithPaddle;

    const isBallBelowPaddle = state.ballY > canvas.height;

    if (isBallHittingWall) {
      state.ballSpeedX = -state.ballSpeedX;
      createParticles(state.ballX, state.ballY, PARTICLE_TYPES.wallCollision);
    }

    if (isBallHittingCeiling) {
      state.ballSpeedY = -state.ballSpeedY;
      createParticles(state.ballX, state.ballY, PARTICLE_TYPES.cellingCollision);
    }

    if (isBallHittingPaddle) {
      state.ballSpeedY = -state.ballSpeedY;
      state.score += GAME_SETTINGS.SCORE_INCREMENT;
      setCurrentScore(state.score);
      createParticles(state.ballX, state.ballY, PARTICLE_TYPES.paddingCollision);

      const shouldSpawnPowerUp = Math.random() < 0.2;
      if (shouldSpawnPowerUp) {
        spawnPowerUp();
      }
    }

    if (isBallBelowPaddle) {
      state.isGameOver = true;
      createParticles(state.ballX, state.ballY, PARTICLE_TYPES.gameOver);
    }

    state.particles = state.particles.filter((particle) => {
      particle.x += particle.speedX * delta;
      particle.y += particle.speedY * delta;
      particle.life -= 0.02;

      if (particle.life > 0) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      }

      return false;
    });

    state.powerUps = state.powerUps.filter((powerUp) => {
      powerUp.y += powerUp.speed * delta;

      const isPowerUpInPaddleZone = powerUp.y > canvas.height - 30;
      const isPowerUpAlignedWithPaddle = powerUp.x > state.paddleX && powerUp.x < state.paddleX + state.paddleWidth;
      const isPowerUpCollected = isPowerUpInPaddleZone && isPowerUpAlignedWithPaddle;

      if (isPowerUpCollected) {
        applyPowerUp(powerUp.type);
        createParticles(powerUp.x, powerUp.y, PARTICLE_TYPES.powerUpCollect, powerUp.type);
        return false;
      }

      ctx.beginPath();
      ctx.arc(powerUp.x, powerUp.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = powerUp.color;
      ctx.fill();

      return powerUp.y < canvas.height;
    });

    ctx.beginPath();
    ctx.arc(state.ballX, state.ballY, state.ballSize, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.BALL;
    ctx.fill();

    ctx.fillStyle = COLORS.PADDLE;
    ctx.fillRect(state.paddleX, canvas.height - GAME_SETTINGS.PADDLE_BOTTAM_DELTA, state.paddleWidth, GAME_SETTINGS.PADDLE_HEIGHT);
  }, [createParticles, spawnPowerUp, applyPowerUp, updatePaddlePosition]);

  useEffect(() => {
    if (!isMobile) {
      const canvas = canvasRef.current;
      if (canvas) ctxRef.current = canvas?.getContext("2d");
      startTimeRef.current = performance.now();
      lastTimeRef.current = startTimeRef.current;
      requestRef.current = requestAnimationFrame(updateGame);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateGame, isMobile]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  if (isMobile) {
    return (
      <div className="bg-main flex items-center justify-center p-4">
        <div className="bg-muted rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-main mb-4">Desktop Only Game</h1>
          <p className="text-main">Please open this game on a desktop device for the best experience.</p>
          <p className="text-main mt-2">The game requires keyboard controls to play.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 pb-20">
      <div className="bg-muted rounded-lg shadow-md p-6 w-full max-w-3xl border border-main/10">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <div className="flex gap-2 items-center">
              <span className="text-main text-sm">Ball Speed:</span>
              {GAME_SETTINGS.BALL_SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handleSpeedChange(speed)}
                  className={`px-3 py-1 rounded border ${speedMultiplier === speed ? "bg-main text-zinc-100 border-main" : "bg-muted text-main border-main/20 hover:border-main/40"}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-main text-sm">Paddle Speed:</span>
              {GAME_SETTINGS.PADDLE_SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => handlePaddleSpeedChange(speed)}
                  className={`px-3 py-1 rounded border ${paddleSpeedMultiplier === speed ? "bg-main text-zinc-100 border-main" : "bg-muted text-main border-main/20 hover:border-main/40"}`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
          {/* Add prominent score display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-main">{currentScore}</div>
            <div className="text-sm text-main/60">SCORE</div>
          </div>
        </div>

        <div className="bg-main rounded-lg overflow-hidden border border-main/10">
          <canvas tabIndex={0} ref={canvasRef} width={GAME_SETTINGS.CANVAS.WIDTH} height={GAME_SETTINGS.CANVAS.HEIGHT} className="w-full" />
        </div>

        <div className="mt-4 space-y-2 text-center text-main prose prose-sijo">
          <p>Use left and right arrow keys to move the paddle</p>
          <p>Press Space to pause/resume or try again after game over</p>
        </div>
      </div>
    </main>
  );
};

export default CanvasGame;
