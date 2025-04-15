import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  skills: [String],
});

const SkillModel =
  mongoose.models.skills || mongoose.model("skills", skillSchema);

export default SkillModel;
