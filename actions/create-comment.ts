"use server";

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";

export const createComment = async ({
  post_id,
  user_id,
  content,
}: Database["public"]["Tables"]["comments"]["Insert"]) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("comments")
    .insert({ user_id, post_id, content });

  if (error) throw error;
};
