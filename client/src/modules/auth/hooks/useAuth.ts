import { verifyUser } from "../services/auth";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/modules/shared/store/user";

export const useAuth = () => {
  const { setUser } = useUserStore((state) => state);

  const { isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: () => verifyUser(),
    onSuccess: (user) => {
      setUser(user);
    },
    retry: 1,
  });

  return { isLoading, error };
};
