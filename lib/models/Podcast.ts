import mongoose from "mongoose"

const PodcastSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    url: String,
  },
  { timestamps: true },
)

export default mongoose.models.Podcast || mongoose.model("Podcast", PodcastSchema)

