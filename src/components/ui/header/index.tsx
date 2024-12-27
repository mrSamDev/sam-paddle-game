import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../../api/authentication";
import { LogOut } from "lucide-react";
import { clsx } from "clsx";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../../store/authentication";

export function Header() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { signOut, token } = useAuthStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    enabled: !!token,
  });

  const handleLogout = () => {
    signOut();
    queryClient.clear();
  };
  console.log("user: ", user);

  const isAuthentcatedUser = Boolean(!isLoading && user);

  const showLeaderBoardurl = location.pathname !== "/leader-board" && isAuthentcatedUser;

  return (
    <header className="w-full py-6 border-b border-main/10">
      <div className="container mx-auto max-w-3xl px-4">
        <div className={clsx("flex items-center", isAuthentcatedUser ? "justify-between" : "justify-center")}>
          <div className={clsx(isAuthentcatedUser ? "text-left" : "text-center")}>
            <Link to="/">
              <h1 className="text-4xl font-bold text-main mb-2">Paddle Game</h1>
            </Link>
            <p className="text-main/80 pl-2">
              by{" "}
              <a href="https://github.com/mrSamDev" target="_blank" rel="noopener noreferrer" className="hover:text-main hover:underline underline-offset-2">
                Sijo Sam
              </a>
            </p>
          </div>
          {isAuthentcatedUser && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium text-main">{user?.githubUsername}</p>
                <p className="text-sm text-main/80">High Score: {user?.score || 0}</p>
                {showLeaderBoardurl && (
                  <Link to="/leader-board">
                    <p className="text-sm text-main/80 underline">View leaderboard</p>
                  </Link>
                )}
              </div>
              <div className="relative">
                <img src={user?.avatarUrl} alt={user?.githubUsername} className="w-12 h-12 rounded-full border-2 border-main/20" />
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-main/10 rounded-full" title="Logout">
                <LogOut className="w-5 h-5 text-main/80" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
