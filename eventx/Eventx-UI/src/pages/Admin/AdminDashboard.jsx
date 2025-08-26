import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getEvents, getAnalytics } from '../../api/events';
import AdminStats from '../../components/AdminStats';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    ticketsSold: 0,
    activeUsers: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [eventsRes, analyticsRes] = await Promise.all([
        getEvents(),
        getAnalytics()
      ]);
      
      setStats(analyticsRes.data);
      setRecentEvents(eventsRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your event overview.</p>
        </div>

        <AdminStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Events */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
            <div className="space-y-4">
              {recentEvents.map(event => (
                <div key={event._id} className="flex items-center justify-between p-4 border-b">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition">
                📊 View Analytics
              </button>
              <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition">
                🎫 Manage Tickets
              </button>
              <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition">
                👥 Attendee Insights
              </button>
              <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition">
                📈 Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}