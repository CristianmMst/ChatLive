import { API_URL, CLIENT_URL } from "@/consts";
import axios from "@/modules/shared/utils/axios";
import { ILogin, IRegister } from "../types/auth";

export const login = async (user: ILogin) => {
  await axios.post("/auth/login", user);
};

export const register = async (user: IRegister) => {
  await axios.post("/auth/register", user);
};

export const verifyUser = async () => {
  const { data } = await axios.post("/user/profile");
  return data;
};

export const logout = async (id: string | undefined) => {
  await axios.post(`/auth/logout/${id}`);
  window.open(`${CLIENT_URL}/login`, "_self");
};

export const google = async () => {
  window.open(`${API_URL}/auth/google`, "_self");
};
