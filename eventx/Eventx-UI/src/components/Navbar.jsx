import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center bg-black text-white px-6 py-4">
      <h1 className="text-xl font-bold">🎟 EventX</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
