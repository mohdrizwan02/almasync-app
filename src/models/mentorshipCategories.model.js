import mongoose from "mongoose";

const mentorshipCategoriesSchema = new mongoose.Schema({
  mentorshipCategories: [String],
});

const MentorshipCategoriesModel =
  mongoose.models.mentorshipcategories ||
  mongoose.model("mentorshipcategories", mentorshipCategoriesSchema);

export default MentorshipCategoriesModel;
