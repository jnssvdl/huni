"use server";

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createPost = async ({
  user_id,
  content,
  deezer_id,
}: Database["public"]["Tables"]["posts"]["Insert"]) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id, content, deezer_id });

  if (error) throw error;

  return data;
};
