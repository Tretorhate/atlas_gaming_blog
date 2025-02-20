import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const posts = await db
      .collection("posts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serializedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      author: post.author.toString(),
    }));

    return NextResponse.json(serializedPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, tags } = await req.json();

    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const result = await db.collection("posts").insertOne({
      title,
      content,
      tags,
      author: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the post" },
      { status: 500 }
    );
  }
}
