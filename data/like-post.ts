"use server";

import { Post } from "@/types/post";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function likePost({
  user_id,
  post_id,
}: {
  user_id: User["id"];
  post_id: Post["post_id"];
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("likes").insert({ user_id, post_id });

  if (error) throw error;
}
