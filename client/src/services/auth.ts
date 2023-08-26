import axios from "@/utils/axios";
import { API_URL } from "@/consts";
import { ILogin, IRegister } from "@/types/auth";

export const loginUser = async (user: ILogin) => {
  const { data } = await axios.post("/auth/login", user);
  return data;
};

export const registerUser = async (user: IRegister) => {
  const { data } = await axios.post("/auth/register", user);
  return data;
};

export const logout = async (id: string) => {
  await axios.get(`/auth/logout/${id}`);
  window.open(`https://chat-live-dun.vercel.app/login`, "_self");
};

export const google = async () => {
  window.open(`${API_URL}/auth/google`, "_self");
};

export const verifyUserAuth = async (token: string | null) => {
  const { data } = await axios.get("/auth/verify", {
    headers: {
      Authorization: token,
    },
  });
  return data;
};
