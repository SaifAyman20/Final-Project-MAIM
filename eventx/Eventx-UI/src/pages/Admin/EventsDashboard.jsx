import { useState, useEffect } from "react";
import  API  from "../../api/axios";
import AdminStats from "../../components/AdminStats";

export default function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    activeEvents: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchEvents();
    fetchStats();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events?limit=5");
      setEvents(response.data.events || response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await API.get("/analytics/overview");
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Events Dashboard</h1>
        <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Events</h2>
          <div className="space-y-4">
            {events.slice(0, 5).map((event) => (
              <div key={event._id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(event.date).toLocaleDateString()} • {event.location}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = "/events/create"}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Create New Event
            </button>
            <button 
              onClick={() => window.location.href = "/admin/events"}
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Manage Events
            </button>
            <button 
              onClick={() => window.location.href = "/admin/analytics"}
              className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}