import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  removeToken: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      setToken: (token: string) =>
        set({
          token,
        }),
      removeToken: () => set({ token: null }),
    }),
    {
      name: "token",
    }
  )
);
