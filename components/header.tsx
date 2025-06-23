import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import UserCombobox from "./user-combobox";
import { ModeButton } from "./mode-button";

const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default async function Header({ user_id }: { user_id: User["id"] }) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();

  if (!profile || error) {
    redirect("/login");
  }

  return (
    <header className="flex items-center justify-between border-b p-4">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">Huni</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <UserCombobox />
        <ModeButton />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src={profile.avatar_url || "/default_profile.png"}
                alt={`${profile.username} avatar`}
                className="object-cover"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/u/${profile.username}`}>{profile.username}</Link>
            </DropdownMenuItem>
            <form action={logout}>
              <DropdownMenuItem asChild>
                <button type="submit" className="w-full">
                  Log out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
