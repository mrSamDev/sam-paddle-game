import { useQuery } from "@tanstack/react-query";
import { getLeaderBoard } from "../api/leaderboard";

export const useGetLeaderBoard = () => {
  return useQuery({
    queryKey: ["leader-board"],
    queryFn: getLeaderBoard,
  });
};
