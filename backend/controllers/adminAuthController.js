import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// ================= GENERATE TOKEN =================

const generateToken = (id) => {
  return jwt.sign(
    { id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


// ================= REGISTER ADMIN =================

export const registerAdmin = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      employeeId,
      department,
      role,
      accessKey,
    } = req.body;

    // CHECK EXISTING ADMIN
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already registered",
      });
    }

    // ACCESS KEY CHECK
    if (
      accessKey.trim() !==
      process.env.ADMIN_ACCESS_KEY.trim()
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid access key",
      });
    }

    // CREATE ADMIN
    const admin = await Admin.create({
      name,
      email,
      password,
      employeeId,
      department,
      role,
      accessKey,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token: generateToken(admin._id),
    });

  } catch (error) {

    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN ADMIN =================

export const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body;

    // FIND ADMIN
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};