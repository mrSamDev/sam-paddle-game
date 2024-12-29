import { useEffect, useRef, useState, useCallback } from "react";
import { BASE_GAME_STATE, COLORS, FONTS, GAME_SETTINGS, PARTICLE_SETTINGS, PARTICLE_TYPES } from "../../data/config";
import type { GameState, Particle, ParticleColors, ParticleEventType, PowerUp, PowerUpType } from "../../types";

import { Gameheader } from "../../components/organisms/game-header";
import { GameScene } from "../../components/organisms/game-scene";
import { GameInfo } from "../../components/organisms/game-footer";
import { GameMobileInfo } from "../../components/organisms/game-mobile-info";

//hooks
import useIsMobile from "../../hooks/use-ismobile";

// Target 60 FPS
const FRAME_TIME = 1000 / 60;

const CanvasGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [gameStatus, setGameStatus] = useState({
    start: false,
    isFirstTime: false,
  });
  const [currentScore, setCurrentScore] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(GAME_SETTINGS.INITIAL_BALL_SPEED);
  const [paddleSpeedMultiplier, setPaddleSpeedMultiplier] = useState(GAME_SETTINGS.BASE_PADDLE_SPEED);

  const isMobile = useIsMobile(GAME_SETTINGS.MOBILE_BREAKPOINT);

  const requestRef = useRef<number>();
  const keysPressed = useRef<Set<string>>(new Set());
  const lastFrameTimeRef = useRef<number>(0);
  const gameState = useRef<GameState>(BASE_GAME_STATE);

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameState.current = {
      ...gameState.current,
      ...BASE_GAME_STATE,
      ballX: GAME_SETTINGS.CANVAS.WIDTH / 2,
      ballY: GAME_SETTINGS.CANVAS.HEIGHT / 10,
      score: 0,
      paddleWidth: GAME_SETTINGS.INITIAL_PADDLE_WIDTH,
      powerUps: [],
      isGameOver: false,
    };

    setCurrentScore(0);
    lastFrameTimeRef.current = performance.now();

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [speedMultiplier]);

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
            lastFrameTimeRef.current = performance.now();
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

  const updatePaddlePosition = useCallback(
    (delta: number) => {
      const canvas = canvasRef.current;
      if (!canvas || gameState.current.isPaused) {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        return;
      }

      const currentSpeed = GAME_SETTINGS.BASE_PADDLE_SPEED * paddleSpeedMultiplier * delta;

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
    },
    [paddleSpeedMultiplier]
  );

  const updateGame = useCallback(() => {
    const currentTime = performance.now();
    const elapsed = currentTime - lastFrameTimeRef.current;

    if (elapsed < FRAME_TIME) {
      // If less than 16.67ms has passed, wait for next frame
      requestRef.current = requestAnimationFrame(updateGame);
      return;
    }

    // Cap the maximum delta to prevent physics going crazy
    const maxFrames = 3;
    const cappedElapsed = Math.min(elapsed, FRAME_TIME * maxFrames);
    const delta = cappedElapsed / FRAME_TIME;

    lastFrameTimeRef.current = currentTime - (elapsed % FRAME_TIME);

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

    updatePaddlePosition(delta);

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
      const newBallY = canvas.height - (GAME_SETTINGS.PADDLE_BOTTAM_DELTA + GAME_SETTINGS.PADDLE_HEIGHT) - state.ballSize - 1;

      state.ballY = newBallY;
      state.ballSpeedY = -state.ballSpeedY;
      state.score += GAME_SETTINGS.SCORE_INCREMENT;
      setCurrentScore(state.score);
      createParticles(state.ballX, state.ballY, PARTICLE_TYPES.paddingCollision);

      // const shouldSpawnPowerUp = Math.random() < 0.2;
      // if (shouldSpawnPowerUp) {
      //   spawnPowerUp();
      // }
    }

    if (isBallBelowPaddle) {
      state.isGameOver = true;
      createParticles(state.ballX, state.ballY, PARTICLE_TYPES.gameOver);
    }

    state.particles = state.particles.filter((particle) => {
      particle.x += particle.speedX * delta;
      particle.y += particle.speedY * delta;
      particle.life -= 0.02 * delta;

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

    // Update power-ups with proper delta timing
    // state.powerUps = state.powerUps.filter((powerUp) => {
    //   powerUp.y += powerUp.speed * delta;

    //   const isPowerUpInPaddleZone = powerUp.y > canvas.height - 30;
    //   const isPowerUpAlignedWithPaddle = powerUp.x > state.paddleX && powerUp.x < state.paddleX + state.paddleWidth;
    //   const isPowerUpCollected = isPowerUpInPaddleZone && isPowerUpAlignedWithPaddle;

    //   if (isPowerUpCollected) {
    //     applyPowerUp(powerUp.type);
    //     createParticles(powerUp.x, powerUp.y, PARTICLE_TYPES.powerUpCollect, powerUp.type);
    //     return false;
    //   }

    //   ctx.beginPath();
    //   ctx.arc(powerUp.x, powerUp.y, 10, 0, Math.PI * 2);
    //   ctx.fillStyle = powerUp.color;
    //   ctx.fill();

    //   return powerUp.y < canvas.height;
    // });

    // Draw ball and paddle
    ctx.beginPath();
    ctx.arc(state.ballX, state.ballY, state.ballSize, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.BALL;
    ctx.fill();

    ctx.fillStyle = COLORS.PADDLE;
    ctx.fillRect(state.paddleX, canvas.height - GAME_SETTINGS.PADDLE_BOTTAM_DELTA, state.paddleWidth, GAME_SETTINGS.PADDLE_HEIGHT);

    requestRef.current = requestAnimationFrame(updateGame);
  }, [createParticles, spawnPowerUp, applyPowerUp, updatePaddlePosition]);

  const startGame = gameStatus.start;

  useEffect(() => {
    if (!isMobile && startGame) {
      const canvas = canvasRef.current;
      if (canvas) ctxRef.current = canvas?.getContext("2d");
      lastFrameTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(updateGame);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [startGame, updateGame, isMobile]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  if (isMobile) {
    return <GameMobileInfo />;
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 pb-20">
      <div className="bg-muted rounded-lg shadow-md p-6 w-full max-w-3xl border border-main/10">
        <Gameheader
          speedMultiplier={speedMultiplier}
          paddleSpeedMultiplier={paddleSpeedMultiplier}
          currentScore={currentScore}
          handleSpeedChange={handleSpeedChange}
          handlePaddleSpeedChange={handlePaddleSpeedChange}
        />

        <GameScene ref={canvasRef} isEnabled={startGame} />

        <GameInfo />
      </div>
    </div>
  );
};

export default CanvasGame;
