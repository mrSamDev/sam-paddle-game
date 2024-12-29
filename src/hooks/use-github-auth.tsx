import { useMutation } from "@tanstack/react-query";
import { validateGithubToken } from "../api/authentication";
import { AuthResponse } from "../types/authentication";

export const useGithubAuth = () => {
  return useMutation<AuthResponse, Error, string>({
    mutationFn: validateGithubToken,
  });
};
