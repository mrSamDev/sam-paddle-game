import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/authentication";

interface UseUserOptions {
  enabled?: boolean;
}

export const useUser = ({ enabled = true }: UseUserOptions = {}) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    enabled: enabled,
  });
};
