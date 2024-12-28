import { useLocation } from "react-router";
import { UserInfo } from "../../molecules/user-info";
import { LoginButton } from "../../atoms/login-button";
import { CreatorInfo } from "../../atoms/creator-info";
import { useAuth } from "../../../hooks/use-auth";
import { useUser } from "../../../hooks/use-user";

export function Header() {
  const location = useLocation();
  const { token, logout, login } = useAuth();
  const { data: user, isLoading } = useUser({ enabled: !!token });

  const isAuthentcatedUser = Boolean(!isLoading && user);
  const showLeaderBoardurl = location.pathname !== "/leader-board" && isAuthentcatedUser;

  return (
    <header className="w-full py-4 md:py-6 border-b border-main/10">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <CreatorInfo title="Paddle Game" creatorName="Sijo Sam" creatorUrl="https://github.com/mrSamDev" />

          {isAuthentcatedUser ? <UserInfo user={user} showLeaderBoardUrl={showLeaderBoardurl} onLogout={logout} /> : <LoginButton className="md:ml-auto" onLogin={login} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
