import mongoose from "mongoose";

const jobApplicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
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

const JobApplicationModel =
  mongoose.models.jobapplications ||
  mongoose.model("jobapplications", jobApplicationSchema);

export default JobApplicationModel;
