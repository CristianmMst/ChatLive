import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  const { setToken } = useAuthStore((state) => state);
  const tokenQuery = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (tokenQuery) {
      setToken(tokenQuery);
    }
  }, [tokenQuery, setToken]);

  return <Navigate to={"/"} />;
};
