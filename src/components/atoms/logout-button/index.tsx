import { LogOut } from "lucide-react";

export const LogoutButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="p-1.5 md:p-2 hover:bg-main/10 rounded-full" title="Logout">
    <LogOut className="w-4 h-4 md:w-5 md:h-5 text-main/80" />
  </button>
);
