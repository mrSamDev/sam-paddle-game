import React from "react";
import { Link } from "react-router";
import { Avatar } from "../../atoms/avatar";
import { LogoutButton } from "../../atoms/logout-button";
import { BareUser } from "../../../types/authentication";

type UserInfoProps = {
  user?: BareUser;
  showLeaderBoardUrl: boolean;
  onLogout: () => void;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user, showLeaderBoardUrl, onLogout }) => (
  <div className="flex items-center gap-3 md:gap-4 md:ml-auto">
    <div className="text-center md:text-right">
      <p className="font-medium text-main text-sm md:text-base">{user?.githubUsername}</p>
      <p className="text-xs md:text-sm text-main/80">High Score: {user?.score || 0}</p>
      {showLeaderBoardUrl && (
        <Link to="/leader-board">
          <p className="text-xs md:text-sm text-main/80 underline">View leaderboard</p>
        </Link>
      )}
    </div>
    <Avatar size="md" src={user?.avatarUrl || ""} alt={user?.githubUsername || ""} />
    <LogoutButton onClick={onLogout} />
  </div>
);
