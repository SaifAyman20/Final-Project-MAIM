import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // اللي هيستقبل النوتيفيكيشن
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // اللي عمل الحدث (تعليق / لايك / RSVP)
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    type: { 
      type: String, 
      enum: ["comment", "like", "rsvp"], 
      required: true 
    }, // نوع النوتيفيكيشن
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
