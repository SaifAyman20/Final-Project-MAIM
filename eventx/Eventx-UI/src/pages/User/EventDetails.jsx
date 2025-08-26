import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TicketBooking from '../../components/TicketBooking'; // المسار الصحيح
import { getEventById } from '../../api/events'; // المسار الصحيح

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        setEvent(res.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Event not found</h2>
          <p className="text-gray-600">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="text-lg font-semibold">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Venue</p>
                  <p className="text-lg font-semibold">{event.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-lg font-semibold">${event.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Available Seats</p>
                  <p className="text-lg font-semibold">{event.availableSeats}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-700 leading-relaxed">{event.description}</p>
              </div>

              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                  Share Event
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50">
                  Add to Calendar
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Event Location</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Map will be displayed here</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <TicketBooking event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}