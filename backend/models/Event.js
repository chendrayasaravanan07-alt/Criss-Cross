import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    organizer:   { type: mongoose.Schema.Types.ObjectId, ref: "Organizer", required: true },
    eventType:   { type: String, required: true },
    domain:      { type: String, default: "" },
    mode:        { type: String, enum: ["Online", "Offline", "Hybrid"], required: true },
    location:             { type: String, default: "Virtual" },
    startDate:            { type: Date, required: true },
    endDate:              { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    maxParticipants:      { type: Number, required: true },
    currentParticipants:  { type: Number, default: 0 },
    prizePool:            { type: String, default: "" },
    tags:                 [{ type: String }],
    thumbnail:            { type: String, default: "" },
    status:      { type: String, enum: ["pending", "approved", "rejected", "ongoing", "completed"], default: "pending" },
    approvedBy:          { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    registeredStudents:  [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);