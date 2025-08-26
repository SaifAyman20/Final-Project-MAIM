import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventAttendeeInsights } from '../../api/analytics';

export default function AttendeeInsights() {
  const { id } = useParams();
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInsights();
  }, [id]);

  const fetchInsights = async () => {
    try {
      const res = await getEventAttendeeInsights(id);
      setInsights(res.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
      setError('Failed to load insights');
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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No insights available for this event.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Attendee Insights – {insights.eventName}
          </h1>
          <div className="text-gray-600 space-y-1">
            <p>Event Venue: {insights.venue}</p>
            <p>Event Date: {new Date(insights.date).toLocaleDateString()}</p>
            <p>Event Time: {insights.time}</p>
            <p>Total Attendees: {insights.totalAttendees}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Age Demographics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">ATTENDEE AGE DISTRIBUTION</h2>
            <div className="space-y-3">
              {insights.ageGroups?.map((group, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{group.name}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12">
                      {group.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">ENGAGEMENT METRICS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-900 mb-1">
                  {insights.engagement?.instagram?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-blue-700">Instagram Mentions</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-900 mb-1">
                  {insights.engagement?.facebook?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-green-700">Facebook Shares</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-900 mb-1">
                  {insights.engagement?.twitter?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-purple-700">Twitter Tweets</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-900 mb-1">
                  {insights.engagement?.checkIns?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-orange-700">QR Check-ins</div>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">ATTENDEE LOCATIONS</h2>
            <div className="space-y-3">
              {insights.locations?.map((location, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-700">{location.name}</span>
                  <span className="font-medium text-gray-900">{location.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">ATTENDEE INTERESTS</h2>
            <div className="flex flex-wrap gap-2">
              {insights.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}