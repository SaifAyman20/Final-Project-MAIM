import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../../api/events";

export default function EditEvent() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    totalSeats: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        const event = res.data;
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date.split("T")[0],
          location: event.location,
          category: event.category || "",
          totalSeats: event.totalSeats || "",
          price: event.price || ""
        });
      } catch (error) {
        setMessage("❌ Failed to load event details.");
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.date || 
        !formData.location || !formData.totalSeats || !formData.price) {
      setMessage("⚠️ All fields are required!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await updateEvent(id, formData);
      setMessage("✅ Event updated successfully!");
      setTimeout(() => {
        navigate("/events");
      }, 1200);
    } catch (error) {
      console.error("Update event error:", error);
      setMessage("❌ Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8">
      <div className="bg-black text-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Event</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-black"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-black"
            rows="3"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-black"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-black"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg text-black"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="totalSeats"
                placeholder="Total Seats"
                value={formData.totalSeats}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 rounded-lg text-black"
              />
            </div>
            <div>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg text-black"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>

        {message && (
          <p className={`text-center text-sm mt-3 ${
            message.includes("✅") ? "text-green-400" : "text-red-400"
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}