import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";
import ticketController from "../controllers/ticketController.js";

const router = express.Router();

// User books ticket for event
router.post("/book/:eventId", protect, ticketController.bookTicket);

// User views own tickets
router.get("/me", protect, ticketController.getMyTickets);

// Admin verifies ticket (check-in)
router.put("/verify/:id", protect, adminOnly, ticketController.verifyTicket);

// Get event seats (public)
router.get("/seats/:eventId", ticketController.getEventSeats);

export default router;
