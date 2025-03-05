import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  collegeCode: String,
  collegeName: String,
  collegeLogo: String,
  collegeDegrees: [
    {
      degreeName: String,
      degreeDepartments: [
        {
          departmentName: String,
        },
      ],
    },
  ],
});

const CollegeModel =
  mongoose.models.colleges || mongoose.model("colleges", CollegeSchema);

export default CollegeModel;
