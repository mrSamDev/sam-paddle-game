import { useMutation } from "@tanstack/react-query";
import { SaveScore } from "../types/leaderboard";
import { updateScore } from "../api/leaderboard";
import { useToast } from "./use-toast";

export function useSaveScore() {
  const { toast } = useToast();

  const mutation = useMutation<SaveScore, Error, string>({
    mutationFn: updateScore,
  });

  const saveScore = async (score: number) => {
    try {
      await mutation.mutateAsync(score.toString());

      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } catch (error) {
      console.error("Save score error:", error);
      throw error;
    }
  };

  return {
    saveScore,
    isLoading: mutation.isPending,
  };
}
