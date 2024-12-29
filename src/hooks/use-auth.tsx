import { useCallback } from "react";
import { useAuthStore } from "../store/authentication";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { token, user, isAuthenticated, signOut, initiateGitHubAuth } = useAuthStore();

  const handleGitHubLogin = useCallback(() => {
    initiateGitHubAuth();
  }, [initiateGitHubAuth]);

  const handleLogout = () => {
    signOut();
    queryClient.clear();
  };

  return {
    token,
    user,
    isAuthenticated,
    login: handleGitHubLogin,
    logout: handleLogout,
  };
};
