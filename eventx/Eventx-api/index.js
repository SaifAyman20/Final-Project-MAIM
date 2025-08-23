import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./src/models/User.js";
import Event from "./src/models/Event.js";
import userRoutes from "./src/routes/userRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Middleware to handle JSON
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB error:", err));

// Simple test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
