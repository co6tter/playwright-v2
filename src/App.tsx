import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./lib/auth/AuthProvider";
import { useAuth } from "./lib/auth/useAuth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ItemForm from "./pages/ItemForm";
import NavBar from "./components/NavBar";

function Guard({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth();
  return isAuthed ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Guard>
                <NavBar />
                <Dashboard />
              </Guard>
            }
          />
          <Route
            path="/new"
            element={
              <Guard>
                <NavBar />
                <ItemForm />
              </Guard>
            }
          />
          <Route
            path=":id/edit"
            element={
              <Guard>
                <NavBar />
                <ItemForm />
              </Guard>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
