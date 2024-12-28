import { Github } from "lucide-react";
import clsx from "clsx";

export const LoginButton = ({ onLogin, className = "" }: { onLogin: () => void; className?: string }) => {
  return (
    <button onClick={onLogin} className={clsx("w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:bg-main/90 transition-colors", className)}>
      <Github className="w-5 h-5" />
      Sign in with GitHub
    </button>
  );
};
