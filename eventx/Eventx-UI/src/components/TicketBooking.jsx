import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function TicketBooking({ event }) {
  const [tickets, setTickets] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < tickets) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const generateTicket = () => {
    const data = {
      eventId: event._id,
      eventName: event.title,
      date: event.date,
      time: event.time,
      venue: event.location,
      seats: selectedSeats,
      price: event.price * tickets,
      ticketId: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setTicketData(data);
    return data;
  };

  const handleBooking = async () => {
    setIsBooking(true);
    setTimeout(() => {
      generateTicket();
      setBookingComplete(true);
      setIsBooking(false);
    }, 1500);
  };

  if (bookingComplete && ticketData) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600">Your tickets have been successfully booked.</p>
        </div>

        <div className="border-2 border-dashed border-green-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-lg">{ticketData.eventName}</h4>
              <p className="text-gray-600">{new Date(ticketData.date).toLocaleDateString()} at {ticketData.time}</p>
              <p className="text-gray-600">{ticketData.venue}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">${ticketData.price}</p>
              <p className="text-sm text-gray-600">{ticketData.seats.length} ticket(s)</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Seats: {ticketData.seats.join(', ')}</p>
              <p className="text-sm text-gray-600">Ticket ID: {ticketData.ticketId}</p>
            </div>
            <div className="bg-white p-2 rounded">
              <QRCodeSVG value={JSON.stringify(ticketData)} size={80} />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded flex-1">
            Download Tickets
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="border border-gray-300 text-gray-700 px-6 py-2 rounded flex-1"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Book Tickets for {event.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Tickets</label>
          <select 
            value={tickets}
            onChange={(e) => {
              setTickets(parseInt(e.target.value));
              setSelectedSeats([]);
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} ticket{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-2xl font-bold text-green-600">${(event.price * tickets).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Seats</label>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 20 }, (_, i) => {
            const seat = `A${i + 1}`;
            const isSelected = selectedSeats.includes(seat);
            const isAvailable = i < 15;
            
            return (
              <button
                key={seat}
                onClick={() => isAvailable && handleSeatSelection(seat)}
                disabled={!isAvailable}
                className={`p-2 rounded text-center text-sm ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isAvailable 
                    ? 'bg-gray-200 hover:bg-gray-300' 
                    : 'bg-red-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {seat}
              </button>
            );
          })}
        </div>
        <div className="flex items-center mt-3 space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      <button 
        onClick={handleBooking}
        disabled={selectedSeats.length !== tickets || isBooking}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isBooking ? 'Processing...' : `Pay $${(event.price * tickets).toLocaleString()}`}
      </button>
    </div>
  );
}