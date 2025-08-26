import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await login({ email, password });
      console.log("Login successful:", result);
      
      setMessage("✅ Logged in successfully!");
      setTimeout(() => {
        navigate("/events");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
      
      // عرض رسالة الخطأ من الخادم إذا كانت متاحة
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Login failed, check your credentials.";
      
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p className={`text-center text-sm mt-3 ${
            message.includes("✅") ? "text-green-400" : "text-red-400"
          }`}>
            {message}
          </p>
        )}

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-semibold hover:underline">
            Register
          </Link>
        </p>

        {/* زر للتجربة */}
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300 mb-2">For testing:</p>
          <button
            type="button"
            onClick={() => {
              setEmail("test@example.com");
              setPassword("password123");
            }}
            className="text-xs bg-gray-700 text-white px-2 py-1 rounded"
          >
            Fill Test Data
          </button>
        </div>
      </div>
    </div>
  );
}