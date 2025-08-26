import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setIsMenuOpen(false);
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* الشعار */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎟</span>
            <h1 className="text-xl font-bold">EventX</h1>
          </Link>

          {/* قائمة للشاشات الكبيرة */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-300 transition-colors duration-200 px-3 py-2">Home</Link>
            <Link to="/events" className="hover:text-blue-300 transition-colors duration-200 px-3 py-2">Events</Link>
            
            {user ? (
              <>
                {isAdmin() && (
                  <>
                    <Link to="/admin/dashboard" className="hover:text-blue-300 transition-colors duration-200 px-3 py-2">Dashboard</Link>
                    <Link to="/events/create" className="hover:text-blue-300 transition-colors duration-200 px-3 py-2">Create Event</Link>
                  </>
                )}
                
                <div className="flex items-center space-x-4 ml-4">
                  <span className="text-blue-300 border-r border-gray-600 pr-4">Welcome, {user.name}</span>
                  <Link to="/profile" className="hover:text-blue-300 transition-colors duration-200">Profile</Link>
                  
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-blue-300 transition-colors duration-200 px-3 py-2">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* زر القائمة للجوال */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* قائمة الجوال */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4 px-4 rounded-lg mt-2">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-blue-300 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/events" className="hover:text-blue-300 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>Events</Link>
              
              {user ? (
                <>
                  {isAdmin() && (
                    <>
                      <Link to="/admin/dashboard" className="hover:text-blue-300 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                      <Link to="/events/create" className="hover:text-blue-300 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>Create Event</Link>
                    </>
                  )}
                  
                  <div className="border-t border-gray-700 pt-3 mt-3">
                    <div className="text-blue-300 py-2">Welcome, {user.name}</div>
                    <Link to="/profile" className="hover:text-blue-300 transition-colors duration-200 py-2 block" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 w-full mt-3 flex items-center justify-center space-x-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-300 transition-colors duration-200 py-2" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}