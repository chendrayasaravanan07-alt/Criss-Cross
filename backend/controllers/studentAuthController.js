import jwt from "jsonwebtoken";
import Student from "../models/Student.js";


// GENERATE TOKEN
const generateToken = (id) => {

  return jwt.sign(
    {
      id,
      role: "student",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// REGISTER STUDENT
export const registerStudent = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      university,
      degree,
      location,
      bio,
      profileImage,
      skills,
      interests,
    } = req.body;

    // CHECK EXISTING STUDENT
    const existingStudent =
      await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    // CREATE STUDENT
    const student = await Student.create({
      name,
      email,
      password,
      university,
      degree,
      location,
      bio,
      profileImage,
      skills,
      interests,
    });

    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
      token: generateToken(student._id),
    });

  } catch (error) {

    console.log("STUDENT REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// LOGIN STUDENT
export const loginStudent = async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND STUDENT
    const student =
      await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // CHECK PASSWORD
    const isMatch =
      await student.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(student._id),
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });

  } catch (error) {

    console.log("STUDENT LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};