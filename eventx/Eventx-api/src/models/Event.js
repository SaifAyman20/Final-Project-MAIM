import mongoose from "mongoose";

// Event schema
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Event title is required
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true, // Event date is required
    },
    location: {
      type: String,
      required: true, // Event location is required
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt & updatedAt
);

// Export model
const Event = mongoose.model("Event", eventSchema);
export default Event;