import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/events";
import { useAuth } from "../../context/AuthContext";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !date || !location || !category || !totalSeats || !price) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await createEvent({
        title,
        description,
        date,
        location,
        category,
        totalSeats: Number(totalSeats),
        price: Number(price)
      });

      setMessage("✅ Event created successfully!");
      setTimeout(() => {
        navigate("/events");
      }, 1200);
    } catch (error) {
      console.error("Create event error:", error.response?.data || error.message);
      setMessage("❌ Failed to create event: " + (error.response?.data?.message || "Please try again"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
            rows="3"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />
          <input
            type="text"
            placeholder="Category (e.g., music, party)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />
          <input
            type="number"
            placeholder="Total Seats"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>

        {message && <p className="text-center text-sm mt-3">{message}</p>}
      </div>
    </div>
  );
}