import Organizer from "../models/Organizer.js";

// @desc    Get organizer profile by ID
// @route   GET /api/organizer-profile/:id
// @access  Private (Organizers only)
export const getOrganizerProfile = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id).select("-password");

    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: organizer,
    });
  } catch (error) {
    console.error("GET ORGANIZER PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving organizer profile",
      error: error.message,
    });
  }
};

// @desc    Update organizer profile by ID
// @route   PUT /api/organizer-profile/:id
// @access  Private (Owner only)
export const updateOrganizerProfile = async (req, res) => {
  try {
    const organizerId = req.params.id;

    // Check if the logged-in organizer matches the ID in the request params
    // req.user is populated by protectOrganizer middleware
    if (req.user._id.toString() !== organizerId) {
      return res.status(403).json({
        success: false,
        message: "Access denied: You can only update your own profile",
      });
    }

    const {
      name,
      email,
      organization,
      role,
      phone,
      website,
      bio,
      eventTypes,
      domains,
    } = req.body;

    const organizer = await Organizer.findById(organizerId);

    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    // Update fields if they are provided in request body
    if (name !== undefined) organizer.name = name;
    if (email !== undefined) organizer.email = email;
    if (organization !== undefined) organizer.organization = organization;
    if (role !== undefined) organizer.role = role;
    if (phone !== undefined) organizer.phone = phone;
    if (website !== undefined) organizer.website = website;
    if (bio !== undefined) organizer.bio = bio;
    if (eventTypes !== undefined) organizer.eventTypes = eventTypes;
    if (domains !== undefined) organizer.domains = domains;

    const updatedOrganizer = await organizer.save();

    // Remove password field from the response object
    const organizerResponse = updatedOrganizer.toObject();
    delete organizerResponse.password;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: organizerResponse,
    });
  } catch (error) {
    console.error("UPDATE ORGANIZER PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating organizer profile",
      error: error.message,
    });
  }
};
