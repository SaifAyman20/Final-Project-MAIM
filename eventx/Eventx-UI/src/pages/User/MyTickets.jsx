import { useEffect, useState } from "react";
import { getMyTickets } from "../../api/tickets"; // من tickets.js وليس events.js

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getMyTickets();
        setTickets(res.data);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-black">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
      
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets purchased yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-black text-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2">{ticket.event?.title}</h3>
              <p className="text-gray-300 mb-2">Seat: {ticket.seatNumber}</p>
              <p className="text-gray-300 mb-2">Status: {ticket.status}</p>
              <p className="text-gray-300 mb-4">
                Date: {new Date(ticket.event?.date).toLocaleDateString()}
              </p>
              <div className="flex justify-center">
                <img src={ticket.qrCode} alt="QR Code" className="w-32 h-32" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}