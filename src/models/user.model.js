import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    role: {
      type: String,
      enum: ["student", "alumni", "admin"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isProfileVerified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    verifyOtp: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.users || mongoose.model("users", UserSchema);

export default UserModel;
