import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  GamepadIcon as GameController,
  Headphones,
  Book,
  Archive,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Atlas Gaming Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore the latest in gaming news, reviews, and community
            discussions.
          </p>
        </section>
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GameController className="h-6 w-6" />
                Latest Posts
              </CardTitle>
              <CardDescription>
                Check out our newest gaming articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Stay up-to-date with the latest gaming trends and news.</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/posts">Read Posts</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-6 w-6" />
                Podcasts
              </CardTitle>
              <CardDescription>Listen to our gaming podcasts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Tune in to discussions about the latest games and industry news.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/podcasts">Explore Podcasts</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6" />
                Gaming Books
              </CardTitle>
              <CardDescription>Discover books about gaming</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Expand your knowledge with our curated selection of gaming
                literature.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/books">Browse Books</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-6 w-6" />
                Archives
              </CardTitle>
              <CardDescription>Dive into our content archives</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore our past articles, reviews, and discussions.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href="/archives">View Archives</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
