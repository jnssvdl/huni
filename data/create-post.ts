import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";

export const createPost = async (
  post: Database["public"]["Tables"]["posts"]["Insert"],
) => {
  const { user_id, content, deezer_id } = post;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id, content, deezer_id });

  if (error) throw error;

  return data;
};
