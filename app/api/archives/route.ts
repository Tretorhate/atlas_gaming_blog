import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const archives = await db
      .collection("archives")
      .find({})
      .sort({ year: -1, month: -1, day: -1 })
      .toArray();

    const serializedArchives = archives.map((archive) => ({
      ...archive,
      _id: archive._id.toString(),
      createdAt: archive.createdAt
        ? new Date(archive.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: archive.updatedAt
        ? new Date(archive.updatedAt).toISOString()
        : new Date().toISOString(),
    }));

    return NextResponse.json(serializedArchives);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching archives" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { year, month, day, title } = await req.json();

    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const result = await db.collection("archives").insertOne({
      year,
      month,
      day,
      title,
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
      { error: "An error occurred while creating the archive" },
      { status: 500 }
    );
  }
}
