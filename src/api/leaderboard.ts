import client from "./base";
import { LeaderboardResponse, SaveScore } from "../types/leaderboard";
export async function getLeaderBoard() {
  const leaderboardlist = await client.get<LeaderboardResponse>("leaderboard").json();
  return leaderboardlist;
}

export async function updateScore(score: string) {
  const data = await client
    .put(`leaderboard/score`, {
      json: { score: Number(score) },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .json<SaveScore>();

  if (!data.user) {
    throw new Error("Update score failed");
  }

  return data;
}
