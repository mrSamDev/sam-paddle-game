import React, { forwardRef } from "react";
import { GAME_SETTINGS } from "../../../data/config";

type Props = {
  className?: string;
};

export const GameScene = forwardRef<HTMLCanvasElement, Props>(({ className }, ref) => {
  return (
    <div className={`bg-main rounded-lg overflow-hidden border border-main/10 ${className || ""}`}>
      <canvas tabIndex={0} ref={ref} width={GAME_SETTINGS.CANVAS.WIDTH} height={GAME_SETTINGS.CANVAS.HEIGHT} className="w-full" />
    </div>
  );
});

GameScene.displayName = "GameScene";
