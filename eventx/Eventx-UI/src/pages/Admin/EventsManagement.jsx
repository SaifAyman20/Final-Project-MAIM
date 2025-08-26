import { useState, useEffect } from "react";
// استيراد API بشكل صحيح
import API from "../../api/axios";

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      const endpoint = filter === "all" ? "/events" : `/events?status=${filter}`;
      const response = await API.get(endpoint);
      setEvents(response.data.events || response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
      alert("Event deleted successfully");
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading events...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                event.status === 'active' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {event.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${event.price}</span>
                <span className="text-sm text-gray-500">
                  {event.bookedSeats}/{event.totalSeats} seats
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>Venue: {event.location}</p>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Time: {event.time}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex space-x-2">
                <button 
                  onClick={() => window.location.href = `/admin/events/${event._id}`}
                  className="flex-1 bg-blue-50 text-blue-700 py-2 rounded font-medium hover:bg-blue-100"
                >
                  View Details
                </button>
                <button 
                  onClick={() => deleteEvent(event._id)}
                  className="px-3 bg-red-50 text-red-700 rounded font-medium hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No events found.
        </div>
      )}
    </div>
  );
};

export default EventsManagement;