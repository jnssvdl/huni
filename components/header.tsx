import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Huni</h1>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={profile.avatar_url || "/default_profile.png"}
              alt={`${profile.username} avatar`}
            />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{profile.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <form action={logout}>
            <DropdownMenuItem>
              <button type="submit">Log out</button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
