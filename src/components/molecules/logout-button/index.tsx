import { LogOut } from "lucide-react";
import { Button } from "../../atoms/button/button";
import { useAuth } from "../../../hooks/use-auth";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return (
    <Button onClick={logout} icon={LogOut}>
      Logout
    </Button>
  );
};
