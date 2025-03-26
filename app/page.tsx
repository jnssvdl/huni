import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <div>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <h1>Huni</h1>
      <p>Hello {data.user?.email}</p>
      <form action={logout}>
        <Button type="submit" variant="destructive">
          Log out
        </Button>
      </form>
    </div>
  );
}
