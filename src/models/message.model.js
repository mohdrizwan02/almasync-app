import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    text: String,
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const MessageModel =
  mongoose.models.messages || mongoose.model("messages", messageSchema);

export default MessageModel;
