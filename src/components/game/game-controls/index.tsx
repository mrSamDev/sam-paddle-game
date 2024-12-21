import React from "react";
import { GAME_SETTINGS } from "../../../data/config";

interface GameControlsProps {
  speedMultiplier: number;
  paddleSpeedMultiplier: number;
  onSpeedChange: (speed: number) => void;
  onPaddleSpeedChange: (speed: number) => void;
}

export const GameControls = ({ speedMultiplier, paddleSpeedMultiplier, onSpeedChange, onPaddleSpeedChange }: GameControlsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <span className="text-main text-sm">Ball Speed:</span>
        {GAME_SETTINGS.BALL_SPEED_OPTIONS.map((speed) => (
          <button
            key={speed}
            onClick={() => onSpeedChange(speed)}
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
            onClick={() => onPaddleSpeedChange(speed)}
            className={`px-3 py-1 rounded border ${paddleSpeedMultiplier === speed ? "bg-main text-zinc-100 border-main" : "bg-muted text-main border-main/20 hover:border-main/40"}`}
          >
            {speed}x
          </button>
        ))}
      </div>
    </div>
  );
};
