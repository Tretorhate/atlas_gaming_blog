import mongoose from "mongoose";

const ArchiveSchema = new mongoose.Schema(
  {
    year: String,
    month: String,
    day: String,
    title: String,
  },
  { timestamps: true }
);

export default mongoose.models.Archive ||
  mongoose.model("Archive", ArchiveSchema);
