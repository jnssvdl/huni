"use server";

import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function updateProfile({
  user_id,
  username,
  bio,
}: {
  user_id: User["id"];
  username: Tables<"profiles">["username"];
  bio: Tables<"profiles">["bio"];
}) {
  const supabase = await createClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (user) {
    throw new Error("Username is already taken.");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ username, bio })
    .eq("id", user_id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
