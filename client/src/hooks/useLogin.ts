import { useAuthStore } from "@/store/auth";
import { loginUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuthStore((state) => state);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (token) => {
      setToken(token);
      navigate("/");
    },
  });

  return { token, mutate, isLoading, error };
};
