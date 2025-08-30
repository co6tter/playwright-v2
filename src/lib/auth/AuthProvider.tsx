import React, { useEffect, useMemo, useState } from "react";
import { AuthContext, type AuthContextValue } from "./context";

const TOKEN_KEY = "demo_token_v1";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthed, setAuthed] = useState(false);

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

export default AuthProvider;
