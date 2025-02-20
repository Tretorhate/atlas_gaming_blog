/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/Header";
import clientPromise from "@/lib/mongodb";

async function getPodcasts() {
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    const response = await fetch("/api/podcasts", {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Fetch error:", error);
      throw new Error("Failed to fetch podcasts");
    }

    return response.json();
  }

  const client = await clientPromise;
  const db = client.db("atlas_gaming_blog");
  const podcasts = await db.collection("podcasts").find({}).toArray();

  return podcasts.map((podcast) => ({
    ...podcast,
    _id: podcast._id.toString(),
    date:
      podcast.date instanceof Date
        ? podcast.date.toISOString()
        : new Date(podcast.date).toISOString(),
  }));
}

export default async function Podcasts() {
  try {
    const podcasts = await getPodcasts();

    return (
      <div>
        <Header />
        <main className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4">Podcasts</h1>
          <div className="grid gap-4">
            {podcasts.map((podcast: any) => (
              <div key={podcast._id} className="border p-4 rounded">
                <h2 className="text-xl font-bold">{podcast.title}</h2>
                <p>{podcast.description}</p>
                <p className="text-sm text-gray-500">
                  {new Date(podcast.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error in Podcasts page:", error);
    return (
      <div>
        <Header />
        <main className="container mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p>Failed to load podcasts. Please try again later.</p>
        </main>
      </div>
    );
  }
}

// Optional: Configure revalidation
export const revalidate = 0; // Matches your { next: { revalidate: 0 } }
