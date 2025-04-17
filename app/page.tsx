import { ModeToggle } from "@/components/mode-toggle";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import PostForm from "@/components/post-form";
import Newsfeed from "@/components/newsfeed";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

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
          <Newsfeed />
        </main>
      </div>
    </div>
  );
}
