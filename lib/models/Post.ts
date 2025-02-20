import mongoose from "mongoose"

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tags: [String],
  },
  { timestamps: true },
)

export default mongoose.models.Post || mongoose.model("Post", PostSchema)

