import jwt from "jsonwebtoken";
import Organizer from "../models/Organizer.js";


// GENERATE TOKEN
const generateToken = (id) => {

  return jwt.sign(
    {
      id,
      role: "organizer",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// REGISTER ORGANIZER
export const registerOrganizer = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      organization,
      role,
      phone,
      website,
      bio,
      eventTypes,
      domains,
    } = req.body;

    // CHECK EXISTING
    const existingOrganizer =
      await Organizer.findOne({ email });

    if (existingOrganizer) {
      return res.status(400).json({
        success: false,
        message: "Organizer already exists",
      });
    }

    // CREATE ORGANIZER
    const organizer =
      await Organizer.create({
        name,
        email,
        password,
        organization,
        role,
        phone,
        website,
        bio,
        eventTypes,
        domains,
      });

    res.status(201).json({
      success: true,
      message: "Organizer registered successfully",
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
      },
      token: generateToken(organizer._id),
    });

  } catch (error) {

    console.log("ORGANIZER REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// LOGIN ORGANIZER
export const loginOrganizer = async (
  req,
  res
) => {

  try {

    const { email, password } = req.body;

    // FIND ORGANIZER
    const organizer =
      await Organizer.findOne({ email });

    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await organizer.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(organizer._id),
      organizer: {
        id: organizer._id,
        name: organizer.name,
        email: organizer.email,
      },
    });

  } catch (error) {

    console.log("ORGANIZER LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};