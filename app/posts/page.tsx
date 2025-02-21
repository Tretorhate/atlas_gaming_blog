import { Header } from "@/components/Header";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";
import type { Post } from "@/types/blog";
//
async function getPosts(): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db("atlas_gaming_blog");
  const posts = await db
    .collection("posts")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return posts.map((post) => ({
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    tags: post.tags || [],
    author: post.author.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));
}

export default async function Posts() {
  const posts = await getPosts();
  const session = await getServerSession(authOptions);

  const handleDelete = async (id: string) => {
    "use server";
    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");
    await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          {session && (
            <Link href="/posts/create">
              <Button>Create New Post</Button>
            </Link>
          )}
        </div>
        <div className="grid gap-4">
          {posts.map((post: Post) => (
            <Card
              key={post._id}
              className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4 pb-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>

              {session?.user &&
                (session.user.id === post.author ||
                  session.user.role === "admin") && (
                  <div className="px-6 pb-4 flex gap-3 justify-end border-t border-gray-200 pt-4">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-gray-400 text-gray-700 hover:bg-gray-100"
                    >
                      <Link href={`/posts/edit/${post._id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      formAction={() => handleDelete(post._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
