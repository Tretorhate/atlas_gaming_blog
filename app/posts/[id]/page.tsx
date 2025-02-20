import { Header } from "@/components/Header";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    ...post,
    _id: post._id.toString(),
    author: post.author.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  } as Post;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-4">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className="prose lg:prose-xl">{post.content}</div>
            <div className="mt-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
