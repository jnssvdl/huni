import { ModeToggle } from "@/components/mode-toggle";
import Header from "@/components/header";
import PostForm from "@/components/post-form";
import Feed from "@/components/feed";

export default async function Home() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <div className="w-full max-w-xl border">
        <Header />
        <main>
          <PostForm />
          <Feed />
        </main>
      </div>
    </div>
  );
}
