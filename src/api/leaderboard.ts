import client from "./base";
import { LeaderboardItem } from "../types/leaderboard";
export async function getLeaderBoard() {
  const leaderboardlist = await client.get<LeaderboardItem[]>("leaderboard").json();
  return leaderboardlist;
}
