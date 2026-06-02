import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    email:      { type: String, required: true, unique: true, lowercase: true },
    password:   { type: String, required: true, minlength: 8 },
    employeeId: { type: String, required: true, unique: true },
    department: { type: String, default: "" },
    accessKey:  { type: String, required: true },
    role:  {
      type: String,
      enum: ["Super Admin", "Event Moderator", "User Manager", "Content Reviewer", "Support Admin", "Analytics Admin"],
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function () {

  // IF PASSWORD NOT MODIFIED
  if (!this.isModified("password")) {
    return;
  }

  // HASH PASSWORD
  this.password = await bcrypt.hash(this.password, 12);

});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Admin", adminSchema);