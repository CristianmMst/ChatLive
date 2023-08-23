import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { verifyUserAuth } from "@/services/auth";

export const useAuth = () => {
  const { setUser } = useUserStore((state) => state);
  const { token, removeToken } = useAuthStore((state) => state);

  const { isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: () => verifyUserAuth(token),
    onError: () => {
      removeToken();
    },
    onSuccess: ({ user }) => {
      setUser(user);
    },
    retry: 1,
  });

  return { token, isLoading, error };
};
