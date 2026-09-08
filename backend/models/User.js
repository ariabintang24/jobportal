import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },
    avatar: String,
    resume: String,

    // For employer
    companyName: String,
    companyDescription: String,
    companyLogo: String,
  },

  { timestamps: true },
);

// Encrypt password before save
// (next) dihapus
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  // next();
});

// Match entered password to hashed password in database
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
