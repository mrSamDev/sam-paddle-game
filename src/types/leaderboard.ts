export type LeaderboardItem = {
  githubUsername: string;
  score: number;
  avatarUrl: string;
  profileUrl: string;
};

export type LeaderboardResponse = {
  leaderboard: LeaderboardItem[];
};
