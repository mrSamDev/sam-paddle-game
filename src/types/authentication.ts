export interface User {
  id: string;
  githubUsername: string;
  avatarUrl: string;
  url: string;
  profileUrl: string;
  name: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  signOut: () => void;
  initiateGitHubAuth: () => void;
}

export interface AuthResponse {
  token: string;
  user: User;
}
