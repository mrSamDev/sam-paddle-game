import { useEffect, useRef, useState, useCallback } from "react";
import { COLORS, FONTS, GAME_SETTINGS, PARTICLE_SETTINGS } from "./data/config";
import type { GameState, Particle, ParticleColors, ParticleEventType, PowerUp, PowerUpType } from "./types";

const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.5);
  const [paddleSpeedMultiplier, setPaddleSpeedMultiplier] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());

  const gameState = useRef<GameState>({
    ballX: GAME_SETTINGS.CANVAS.WIDTH / 2,
    ballY: GAME_SETTINGS.CANVAS.HEIGHT / 2,
    ballSpeedX: GAME_SETTINGS.INITIAL_BALL_SPEED,
    ballSpeedY: GAME_SETTINGS.INITIAL_BALL_SPEED,
    paddleX: GAME_SETTINGS.CANVAS.WIDTH / 2 - GAME_SETTINGS.INITIAL_PADDLE_WIDTH / 2,
    score: 0,
    particles: [],
    powerUps: [],
    paddleWidth: GAME_SETTINGS.INITIAL_PADDLE_WIDTH,
    ballSize: GAME_SETTINGS.INITIAL_BALL_SIZE,
    isPaused: false,
    isGameOver: false,
  });

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameState.current = {
      ...gameState.current,
      ballX: canvas.width / 2,
      ballY: canvas.height / 2,
      ballSpeedX: GAME_SETTINGS.INITIAL_BALL_SPEED * speedMultiplier,
      ballSpeedY: GAME_SETTINGS.INITIAL_BALL_SPEED * speedMultiplier,
      paddleX: canvas.width / 2 - GAME_SETTINGS.INITIAL_PADDLE_WIDTH / 2,
      score: 0,
      paddleWidth: GAME_SETTINGS.INITIAL_PADDLE_WIDTH,
      powerUps: [],
      isGameOver: false,
    };
    setCurrentScore(0);
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
    const direction = {
      x: Math.sign(state.ballSpeedX),
      y: Math.sign(state.ballSpeedY),
    };
    state.ballSpeedX = 5 * direction.x * multiplier;
    state.ballSpeedY = 5 * direction.y * multiplier;
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
      // Type assertion is safe here because we're using a discriminated union
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
      x: Math.random() * (canvasRef.current?.width || 500 - 20) + 10,
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
          state.paddleWidth = Math.min(state.paddleWidth * 1.5, 150);
          break;
        case "smaller":
          state.paddleWidth = Math.max(state.paddleWidth * 0.75, 40);
          break;
        case "faster":
          state.ballSpeedX *= 1.2;
          state.ballSpeedY *= 1.2;
          break;
        case "slower":
          state.ballSpeedX *= 0.8;
          state.ballSpeedY *= 0.8;
          break;
      }

      setTimeout(() => {
        if (type === "wider" || type === "smaller") {
          state.paddleWidth = 80;
        } else if (type === "faster" || type === "slower") {
          state.ballSpeedX = state.ballSpeedX > 0 ? 5 * speedMultiplier : -5 * speedMultiplier;
          state.ballSpeedY = state.ballSpeedY > 0 ? 5 * speedMultiplier : -5 * speedMultiplier;
        }
      }, 5000);
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
    if (!canvas || gameState.current.isPaused) return;

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
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
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
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    if (state.isGameOver) {
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 30);
      ctx.font = "20px Arial";
      ctx.fillText("Press Space to Try Again", canvas.width / 2, canvas.height / 2 + 10);
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    updatePaddlePosition();

    state.ballX += state.ballSpeedX;
    state.ballY += state.ballSpeedY;

    const isBallHittingWall = state.ballX > canvas.width - state.ballSize || state.ballX < state.ballSize;
    const isBallHittingCeiling = state.ballY < state.ballSize;
    const isBallInPaddleZone = state.ballY > canvas.height - 30 - state.ballSize;
    const isBallAlignedWithPaddle = state.ballX > state.paddleX && state.ballX < state.paddleX + state.paddleWidth;
    const isBallHittingPaddle = isBallInPaddleZone && isBallAlignedWithPaddle;
    const isBallBelowPaddle = state.ballY > canvas.height;

    if (isBallHittingWall) {
      state.ballSpeedX = -state.ballSpeedX;
      createParticles(state.ballX, state.ballY, "WALL_COLLISION");
    }

    if (isBallHittingCeiling) {
      state.ballSpeedY = -state.ballSpeedY;
      createParticles(state.ballX, state.ballY, "CEILING_COLLISION");
    }

    if (isBallHittingPaddle) {
      state.ballSpeedY = -state.ballSpeedY;
      state.score += GAME_SETTINGS.SCORE_INCREMENT;
      setCurrentScore(state.score);
      createParticles(state.ballX, state.ballY, "PADDLE_COLLISION");

      const shouldSpawnPowerUp = Math.random() < 0.2;
      if (shouldSpawnPowerUp) {
        spawnPowerUp();
      }
    }

    if (isBallBelowPaddle) {
      state.isGameOver = true;
      createParticles(state.ballX, state.ballY, "GAME_OVER");
    }

    state.particles = state.particles.filter((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
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
      powerUp.y += powerUp.speed;

      const isPowerUpInPaddleZone = powerUp.y > canvas.height - 30;
      const isPowerUpAlignedWithPaddle = powerUp.x > state.paddleX && powerUp.x < state.paddleX + state.paddleWidth;
      const isPowerUpCollected = isPowerUpInPaddleZone && isPowerUpAlignedWithPaddle;

      if (isPowerUpCollected) {
        applyPowerUp(powerUp.type);
        createParticles(powerUp.x, powerUp.y, "POWER_UP_COLLECT", powerUp.type);
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
    ctx.fillRect(state.paddleX, canvas.height - 20, state.paddleWidth, 10);

    requestRef.current = requestAnimationFrame(updateGame);
  }, [createParticles, spawnPowerUp, applyPowerUp, updatePaddlePosition]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      requestRef.current = requestAnimationFrame(updateGame);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleKeyDown, handleKeyUp, updateGame, isMobile]);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center p-4">
        <div className="bg-muted rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-main mb-4">Desktop Only Game</h1>
          <p className="text-main">Please open this game on a desktop device for the best experience.</p>
          <p className="text-main mt-2">The game requires keyboard controls to play.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main flex flex-col">
      <header className="w-full py-6 border-b border-main/10">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-bold text-main mb-2">Paddle Game</h1>
          <p className="text-main/80">
            by{" "}
            <a href="https://github.com/mrSamDev" target="_blank" rel="noopener noreferrer" className="hover:text-main hover:underline underline-offset-2">
              Sijo Sam
            </a>
          </p>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 pb-20">
        <div className="bg-muted rounded-lg shadow-md p-6 w-full max-w-3xl border border-main/10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-main">Score: {currentScore}</div>
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <span className="text-main text-sm">Ball Speed:</span>
                {[0.5, 1, 1.5, 2, 2.5, 3].map((speed) => (
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
                {[1, 1.5, 2, 2.5, 3].map((speed) => (
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
          </div>

          <div className="bg-main rounded-lg overflow-hidden border border-main/10">
            <canvas ref={canvasRef} width={700} height={300} className="w-full" />
          </div>

          <div className="mt-4 space-y-2 text-center text-main prose prose-sijo">
            <p>Use left and right arrow keys to move the paddle</p>
            <p>Press Space to pause/resume or try again after game over</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-muted border-t border-main/10 py-3 px-4">
        <div className="container mx-auto max-w-3xl flex items-center justify-between text-main/80">
          <span className="text-sm">An experiment to learn Canvas</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mrSamDev/landing-and-blog/blob/main/src/components/PaddleGame.tsx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-main transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              View on GitHub
            </a>
            <a href="blog/paddle-game/" target="_blank" rel="noopener noreferrer" className="hover:text-main hover:underline underline-offset-2">
              Blog
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CanvasGame;
