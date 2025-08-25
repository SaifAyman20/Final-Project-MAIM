import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seatNumber: {
      type: String, // مثال: "A1", "B4"
      required: true,
    },
    qrCode: {
      type: String, // base64 string أو URL نولده بالـ qrcode
    },
    status: {
      type: String,
      enum: ["booked", "checked-in"],
      default: "booked",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
