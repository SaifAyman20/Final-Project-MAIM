import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EventDetails() {
  const { id } = useParams();
  const [event] = useState({
    id: id,
    name: "Colombo Music Festival 2025",
    date: "April 12, 2025",
    venue: "Viharamahadevi Open Air Theater, Colombo",
    time: "6.00PM - 10.30PM",
    description: "Get ready for all tankers biggest music festival – the Colombo Music Festival 2020: A’A This electrifying open-air concert will feature top international and local artists, bringing an unforgettable night of music, lights, and energy to the heart of Colombo! Join 10,000+ music lovers at the Vihoramahodied Open Air Theolar for a right filled with live performances, immersive stage effects, and a festival atmosphere like no other! Whether you’re me perp. rock, ECM, or reggoa, this festival has something for every music enthusiast!",
    ticketPrice: "2000 LKR",
    seatAmount: "1000",
    availableSeats: "822",
    popularity: "High"
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <p className="text-xl font-bold">{event.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <p className="text-xl">{event.date}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Venue</label>
            <p className="text-xl">{event.venue}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
            <p className="text-xl">{event.time}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
          <p className="text-gray-700">
            {event.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-gray-600">Ticket Price</p>
            <p className="text-xl font-bold">{event.ticketPrice}</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-sm text-gray-600">Seat Amount</p>
            <p className="text-xl font-bold">{event.seatAmount}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded">
            <p className="text-sm text-gray-600">Available Seats</p>
            <p className="text-xl font-bold">{event.availableSeats}</p>
          </div>
          <div className="bg-red-50 p-4 rounded">
            <p className="text-sm text-gray-600">Popularity</p>
            <p className="text-xl font-bold">{event.popularity}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Seat Allocation</h3>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span>VIP Seats</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span>General Seats</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
              <span>Available</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Edit Event
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            View Analytics
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Attendee Insights – {event.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-3">ATTENDEE AGE</h3>
            <div className="space-y-2">
              {['18 - 24', '25 - 34', '35 - 44', '45 +'].map((age, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{age}</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-500 rounded-full" 
                      style={{ width: `${20 + index * 25}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Engagement & Social Media Reach</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Instagram Mentions</span>
                <span className="font-bold">5,200</span>
              </div>
              <div className="flex justify-between">
                <span>Facebook Shares</span>
                <span className="font-bold">3,800</span>
              </div>
              <div className="flex justify-between">
                <span>Twitter Tweets</span>
                <span className="font-bold">1,200</span>
              </div>
              <div className="flex justify-between">
                <span>Event Check-Ins (QR scans)</span>
                <span className="font-bold">9,500</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">ATTENDEE LOCATIONS</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Location</th>
                <th className="text-right py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {[
                { location: 'Colombo', count: 227 },
                { location: 'Kandy', count: 123 },
                { location: 'Galle', count: 143 },
                { location: 'Jaffna', count: 70 },
                { location: 'International', count: 52 }
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.location}</td>
                  <td className="text-right py-2">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-semibold mb-3">ATTENDEE INTERESTS</h3>
          <div className="flex flex-wrap gap-2">
            {['Live Music', 'Innovation', 'EDM Music', 'Food Festivals'].map((interest, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}