import { useAuth } from "../../../hooks/use-auth";
import { useScore } from "../../../hooks/use-score";
import { Button } from "../../atoms/button/button";

type Props = {
  currentScore: number;
};

export function ScoreDisplay({ currentScore }: Props) {
  const { isAuthenticated } = useAuth();
  const { isSavingScore, saveScore } = useScore();

  const onClick = () => {
    saveScore(currentScore);
  };

  return (
    <div className="w-full md:w-auto">
      {isAuthenticated ? (
        <Button isLoading={isSavingScore} className="w-full md:w-auto" onClick={onClick}>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{currentScore}</span>
            <span className="text-xs opacity-60">SAVE SCORE</span>
          </div>
        </Button>
      ) : (
        <div className="text-center">
          <div className="text-4xl font-bold text-main">{currentScore}</div>
          <div className="text-sm text-main/60">SCORE</div>
        </div>
      )}
    </div>
  );
}
