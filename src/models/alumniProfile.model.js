import mongoose from "mongoose";

const AlumniProfileSchema = new mongoose.Schema({
  alumni: {
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
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },

  about: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  communicationLanguages: [
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
  availableForMentorship: {
    type: Boolean,
    default: false,
  },
  mentorshipExperience: {
    type: Number,
  },
  mentorshipTopics: [
    {
      type: String,
    },
  ],
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
  experience: [
    {
      employmentCompany: String,
      employmentPosition: String,
      employmentLocation: String,
      currentlyWorking: {
        type: Boolean,
        default: false,
      },

      // full-time part-time etc
      employmentType: String,

      //onsite remote etc
      employmentWorkType: String,
      employmentStartDate: Date,
      employmentEndDate: Date,
      employmentDescription: String,
    },
  ],
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
});

const alumniProfileModel =
  mongoose.models.alumniprofiles ||
  mongoose.model("alumniprofiles", AlumniProfileSchema);

  export default alumniProfileModel