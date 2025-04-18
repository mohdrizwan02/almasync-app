import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isJobVerified: {
      type: Boolean,
      default: false,
    },

    isPostedByCollege: {
      type: Boolean,
      default: false,
    },
    jobTitle: {
      type: String,
      required: [true, "job title is required"],
    },
    jobCompany: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },

    // full-time part-time etc
    jobType: {
      type: String,
    },

    // onsite remote etc
    jobWorkType: {
      type: String,
    },

    jobDescription: {
      type: String,
    },

    jobResponsibilities: [
      {
        type: String,
      },
    ],
    jobBenefits: [
      {
        type: String,
      },
    ],
    jobEligibility: [
      {
        type: String,
      },
    ],
    jobSkills: [
      {
        type: String,
      },
    ],
    jobWorkDays: {
      type: Number,
    },
    jobExperienceRequired: {
      type: Number,
    },

    jobSalary: {
      type: String,
    },
    jobDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const JobModel = mongoose.models.jobs || mongoose.model("jobs", JobSchema);

export default JobModel;
