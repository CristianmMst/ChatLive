import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
  id?: string;
  email?: string;
  avatar?: string;
  username?: string;
}

interface userStore extends User {
  setUser: (user: User) => void;
}

export const useUserStore = create<userStore>()(
  devtools(
    (set) => ({
      id: undefined,
      email: undefined,
      avatar: undefined,
      username: undefined,
      setUser: (user: User) =>
        set({
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          username: user.username,
        }),
    }),
    { name: "User" },
  ),
);
