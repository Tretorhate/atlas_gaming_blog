/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/Header";
import Link from "next/link";

async function getBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
}

export default async function Books() {
  const books = await getBooks();

  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Books</h1>
        <div className="grid gap-4">
          {books.map((book: any) => (
            <div key={book._id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={book.url}>{book.title}</Link>
              </h2>
              <p className="text-gray-600">By {book.author}</p>
              <p className="mt-2">{book.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
