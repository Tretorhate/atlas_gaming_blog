import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const podcasts = await db
      .collection("podcasts")
      .find({})
      .sort({ date: -1 })
      .toArray();

    const serializedPodcasts = podcasts.map((podcast) => {
      try {
        return {
          ...podcast,
          _id: podcast._id.toString(),
          date: podcast.date
            ? new Date(podcast.date).toISOString()
            : new Date().toISOString(),
          createdAt: podcast.createdAt
            ? new Date(podcast.createdAt).toISOString()
            : new Date().toISOString(),
          updatedAt: podcast.updatedAt
            ? new Date(podcast.updatedAt).toISOString()
            : new Date().toISOString(),
        };
      } catch (err) {
        console.error("Error processing podcast:", podcast, err);
        // Provide fallback values if there's an error
        return {
          ...podcast,
          _id: podcast._id?.toString() || "unknown",
          date: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    });

    return NextResponse.json(serializedPodcasts);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching podcasts" },
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

    const { title, description, date } = await req.json();

    const client = await clientPromise;
    const db = client.db("atlas_gaming_blog");

    const result = await db.collection("podcasts").insertOne({
      title,
      description,
      date: new Date(date),
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
      { error: "An error occurred while creating the podcast" },
      { status: 500 }
    );
  }
}
