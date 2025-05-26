import { getAuthCookie } from "@/utils/authCookie";
import { create } from "zustand";


export const useUserContext = create((set) => {
  const token = getAuthCookie();
  return {
    user: null,
    state: token ? "loading" : "unlogged",
    setUser: (user) =>
      set((prev) => ({ ...prev, user, state: user ? "logged" : "unlogged" })),
    setUserLogin: (user) =>
      set((prev) => ({ ...prev, user, state: user ? "login" : "unlogged" })),
  };
});
