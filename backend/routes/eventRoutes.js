import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventController.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", protect, authorizeRoles("organizer"), createEvent);

export default router;
