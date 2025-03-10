import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

const AdminModel =
  mongoose.models.admins || mongoose.model("admins", AdminSchema);

export default AdminModel;
