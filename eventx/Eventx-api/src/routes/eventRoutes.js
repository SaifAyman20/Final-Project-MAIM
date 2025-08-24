import express from "express";
import protect from "../middleware/authMiddleware.js";
import eventController from "../controllers/eventController.js";

const router = express.Router();

// Events CRUD
router.post("/", protect, eventController.createEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);

// RSVP
router.put("/:id/rsvp", protect, eventController.toggleRSVP);

// Likes
router.put("/:id/like", protect, eventController.toggleLike);
router.get("/liked/me", protect, eventController.getLikedEvents);

// Comments
router.post("/:id/comments", protect, eventController.addComment);
router.delete("/:id/comments/:commentId", protect, eventController.deleteComment);

// User-specific
router.get("/user/me", protect, eventController.getUserEvents);

export default router;
