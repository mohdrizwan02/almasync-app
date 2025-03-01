import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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
  jobQualification: [
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
});

const JobModel = mongoose.models.jobs || mongoose.model("jobs", JobSchema);
