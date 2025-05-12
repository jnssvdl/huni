import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { UserProvider } from "@/context/user-context";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      <div className="flex min-h-screen justify-center">
        <div className="fixed top-2 right-2">
          <ModeToggle />
        </div>
        <div className="flex w-full max-w-xl flex-col border-x">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
