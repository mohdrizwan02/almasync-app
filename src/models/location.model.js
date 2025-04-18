import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  locations: [String],
});

const LocationModel =
  mongoose.models.locations || mongoose.model("locations", locationSchema);

export default LocationModel;
