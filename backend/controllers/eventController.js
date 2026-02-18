import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const event = await Event.create({
    ...req.body,
    organizer: req.user._id
  });

  res.status(201).json(event);
};

export const getAllEvents = async (req, res) => {
  const events = await Event.find().populate("organizer", "name email");
  res.json(events);
};
