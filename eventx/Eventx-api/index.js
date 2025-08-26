import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // 🟢 استيراد cors

import User from "./src/models/User.js";
import Event from "./src/models/Event.js";
import userRoutes from "./src/routes/userRoutes.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import ticketRoutes from "./src/routes/ticketRoutes.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// 🟢 Middleware
app.use(express.json());

// 🟢 تفعيل CORS عشان الـ React يقدر يكلم الـ API
app.use(
  cors({
    origin: "http://localhost:5173", // ده البورت بتاع Vite React
    credentials: true, // لو هتستعمل Cookies أو Authorization Headers
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/analytics", analyticsRoutes);

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
