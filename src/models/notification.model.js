import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel =
  mongoose.models.notifications ||
  mongoose.model("notifications", notificationSchema);
