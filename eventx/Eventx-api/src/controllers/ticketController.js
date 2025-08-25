import asyncHandler from "express-async-handler";
import QRCode from "qrcode";
import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";

// @desc    Book a ticket
// @route   POST /api/tickets/book/:eventId
// @access  Private
const bookTicket = asyncHandler(async (req, res) => {
  const { seatNumber } = req.body;
  const eventId = req.params.eventId;

  const event = await Event.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Check if seat already booked in event
  if (event.bookedSeats.includes(seatNumber)) {
    res.status(400);
    throw new Error("Seat already booked");
  }

  // Check total seats limit
  if (event.bookedSeats.length >= event.totalSeats) {
    res.status(400);
    throw new Error("No more seats available");
  }

  // Create ticket
  const ticket = new Ticket({
    event: eventId,
    user: req.user._id,
    seatNumber,
  });

  // Generate QR code with ticket ID
  const qrData = `${ticket._id}-${req.user._id}-${eventId}`;
  ticket.qrCode = await QRCode.toDataURL(qrData);

  await ticket.save();

  // Update event booked seats
  event.bookedSeats.push(seatNumber);
  await event.save();

  res.status(201).json(ticket);
});

// @desc    Get my tickets
// @route   GET /api/tickets/me
// @access  Private
const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id })
    .populate("event", "title date location price")
    .sort({ createdAt: -1 });

  res.json(tickets);
});

// @desc    Verify ticket (QR check-in)
// @route   PUT /api/tickets/verify/:id
// @access  Admin
const verifyTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "event user",
    "title name email"
  );

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // Mark checked-in
  ticket.status = "checked-in";
  await ticket.save();

  res.json({ message: "Ticket verified", ticket });
});

// @desc    Get event seats (available vs booked)
// @route   GET /api/tickets/seats/:eventId
// @access  Public
const getEventSeats = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.json({
    totalSeats: event.totalSeats,
    bookedSeats: event.bookedSeats,
    availableSeats: event.totalSeats - event.bookedSeats.length,
  });
});

export default {
  bookTicket,
  getMyTickets,
  verifyTicket,
  getEventSeats,
};
