/* eslint-disable @typescript-eslint/no-explicit-any */

import { Header } from "@/components/Header";
import Link from "next/link";

async function getArchives() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/archives`, {
    cache: "no-store",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch archives");
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
            <div key={archive._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={archive.url}>{archive.title}</Link>
              </h2>
              <p className="text-gray-600">
                {archive.day} {archive.month} {archive.year}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
