import { Trophy } from "lucide-react";

type Props = {
  currentScore: number;
};

export function ScoreDisplay({ currentScore }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 w-full md:w-auto justify-between md:justify-end">
      <div className="text-center">
        <div className="text-4xl font-bold text-main">{currentScore}</div>
        <div className="text-sm text-main/60">SCORE</div>
      </div>

      {/* {isAuthenticated && currentScore > 0 && ( */}
      <button
        // onClick={handleSaveScore}
        className="flex items-center gap-2 px-4 py-2 bg-main/10 hover:bg-main/20 rounded-lg text-main transition-colors"
      >
        <Trophy className="w-4 h-4" />
        <span className="text-sm">Save Score</span>
      </button>
      {/* )} */}
    </div>
  );
}
