import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";
import eventController from "../controllers/eventController.js";

const router = express.Router();

// Admin creates event
router.post("/", protect, adminOnly, eventController.createEvent);

// Public list
router.get("/", eventController.getEvents);

// User-specific BEFORE :id
router.get("/liked/me", protect, eventController.getLikedEvents);
router.get("/user/me", protect, eventController.getUserEvents);

// Public single
router.get("/:id", eventController.getEventById);

// Admin updates/deletes
router.put("/:id", protect, adminOnly, eventController.updateEvent);
router.delete("/:id", protect, adminOnly, eventController.deleteEvent);

// Actions
router.put("/:id/rsvp", protect, eventController.toggleRSVP);
router.put("/:id/like", protect, eventController.toggleLike);
router.post("/:id/comments", protect, eventController.addComment);
router.delete("/:id/comments/:commentId", protect, eventController.deleteComment);

export default router;
