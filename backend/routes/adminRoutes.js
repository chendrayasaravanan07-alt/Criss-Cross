import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  getAllUsers,
  deleteUser,
  approveOrganizer,
  getAllEventsAdmin,
  deleteEvent
} from "../controllers/adminController.js";

const router = express.Router();

// All routes below require Admin access
router.use(protect, authorizeRoles("admin"));

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/approve", approveOrganizer);

router.get("/events", getAllEventsAdmin);
router.delete("/events/:id", deleteEvent);

export default router;
