import express from "express";
import  protect  from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/")
  .post(protect, createEvent)
  .get(getEvents);

router.route("/:id")
  .get(getEventById)
  .put(protect, updateEvent)  // 🟢 update
  .delete(protect, deleteEvent);  // ❌ delete

export default router;
