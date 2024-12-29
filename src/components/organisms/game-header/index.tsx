import { GAME_SETTINGS } from "../../../data/config";
import { ScoreDisplay } from "../../molecules/score";
import { SelectorButtonGroup } from "../../molecules/selector-button-group";

type Props = {
  handleSpeedChange: (speed: number) => void;
  handlePaddleSpeedChange: (speed: number) => void;
  speedMultiplier: number;
  paddleSpeedMultiplier: number;
  currentScore: number;
};

export const Gameheader = (props: Props) => {
  const { currentScore, handleSpeedChange, handlePaddleSpeedChange, speedMultiplier, paddleSpeedMultiplier } = props;
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-2">
        <SelectorButtonGroup label="Ball Speed:" values={GAME_SETTINGS.BALL_SPEED_OPTIONS} selectedValue={speedMultiplier} onClick={handleSpeedChange} />
        <SelectorButtonGroup label="Paddle Speed:" values={GAME_SETTINGS.PADDLE_SPEED_OPTIONS} selectedValue={paddleSpeedMultiplier} onClick={handlePaddleSpeedChange} />
      </div>

      <ScoreDisplay currentScore={currentScore} />
    </div>
  );
};

Gameheader.displayName = "Gameheader";
