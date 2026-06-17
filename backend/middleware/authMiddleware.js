import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Organizer from "../models/Organizer.js";

export const protect = (...roles) => {

  return async (req, res, next) => {

    try {

      let token;

      // CHECK TOKEN
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      // NO TOKEN
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }

      // VERIFY TOKEN
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // FIND ADMIN
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found",
        });
      }

      // STORE USER
      req.user = admin;

      // ROLE CHECK
      if (
        roles.length > 0 &&
        !roles.includes("admin")
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();

    } catch (error) {

      console.log("AUTH ERROR:", error);

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
};

export const protectStudent = async (req, res, next) => {
  try {
    let token;

    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ROLE CHECK
    if (decoded.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Students only",
      });
    }

    // FIND STUDENT
    const student = await Student.findById(decoded.id).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // STORE STUDENT
    req.user = student;
    next();

  } catch (error) {
    console.log("STUDENT AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const protectOrganizer = async (req, res, next) => {
  try {
    let token;

    // CHECK TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // NO TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ROLE CHECK
    if (decoded.role !== "organizer") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Organizers only",
      });
    }

    // FIND ORGANIZER
    const organizer = await Organizer.findById(decoded.id).select("-password");

    if (!organizer) {
      return res.status(404).json({
        success: false,
        message: "Organizer not found",
      });
    }

    // STORE ORGANIZER
    req.user = organizer;
    next();

  } catch (error) {
    console.log("ORGANIZER AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};