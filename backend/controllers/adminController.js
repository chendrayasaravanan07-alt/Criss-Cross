// import Student from "../models/Student.js";
// import Organizer from "../models/Organizer.js";
// import Admin from "../models/Admin.js";
// import Event from "../models/Event.js";

// /*
//    @desc    Get all users
//    @route   GET /api/admin/users
//    @access  Admin
// */
// export const getAllUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// };

// /*
//    @desc    Delete user
//    @route   DELETE /api/admin/users/:id
//    @access  Admin
// */
// export const deleteUser = async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   await user.deleteOne();
//   res.json({ message: "User deleted successfully" });
// };

// /*
//    @desc    Approve Organizer
//    @route   PUT /api/admin/users/:id/approve
//    @access  Admin
// */
// export const approveOrganizer = async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   if (user.role !== "organizer") {
//     return res.status(400).json({
//       message: "User is not an organizer"
//     });
//   }

//   user.isApproved = true;
//   await user.save();

//   res.json({ message: "Organizer approved successfully" });
// };

// /*
//    @desc    Get all events
//    @route   GET /api/admin/events
//    @access  Admin
// */
// export const getAllEventsAdmin = async (req, res) => {
//   const events = await Event.find().populate(
//     "organizer",
//     "name email"
//   );

//   res.json(events);
// };

// /*
//    @desc    Delete event
//    @route   DELETE /api/admin/events/:id
//    @access  Admin
// */
// export const deleteEvent = async (req, res) => {
//   const event = await Event.findById(req.params.id);

//   if (!event) {
//     return res.status(404).json({ message: "Event not found" });
//   }

//   await event.deleteOne();
//   res.json({ message: "Event deleted successfully" });
// };
import Student from "../models/Student.js";
import Organizer from "../models/Organizer.js";
import Admin from "../models/Admin.js";


// ================= GET ALL USERS =================

export const getAllUsers = async (req, res) => {

  try {

    const students = await Student.find().select("-password");

    const organizers = await Organizer.find().select("-password");

    const admins = await Admin.find().select("-password");

    res.status(200).json({
      success: true,
      totalStudents: students.length,
      totalOrganizers: organizers.length,
      totalAdmins: admins.length,
      students,
      organizers,
      admins,
    });

  } catch (error) {

    console.log("GET USERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= PLATFORM STATS =================

export const getPlatformStats = async (req, res) => {

  try {

    const totalStudents =
      await Student.countDocuments();

    const totalOrganizers =
      await Organizer.countDocuments();

    const totalAdmins =
      await Admin.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        students: totalStudents,
        organizers: totalOrganizers,
        admins: totalAdmins,
        totalUsers:
          totalStudents +
          totalOrganizers +
          totalAdmins,
      },
    });

  } catch (error) {

    console.log("STATS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE STUDENT =================

export const deleteStudent = async (req, res) => {

  try {

    const student = await Student.findById(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {

    console.log("DELETE STUDENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE ORGANIZER =================

export const deleteOrganizer = async (req, res) => {

  try {

    const organizer = await Organizer.findById(
      req.params.id
    );

    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    await Organizer.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Organizer deleted successfully",
    });

  } catch (error) {

    console.log("DELETE ORGANIZER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};