import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const books = await db
      .collection("books")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(books);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching books" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, url, author, description } = await req.json();

    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const result = await db.collection("books").insertOne({
      title,
      url,
      author,
      description,
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
      { error: "An error occurred while creating the book" },
      { status: 500 }
    );
  }
}
