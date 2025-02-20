import { PostForm } from "@/components/PostForm";
import { Header } from "@/components/Header";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { Post } from "@/types/blog";
//
async function getPost(id: string): Promise<Post | null> {
  const client = await clientPromise;
  const db = client.db("atlas_gaming_blog");
  const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
  if (!post) return null;
  return {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    tags: post.tags || [],
    author: post.author.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export default async function EditPost({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Edit Post</h1>
        <PostForm post={post} />
      </main>
    </div>
  );
}
