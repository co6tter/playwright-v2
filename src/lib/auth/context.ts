import { createContext } from "react";

export type AuthContextValue = {
  isAuthed: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
