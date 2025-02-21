/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "@/components/Header";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
            <Card
              key={book._id}
              className="bg-white border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="border-b border-gray-200 pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                  <Link
                    href={book.url}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {book.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4 pb-6 space-y-4">
                <p className="text-sm text-gray-600">By {book.author}</p>
                <p className="text-gray-700 line-clamp-3">{book.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
