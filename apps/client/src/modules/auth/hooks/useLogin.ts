import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
  });

  return { mutate, isLoading, error };
};
