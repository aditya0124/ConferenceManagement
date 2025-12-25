import mongoose from "mongoose";

const conferenceSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String
});

export default mongoose.model("Conference", conferenceSchema);
