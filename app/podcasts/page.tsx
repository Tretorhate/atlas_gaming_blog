/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/Header";
import clientPromise from "@/lib/mongodb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
              <Card
                key={podcast._id}
                className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader className="border-b border-gray-200 pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {podcast.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-4 pb-6 space-y-4">
                  <p className="text-gray-700 line-clamp-3">
                    {podcast.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(podcast.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
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
export const revalidate = 0;
