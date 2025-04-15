import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    isInternshipVerified: {
      type: Boolean,
      default: false,
    },
    isPostedByCollege:{
      type:Boolean,
      default:false
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
    internshipDuration:{
      type: String
    },
    applied:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const InternshipModel =
  mongoose.models.internships ||
  mongoose.model("internships", InternshipSchema);

export default InternshipModel;
