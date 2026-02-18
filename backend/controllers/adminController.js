import User from "../models/User.js";
import Event from "../models/Event.js";

/*
   @desc    Get all users
   @route   GET /api/admin/users
   @access  Admin
*/
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/*
   @desc    Delete user
   @route   DELETE /api/admin/users/:id
   @access  Admin
*/
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};

/*
   @desc    Approve Organizer
   @route   PUT /api/admin/users/:id/approve
   @access  Admin
*/
export const approveOrganizer = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "organizer") {
    return res.status(400).json({
      message: "User is not an organizer"
    });
  }

  user.isApproved = true;
  await user.save();

  res.json({ message: "Organizer approved successfully" });
};

/*
   @desc    Get all events
   @route   GET /api/admin/events
   @access  Admin
*/
export const getAllEventsAdmin = async (req, res) => {
  const events = await Event.find().populate(
    "organizer",
    "name email"
  );

  res.json(events);
};

/*
   @desc    Delete event
   @route   DELETE /api/admin/events/:id
   @access  Admin
*/
export const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  await event.deleteOne();
  res.json({ message: "Event deleted successfully" });
};
