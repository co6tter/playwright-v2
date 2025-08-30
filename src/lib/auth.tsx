import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const TOKEN_KEY = "demo_token_v1";

type AuthContextValue = {
  isAuthed: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setAuthed] = useState<boolean>(false);

  useEffect(() => {
    setAuthed(Boolean(localStorage.getItem(TOKEN_KEY)));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthed,
      async login(username, password) {
        if (username === "admin" && password === "playwright") {
          localStorage.setItem(TOKEN_KEY, "ok");
          setAuthed(true);
          return true;
        }
        return false;
      },
      logout() {
        localStorage.removeItem(TOKEN_KEY);
        setAuthed(false);
      },
    }),
    [isAuthed],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider is missing");
  return ctx;
}
