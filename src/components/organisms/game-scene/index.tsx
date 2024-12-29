import { forwardRef } from "react";
import { GAME_SETTINGS } from "../../../data/config";
import { Button } from "../../atoms/button/button";

type Props = {
  className?: string;
  isEnabled?: boolean;
};

export const GameScene = forwardRef<HTMLCanvasElement, Props>(({ className, isEnabled = false }, ref) => {
  return (
    <div className={`bg-main rounded-lg overflow-hidden border border-main/10 ${className || ""}`}>
      {!isEnabled ? (
        <div style={{ width: GAME_SETTINGS.CANVAS.WIDTH, height: GAME_SETTINGS.CANVAS.HEIGHT }} className="items-center flex justify-center bg-main/50 hover:bg-main/70 transition-all p-4">
          <Button>Press here to start the game</Button>
        </div>
      ) : (
        <canvas tabIndex={0} ref={ref} width={GAME_SETTINGS.CANVAS.WIDTH} height={GAME_SETTINGS.CANVAS.HEIGHT} className="w-full" />
      )}
    </div>
  );
});

GameScene.displayName = "GameScene";
