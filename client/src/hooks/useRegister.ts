import { registerUser } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  return { mutate, isLoading, error };
};
