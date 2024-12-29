import { Github } from "lucide-react";
import { Button } from "../../atoms/button/button";
import clsx from "clsx";
import { useAuth } from "../../../hooks/use-auth";

type LoginButtonProps = {
  className?: string;
};

export const LoginButton = ({ className = "" }: LoginButtonProps) => {
  const { login } = useAuth();
  return (
    <Button onClick={login} icon={Github} className={clsx(className)}>
      Sign in with GitHub
    </Button>
  );
};
