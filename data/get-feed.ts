import { createClient } from "@/utils/supabase/client";
import { getTrack } from "@/lib/api/deezer/track";

export const PAGE_SIZE = 2;

export const getFeed = async ({ pageParam = 0 }) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles ( id, username, avatar_url ), likes( count )")
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
