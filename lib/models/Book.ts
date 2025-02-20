import mongoose from "mongoose"

const BookSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    author: String,
    description: String,
  },
  { timestamps: true },
)

export default mongoose.models.Book || mongoose.model("Book", BookSchema)

