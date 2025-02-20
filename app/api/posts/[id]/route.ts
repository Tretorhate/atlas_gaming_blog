import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// GET handler
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Inline type definition
) {
  try {
    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(params.id) });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const serializedPost = {
      ...post,
      _id: post._id.toString(),
      author: post.author.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };

    return NextResponse.json(serializedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching the post" },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } } // Inline type definition
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const { title, content, tags } = await request.json();

    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(params.id) });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (
      post.author.toString() !== session.user.id &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          title,
          content,
          tags,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "No changes made to the post" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while updating the post" },
      { status: 500 }
    );
  }
}

// DELETE handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Inline type definition
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(params.id) });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (
      post.author.toString() !== session.user.id &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Failed to delete the post" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the post" },
      { status: 500 }
    );
  }
}
