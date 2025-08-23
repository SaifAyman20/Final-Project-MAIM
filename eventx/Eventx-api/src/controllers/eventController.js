import Event from "../models/Event.js";

// Add new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      user: req.user._id, // from middleware
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name email");
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("user", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the owner of the event
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.date = req.body.date || event.date;
    event.location = req.body.location || event.location;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the logged-in user is the owner
    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
