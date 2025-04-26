"use server";

import { Post } from "@/types/post";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function likePost({
  userId,
  postId,
}: {
  userId: User["id"];
  postId: Post["post_id"];
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("likes")
    .insert({ user_id: userId, post_id: postId });

  if (error) throw error;
}
