import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUserData(res.data);
      } catch (error) {
        setMessage("❌ Failed to load profile, please login again.");
        setTimeout(() => navigate("/login"), 1500);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-black text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        {message && <p className="text-center text-sm mb-4">{message}</p>}

        {userData && (
          <div className="space-y-3">
            <p><span className="font-semibold">Name:</span> {userData.name}</p>
            <p><span className="font-semibold">Email:</span> {userData.email}</p>
            <p><span className="font-semibold">Role:</span> {userData.role}</p>
            <p><span className="font-semibold">Gender:</span> {userData.gender}</p>
            <p><span className="font-semibold">Location:</span> {userData.location}</p>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full bg-white text-black py-2 mt-6 rounded-lg font-semibold hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}