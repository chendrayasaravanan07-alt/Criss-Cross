import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const organizerSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    password:     { type: String, required: true, minlength: 8 },
    organization: { type: String, required: true },
    role:         { type: String, required: true },
    phone:        { type: String, default: "" },
    website:      { type: String, default: "" },
    bio:          { type: String, default: "" },
    eventTypes:   [{ type: String }],
    domains:      [{ type: String }],
    eventsCreated:[{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    isVerified:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

organizerSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

});

organizerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Organizer", organizerSchema);