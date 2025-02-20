import { PostForm } from "@/components/PostForm";
import { Header } from "@/components/Header";

export default function CreatePost() {
  return (
    <div>
      <Header />
      <main className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Create New Post</h1>
        <PostForm />
      </main>
    </div>
  );
}
