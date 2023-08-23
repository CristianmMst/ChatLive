import { useAuthStore } from "@/store/auth";
import { registerUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuthStore((state) => state);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (token) => {
      setToken(token);
      navigate("/");
    },
  });

  return { token, mutate, isLoading, error };
};
