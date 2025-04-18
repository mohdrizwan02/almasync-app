import mongoose from "mongoose";

const internshipApplicationSchema = mongoose.Schema(
  {
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "internships",
    },
    appliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timeStamps: true,
  }
);

const InternshipApplicationModel =
  mongoose.models.internshipapplications ||
  mongoose.model("internshipapplications", internshipApplicationSchema);

export default InternshipApplicationModel;
