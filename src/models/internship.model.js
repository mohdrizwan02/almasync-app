import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  internshipTitle: {
    type: String,
    required: [true, "internship title is required"],
  },
  internshipCompany: {
    type: String,
    required: true,
  },
  internshipLocation: {
    type: String,
    required: true,
  },

  // full-time part-time etc
  internshipType: {
    type: String,
  },

  // onsite remote etc
  internshipWorkType: {
    type: String,
  },

  internshipDescription: {
    type: String,
  },
  internshipResponsibilities: [
    {
      type: String,
    },
  ],
  internshipQualification: [
    {
      type: String,
    },
  ],
  internshipEligibility: [
    {
      type: String,
    },
  ],
  internshipSkills: [
    {
      type: String,
    },
  ],
  internshipWorkDays: {
    type: Number,
  },
  internshipExperienceRequired: {
    type: Number,
  },

  internshipSalary: {
    type: String,
  },
  internshipDeadline: {
    type: Date,
  },
});

const InternshipModel =
  mongoose.models.internships || mongoose.model("internships", InternshipSchema);
