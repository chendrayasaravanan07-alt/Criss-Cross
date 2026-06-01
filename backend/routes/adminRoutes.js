import express from "express";

import {
  registerAdmin,
  loginAdmin,
} from "../controllers/adminAuthController.js";

import {
  getAllUsers,
  getPlatformStats,
  deleteStudent,
  deleteOrganizer,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ================= AUTH ROUTES =================

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);


// ================= ADMIN ROUTES =================

router.get(
  "/users",
  protect("admin"),
  getAllUsers
);

router.get(
  "/stats",
  protect("admin"),
  getPlatformStats
);

router.delete(
  "/users/student/:id",
  protect("admin"),
  deleteStudent
);

router.delete(
  "/users/organizer/:id",
  protect("admin"),
  deleteOrganizer
);

export default router;