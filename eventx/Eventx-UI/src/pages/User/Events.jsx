import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEvents } from "../../api/events"; // تم التصحيح من ../api/ إلى ../../api/
import { useAuth } from "../../context/AuthContext"; // تأكد من هذا المسار أيضاً

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data.events || res.data);
      } catch (error) {
        setMessage("Failed to load events.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (message) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">{message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Events</h2>

        {isAdmin() && (
          <button
            onClick={() => navigate("/events/create")}
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            + Create Event
          </button>
        )}
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-black text-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-300 mb-4 line-clamp-2">
                {event.description}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                📍 {event.location} | 📅{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              <Link
                to={`/events/${event._id}`}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}