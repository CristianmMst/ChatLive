import axios from "@/modules/shared/utils/axios";
import { LoginData, RegisterData } from "../types/auth";
import { CLIENT_URL, API_URL } from "@/modules/shared/consts";

export const login = async (user: LoginData) => {
  await axios.post("/auth/login", user);
};

export const register = async (user: RegisterData) => {
  await axios.post("/auth/register", user);
};

export const verifyUser = async () => {
  const { data } = await axios.post("/user/profile");
  return data;
};

export const logout = async (id: string | undefined) => {
  await axios.post(`/auth/logout/${id}`);
  window.location.href = `${CLIENT_URL}/login`;
};

export const google = async () => {
  window.location.href = `${API_URL}/auth/google`;
};
