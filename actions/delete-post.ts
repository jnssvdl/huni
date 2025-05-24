"use server";

import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
export async function deletePost({
  post_id,
}: {
  post_id: Tables<"posts">["id"];
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("posts").delete().eq("id", post_id);

  if (error) throw error;
}
