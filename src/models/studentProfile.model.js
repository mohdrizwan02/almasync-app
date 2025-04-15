import mongoose from "mongoose";

const StudentProfileSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    enrollmentNumber: {
      type: String,
    },

    dateOfBirth: {
      type: Date,
    },

    mobileNumber: {
      type: String,
    },
    college: {
      type: String,
    },

    admissionYear: {
      type: String,
    },

    passoutYear: {
      type: String,
    },
    degree: {
      type: String,
    },
    department: {
      type: String,
    },

    about: {
      type: String,
    },

    profileHeadline:{
      type:String
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    skills: [{ type: String }],
    education: [
      {
        educationInstitution: String,
        educationDegree: String,
        educationFieldOfStudy: String,
        educationStartYear: Number,
        educationEndYear: Number,
        educationGrade: String,
        educationDescription: String,
        educationAssociatedSkills: [
          {
            type: String,
          },
        ],
      },
    ],
    resume: { type: String },
    internships: [
      {
        internshipCompany: String,
        internshipRole: String,
        internshipLocation: String,
        currentlyWorking: {
          type: Boolean,
          default: false,
        },
        internshipType: String,
        internshipStartDate: Date,
        internshipEndDate: Date,
        internshipDescription: String,
      },
    ],
    mentorshipsNeeds: [
      {
        type: String,
      },
    ],
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    profileHeadline: {
      type: String,
    },
    certifications: [
      {
        certificationName: String,
        certificationOrganization: String,
        certificationIssueDate: Date,
        certificationExpirationDate: Date,
        certificationId: String,
        certificationUrl: String,
        certificationAssociatedSkills: [
          {
            type: String,
          },
        ],
      },
    ],

    socials: {
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
      portfolio: { type: String },
    },

    address: {
      country: String,
      pincode: String,
      landmark: String,
      city: String,
      houseNumber: String,
    },
    hobbies: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StudentProfileModel =
  mongoose.models.studentprofiles ||
  mongoose.model("studentprofiles", StudentProfileSchema);

export default StudentProfileModel;
