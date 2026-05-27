import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient:      { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "recipientModel" },
    recipientModel: { type: String, required: true, enum: ["Student", "Organizer"] },
    message:        { type: String, required: true },
    title:          { type: String, required: true },
    type:           { type: String, enum: ["event_approved", "event_rejected", "registration", "reminder", "new_event"], required: true },
    isRead:         { type: Boolean, default: false },
    relatedEvent:   { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);