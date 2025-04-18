import mongoose from "mongoose";

const MentorshipSchema = new mongoose.Schema(
  {
    isAvalaible: {
      type: Boolean,
      default: false,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    mentees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps:true
  }
);
const MentorshipModel =
  mongoose.models.mentorships ||
  mongoose.model("mentorships", MentorshipSchema);

export default MentorshipModel;
