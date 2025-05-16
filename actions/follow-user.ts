"use server";

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export async function followUser({
  follower_id,
  following_id,
}: Database["public"]["Tables"]["follows"]["Insert"]) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("follows")
    .insert({ follower_id, following_id });

  if (error) throw error;
}
