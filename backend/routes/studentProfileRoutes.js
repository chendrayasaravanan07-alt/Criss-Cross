import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
} from "../controllers/studentProfileController.js";
import { protectStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for student profile
// Both endpoints are protected to ensure only authenticated students can access them
router.get("/:id", protectStudent, getStudentProfile);
router.put("/:id", protectStudent, updateStudentProfile);

export default router;
