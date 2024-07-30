import { User } from "@/types/user";
import { useUserStore } from "@/store/user";
import { useQuery } from "@tanstack/react-query";
import { verifyUserAuth } from "@/services/auth";

export const useAuth = () => {
  const { setUser } = useUserStore((state) => state);

  const { isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: () => verifyUserAuth(),
    onSuccess: (user: User) => {
      setUser(user);
    },
    retry: 1,
  });

  return { isLoading, error };
};
