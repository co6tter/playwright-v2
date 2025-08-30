import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) nav("/");
    else setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border p-6 rounded-xl"
      >
        <h1 className="text-xl font-bold">Sign in</h1>
        {error && (
          <div data-testid="login-error" className="text-red-600">
            {error}
          </div>
        )}
        <label className="block">
          <span>Username</span>
          <input
            data-testid="login-username"
            className="mt-1 w-full border rounded p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block">
          <span>Password</span>
          <input
            data-testid="login-password"
            type="password"
            className="mt-1 w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          data-testid="login-submit"
          className="w-full rounded p-2 border"
        >
          Login
        </button>
      </form>
    </div>
  );
}
