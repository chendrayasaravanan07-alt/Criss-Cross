import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    password:     { type: String, required: true, minlength: 8 },
    university:   { type: String, required: true },
    degree:       { type: String, required: true },
    location:     { type: String, default: "" },
    bio:          { type: String, default: "" },
    profileImage: { type: String, default: "" },
    skills:       [{ type: String }],
    interests:    [{ type: String }],
    eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    bookmarkedEvents:   [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
export default Student;