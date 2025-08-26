import { createContext, useContext, useState, useEffect } from "react";
import { login, register, getProfile } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await getProfile();
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const loginUser = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user || res.data);
      return res.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await register(data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user || res.data);
      return res.data;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  const value = {
    user,
    loading,
    login: loginUser,
    register: registerUser,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};