import client from "./base";
import { LeaderboardResponse } from "../types/leaderboard";
export async function getLeaderBoard() {
  const leaderboardlist = await client.get<LeaderboardResponse>("leaderboard").json();
  return leaderboardlist;
}
