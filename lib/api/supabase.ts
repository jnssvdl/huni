import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import { getTrack } from "@/lib/api/deezer/track";

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

export const PAGE_SIZE = 2;

export const getFeed = async ({ pageParam = 0 }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles ( username, avatar_url )")
    .order("created_at", { ascending: false })
    .range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

  if (error) throw error;

  const posts = await Promise.all(
    data.map(async (post) => {
      const track = await getTrack(post.deezer_id);
      return { ...post, track };
    }),
  );

  return posts;
};
