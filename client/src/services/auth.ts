import axios from "@/utils/axios";
import { API_URL, CLIENT_URL } from "@/consts";
import { ILogin, IRegister } from "@/types/auth";

export const loginUser = async (user: ILogin) => {
  await axios.post("/auth/login", user);
};

export const registerUser = async (user: IRegister) => {
  const { data } = await axios.post("/auth/register", user);
  return data;
};

export const logout = async (id: string | undefined) => {
  await axios.post(`/auth/logout/${id}`);
  window.open(`${CLIENT_URL}/login`, "_self");
};

export const google = async () => {
  window.open(`${API_URL}/auth/google`, "_self");
};

export const verifyUserAuth = async () => {
  const { data } = await axios.post("/user/profile");
  return data;
};
