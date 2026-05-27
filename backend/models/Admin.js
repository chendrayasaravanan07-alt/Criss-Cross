import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true },
    password:   { type: String, required: true, minlength: 8 },
    employeeId: { type: String, required: true, unique: true },
    department: { type: String, default: "" },
    adminRole:  {
      type: String,
      enum: ["Super Admin", "Event Moderator", "User Manager", "Content Reviewer", "Support Admin", "Analytics Admin"],
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Admin", adminSchema);