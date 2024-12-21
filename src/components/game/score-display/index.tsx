import React from "react";

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay = ({ score }: ScoreDisplayProps) => {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-main">{score}</div>
      <div className="text-sm text-main/60">SCORE</div>
    </div>
  );
};
