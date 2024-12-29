import { BareUser } from "./authentication";

export type LeaderboardItem = {
  githubUsername: string;
  score: number;
  avatarUrl: string;
  profileUrl: string;
};

export type LeaderboardResponse = {
  leaderboard: LeaderboardItem[];
};

export type SaveScore = {
  user: BareUser;
};
