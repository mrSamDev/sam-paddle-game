import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../../api/authentication";
import { LogOut, Github } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../../store/authentication";

export function Header() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { signOut, token, initiateGitHubAuth } = useAuthStore();

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

  const isAuthentcatedUser = Boolean(!isLoading && user);
  const showLeaderBoardurl = location.pathname !== "/leader-board" && isAuthentcatedUser;

  return (
    <header className="w-full py-4 md:py-6 border-b border-main/10">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-auto text-center md:text-left">
            <Link to="/">
              <h1 className="text-3xl md:text-4xl font-bold text-main">Paddle Game</h1>
            </Link>
            <p className="text-main/80 text-sm md:pl-2">
              by{" "}
              <a href="https://github.com/mrSamDev" target="_blank" rel="noopener noreferrer" className="hover:text-main hover:underline underline-offset-2">
                Sijo Sam
              </a>
            </p>
          </div>

          {isAuthentcatedUser ? (
            <div className="flex items-center gap-3 md:gap-4 md:ml-auto">
              <div className="text-center md:text-right">
                <p className="font-medium text-main text-sm md:text-base">{user?.githubUsername}</p>
                <p className="text-xs md:text-sm text-main/80">High Score: {user?.score || 0}</p>
                {showLeaderBoardurl && (
                  <Link to="/leader-board">
                    <p className="text-xs md:text-sm text-main/80 underline">View leaderboard</p>
                  </Link>
                )}
              </div>
              <div className="relative">
                <img src={user?.avatarUrl} alt={user?.githubUsername} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-main/20" />
              </div>
              <button onClick={handleLogout} className="p-1.5 md:p-2 hover:bg-main/10 rounded-full" title="Logout">
                <LogOut className="w-4 h-4 md:w-5 md:h-5 text-main/80" />
              </button>
            </div>
          ) : (
            <button
              onClick={initiateGitHubAuth}
              className="w-full md:w-auto md:ml-auto flex items-center justify-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-main/90 transition-colors"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
