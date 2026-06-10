import Student from "../models/Student.js";

// @desc    Get student profile by ID
// @route   GET /api/student-profile/:id
// @access  Private
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("GET STUDENT PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving student profile",
      error: error.message,
    });
  }
};

// @desc    Update student profile by ID
// @route   PUT /api/student-profile/:id
// @access  Private (Owner only)
export const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Check if the logged-in student matches the ID in the request params
    // req.user is populated by protectStudent middleware
    if (req.user._id.toString() !== studentId) {
      return res.status(403).json({
        success: false,
        message: "Access denied: You can only update your own profile",
      });
    }

    const {
      location,
      bio,
      profileImage,
      skills,
      interests,
      university,
      degree,
      name, // optional extra fields if needed, but primary are location, bio, profileImage, skills, interests, university, degree
    } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Update fields if they are provided in request body
    if (name !== undefined) student.name = name;
    if (location !== undefined) student.location = location;
    if (bio !== undefined) student.bio = bio;
    if (profileImage !== undefined) student.profileImage = profileImage;
    if (skills !== undefined) student.skills = skills;
    if (interests !== undefined) student.interests = interests;
    if (university !== undefined) student.university = university;
    if (degree !== undefined) student.degree = degree;

    const updatedStudent = await student.save();

    // Remove password field from the response object
    const studentResponse = updatedStudent.toObject();
    delete studentResponse.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: studentResponse,
    });
  } catch (error) {
    console.error("UPDATE STUDENT PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating student profile",
      error: error.message,
    });
  }
};
