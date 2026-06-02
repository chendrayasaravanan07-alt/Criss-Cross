import express from "express";

import {
  registerOrganizer,
  loginOrganizer,
} from "../controllers/organizerAuthController.js";

const router = express.Router();

router.post("/register", registerOrganizer);

router.post("/login", loginOrganizer);

export default router;