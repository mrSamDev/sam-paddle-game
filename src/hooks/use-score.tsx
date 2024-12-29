import { useMutation } from "@tanstack/react-query";
import { SaveScore } from "../types/leaderboard";
import { updateScore } from "../api/leaderboard";
import { useAuthStore } from "../store/authentication";
import { User } from "@/types/authentication";

export function useScore() {
  const { setUser, user } = useAuthStore();

  const mutation = useMutation<SaveScore, Error, string>({
    mutationFn: updateScore,
  });

  const saveScore = async (score: number) => {
    try {
      const data = await mutation.mutateAsync(score.toString());
      const newUser = { ...user, ...data.user } as User;
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  return {
    saveScore,
    isSavingScore: mutation.isPending,
    score: user?.score || 0,
  };
}
