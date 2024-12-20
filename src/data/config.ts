import type { ParticleCounts } from "../types";

export const COLORS = {
  BACKGROUND: "#1a1a1a",
  TEXT: "white",
  BALL: "#60a5fa",
  PADDLE: "#4a5568",
  WALL_COLLISION_PARTICLE: "#60a5fa",
  PADDLE_COLLISION_PARTICLE: "#22c55e",
  GAME_OVER_PARTICLE: "#ef4444",
  PARTICLES: {
    WALL_COLLISION: "#60a5fa",
    CEILING_COLLISION: "#60a5fa",
    PADDLE_COLLISION: "#22c55e",
    GAME_OVER: "#ef4444",
    POWER_UPS: {
      COLLECT: {
        wider: "#22c55e",
        smaller: "#ef4444",
        faster: "#3b82f6",
        slower: "#a855f7",
      },
    },
  },
  POWER_UPS: {
    wider: "#22c55e",
    smaller: "#ef4444",
    faster: "#3b82f6",
    slower: "#a855f7",
  },
};

export const CONTROLS = {
  PAUSE: "Space",
  MOVE_LEFT: "ArrowLeft",
  MOVE_RIGHT: "ArrowRight",
};

export const GAME_SETTINGS = {
  PADDLE_HEIGHT: 10,

  PADDLE_BOTTAM_DELTA: 20,

  BASE_PADDLE_SPEED: 4,
  INITIAL_BALL_SPEED: 2,
  INITIAL_PADDLE_WIDTH: 80,
  INITIAL_BALL_SIZE: 10,

  BALL_SPEED_OPTIONS: [0.5, 1, 1.5, 2, 2.5, 3],
  PADDLE_SPEED_OPTIONS: [1, 3, 4, 8, 10],

  POWER_UP_DURATION: 5000,
  POWER_UP_SPAWN_CHANCE: 0.2,
  MOBILE_BREAKPOINT: 768,
  CANVAS: {
    WIDTH: 700,
    HEIGHT: 400,
  },
  PADDLE_SIZE_LIMITS: {
    MIN: 40,
    MAX: 150,
  },
  SPEED_MULTIPLIERS: {
    POWER_UP_FASTER: 1.2,
    POWER_UP_SLOWER: 0.8,
    PADDLE_WIDER: 1.5,
    PADDLE_SMALLER: 0.75,
  },
  SCORE_INCREMENT: 10,
};

export const FONTS = {
  PRIMARY: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  SIZES: {
    LARGE: "30px",
    MEDIUM: "20px",
  },
};

export const PARTICLE_SETTINGS = {
  COUNTS: {
    WALL_COLLISION: 8,
    CEILING_COLLISION: 8,
    PADDLE_COLLISION: 12,
    GAME_OVER: 20,
    POWER_UP_COLLECT: 15,
  } as ParticleCounts,
  SPEED: 3,
  INITIAL_LIFE: 1,
  DECAY_RATE: 0.02,
  SIZE_MULTIPLIER: 3,
};

export const PARTICLE_TYPES = {
  powerUpCollect: "POWER_UP_COLLECT",
  wallCollision: "WALL_COLLISION",
  cellingCollision: "CEILING_COLLISION",
  paddingCollision: "PADDLE_COLLISION",
  gameOver: "GAME_OVER",
} as const;

export const BASE_GAME_STATE = {
  ballX: GAME_SETTINGS.CANVAS.WIDTH / 2,
  ballY: GAME_SETTINGS.CANVAS.HEIGHT / 10,
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
};
