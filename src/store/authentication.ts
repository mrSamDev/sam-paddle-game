import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import type { User, AuthState } from "../types/authentication";
import { base } from "../constants/config";

type AuthStorePersist = Pick<AuthState, "token" | "isAuthenticated">;

const persistOptions: PersistOptions<AuthState, AuthStorePersist> = {
  name: "auth-storage",
  partialize: (state) => ({
    token: state.token,
    isAuthenticated: state.isAuthenticated,
  }),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,

      setToken: (token: string | null) => {
        set({ token, isAuthenticated: !!token, error: null });
      },

      setUser: (user: User | null) => {
        set({ user });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      signOut: () => {
        set({ token: null, user: null, isAuthenticated: false, error: null });
      },

      initiateGitHubAuth: () => {
        const authUrl = new URL(`${base.API_BASE_URL}/auth/github`);
        window.location.href = authUrl.toString();
      },
    }),
    persistOptions
  )
);
