"use server";

import { createClient } from "@/utils/supabase/server";

export const updatePost = async ({
  post_id,
  content,
}: {
  post_id: string;
  content: string;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .update({ content })
    .eq("id", post_id)
    .select()
    .single();

  if (error) throw error;

  return data;
};
