export interface BareUser {
  githubUsername: string;
  avatarUrl: string;
  url: string;
  profileUrl: string;
  score: number;
}

export interface User extends BareUser {
  id: string;
  name: string;
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
