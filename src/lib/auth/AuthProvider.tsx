import { useMemo, useState } from "react";
import { AuthContext, type AuthContextValue } from "./context";

const TOKEN_KEY = "demo_token_v1";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ 初期値を同期的に取得（初回から正しい値）
  const [isAuthed, setAuthed] = useState<boolean>(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );

  const value: AuthContextValue = useMemo(
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
}
