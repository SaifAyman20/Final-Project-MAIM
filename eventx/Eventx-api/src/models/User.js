import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    location: {
      type: String,
      default: "Unknown",
    },
    birthYear: {
      type: Number, // مثال: 1998
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
