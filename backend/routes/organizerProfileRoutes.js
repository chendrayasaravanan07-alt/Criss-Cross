import express from "express";
import {
  getOrganizerProfile,
  updateOrganizerProfile,
} from "../controllers/organizerProfileController.js";
import { protectOrganizer } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes for organizer profile
router.get("/:id", protectOrganizer, getOrganizerProfile);
router.put("/:id", protectOrganizer, updateOrganizerProfile);

export default router;
