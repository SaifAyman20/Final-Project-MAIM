import asyncHandler from "express-async-handler";
import Event from "../models/Event.js";
import Notification from "../models/Notification.js";

// @desc    Create new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, category } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    location,
    category,
    user: req.user._id,
  });

  res.status(201).json(event);
});

// @desc    Get all events (with search, pagination, category filter)
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.search
    ? {
        title: { $regex: req.query.search, $options: "i" },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};

  const filter = { ...keyword, ...category };

  const count = await Event.countDocuments(filter);

  const events = await Event.find(filter)
    .populate("user", "name email")
    .populate("attendees", "name email")
    .populate("comments.user", "name email")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ date: -1 });

  res.json({ events, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("user", "name email")
    .populate("attendees", "name email")
    .populate("comments.user", "name email");

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (owner only)
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this event");
  }

  const { title, description, date, location, category } = req.body;

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;
  event.category = category || event.category;

  const updatedEvent = await event.save();
  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (owner only)
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this event");
  }

  await event.deleteOne();
  res.json({ message: "Event removed" });
});

// @desc    RSVP (Attend / Cancel)
// @route   PUT /api/events/:id/rsvp
// @access  Private
const toggleRSVP = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const isAttending = event.attendees.includes(req.user._id);

  if (isAttending) {
    event.attendees.pull(req.user._id);
    await event.save();
    res.json({ message: "Attendance canceled", attendees: event.attendees });
  } else {
    event.attendees.push(req.user._id);
    await event.save();

    // Create notification
    await Notification.create({
      user: event.user,
      type: "RSVP",
      message: `${req.user.name} is attending your event "${event.title}"`,
      event: event._id,
    });

    res.json({ message: "Attendance confirmed", attendees: event.attendees });
  }
});

// @desc    Like / Unlike event
// @route   PUT /api/events/:id/like
// @access  Private
const toggleLike = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const isLiked = event.likes.includes(req.user._id);

  if (isLiked) {
    event.likes.pull(req.user._id);
    await event.save();
    res.json({ message: "Unliked", likesCount: event.likes.length });
  } else {
    event.likes.push(req.user._id);
    await event.save();

    // Create notification
    await Notification.create({
      user: event.user,
      type: "Like",
      message: `${req.user.name} liked your event "${event.title}"`,
      event: event._id,
    });

    res.json({ message: "Liked", likesCount: event.likes.length });
  }
});

// @desc    Add comment
// @route   POST /api/events/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const comment = {
    user: req.user._id,
    text: req.body.text,
  };

  event.comments.push(comment);
  await event.save();

  // Create notification
  await Notification.create({
    user: event.user,
    type: "Comment",
    message: `${req.user.name} commented on your event "${event.title}"`,
    event: event._id,
  });

  const updatedEvent = await Event.findById(req.params.id).populate("comments.user", "name email");

  res.status(201).json(updatedEvent.comments);
});

// @desc    Delete comment
// @route   DELETE /api/events/:id/comments/:commentId
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  const comment = event.comments.id(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this comment");
  }

  comment.deleteOne();
  await event.save();

  res.json({ message: "Comment removed" });
});

// @desc    Get events liked by current user
// @route   GET /api/events/liked/me
// @access  Private
const getLikedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ likes: req.user._id }).populate("user", "name email");
  res.json(events);
});

// @desc    Get events created by current user
// @route   GET /api/events/user/me
// @access  Private
const getUserEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user._id }).populate("user", "name email");
  res.json(events);
});

export default {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  toggleRSVP,
  toggleLike,
  addComment,
  deleteComment,
  getLikedEvents,
  getUserEvents,
};
