import Header from "@/components/header";
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
      <div className="flex min-h-screen flex-col">
        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col border-x">
          <Header user_id={user.id} />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}
