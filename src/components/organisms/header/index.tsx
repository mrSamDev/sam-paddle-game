import { useLocation } from "react-router";
import { UserInfo } from "../../molecules/user-info";
import { LoginButton } from "../../molecules/login-button";
import { CreatorInfo } from "../../atoms/creator-info";
import { useAuth } from "../../../hooks/use-auth";
import { useUser } from "../../../hooks/use-user";
import { useScore } from "../../../hooks/use-score";
import clsx from "clsx";

export function Header({ basicLayout }: { basicLayout?: boolean }) {
  const location = useLocation();
  const { token } = useAuth();
  const { data: user, isLoading } = useUser({ enabled: !!token });
  const { score } = useScore();

  const isAuthentcatedUser = Boolean(!isLoading && user);
  const showLeaderBoardurl = location.pathname !== "/leader-board" && isAuthentcatedUser;

  return (
    <header className="w-full py-4 md:py-6 border-b border-main/10">
      <div className="container mx-auto max-w-3xl px-4">
        <div className={clsx("flex flex-col md:flex-row items-center gap-4", basicLayout && "justify-center")}>
          <CreatorInfo basicLayout={basicLayout} title="Paddle Game" creatorName="Sijo Sam" creatorUrl="https://github.com/mrSamDev" />

          {!basicLayout ? isAuthentcatedUser ? <UserInfo score={score} user={user} showLeaderBoardUrl={showLeaderBoardurl} /> : <LoginButton className="md:ml-auto" /> : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
