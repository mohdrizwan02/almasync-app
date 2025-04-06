import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  alumni: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "alumniprofiles",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const MentorModel =
  mongoose.models.mentors || mongoose.model("mentors", MentorSchema);

export default MentorModel;
