import { create } from "zustand";
import { User } from "@/types/user";

interface userStore extends User {
  setUser: (user: User) => void;
}

export const useUserStore = create<userStore>((set) => ({
  id: undefined,
  email: undefined,
  username: undefined,
  setUser: (user: User) =>
    set({
      id: user.id,
      email: user.email,
      username: user.username,
    }),
}));
