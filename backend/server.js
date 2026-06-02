import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import organizerRoutes from "./routes/organizerRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/organizer", organizerRoutes);

app.get("/", (req, res) => res.send("Criss-Cross API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ 🚀 Server running on port ${PORT}`));