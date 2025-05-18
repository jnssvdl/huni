"use server";

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export async function createProfile({
  id,
  username,
  bio,
}: Database["public"]["Tables"]["profiles"]["Insert"]) {
  console.log("HERE");
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .insert({ id, username, bio });

  if (error) throw error;
}
