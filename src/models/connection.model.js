import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
},{
  timestamps:true
});
const ConnectionModel =
  mongoose.models.connections ||
  mongoose.model("connections", ConnectionSchema);

export default ConnectionModel;
