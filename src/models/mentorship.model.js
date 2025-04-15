import mongoose from "mongoose";

const MentorshipSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  },
  mentees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: users,
    },
  ],
});
const MentorshipModel =
  mongoose.models.mentorships ||
  mongoose.model("mentorships", MentorshipSchema);

export default MentorshipModel;
