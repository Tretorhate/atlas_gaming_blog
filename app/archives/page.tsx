/* eslint-disable @typescript-eslint/no-explicit-any */

import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

async function getArchives() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/archives`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
}

export default async function Archives() {
  const archives = await getArchives();

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Archives</h1>
        <div className="grid gap-4">
          {archives.map((archive: any) => (
            <Card
              key={archive._id}
              className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {archive.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4 pb-6 space-y-4">
                <p className="text-sm text-gray-700">
                  {archive.day} {archive.month} {archive.year}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
