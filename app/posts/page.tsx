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
            <Card key={post._id}>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/posts/${post._id}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2">{post.content.substring(0, 150)}...</p>
                <div className="mt-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                {session?.user &&
                  (session.user.id === post.author ||
                    session.user.role === "admin") && (
                    <div className="mt-4 space-x-2">
                      <Link href={`/posts/edit/${post._id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <form
                        action={handleDelete.bind(null, post._id)}
                        className="inline"
                      >
                        <Button type="submit" variant="destructive">
                          Delete
                        </Button>
                      </form>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
