import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-600">Admin privileges required to access this page.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-300">Welcome, {user.name}</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`block py-2 px-4 rounded transition ${isActive("/admin/dashboard")}`}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/events"
                className={`block py-2 px-4 rounded transition ${isActive("/admin/events")}`}
              >
                🎪 Manage Events
              </Link>
            </li>
            <li>
              <Link
                to="/admin/analytics"
                className={`block py-2 px-4 rounded transition ${isActive("/admin/analytics")}`}
              >
                📈 Analytics & Reports
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-800 transition text-gray-300"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}