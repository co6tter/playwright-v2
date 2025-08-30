import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth/useAuth";

export default function NavBar() {
  const { logout } = useAuth();
  const nav = useNavigate();
  return (
    <header className="border-b">
      <nav className="max-w-4xl mx-auto flex items-center gap-4 p-3">
        <Link to="/">Dashboard</Link>
        <Link to="/new">New</Link>
        <div className="flex-1" />
        <button
          data-testid="nav-logout"
          onClick={() => {
            logout();
            nav("/login");
          }}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
