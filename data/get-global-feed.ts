import { createClient } from "@/utils/supabase/client";
import { getTrack } from "@/lib/api/deezer/track";
import { User } from "@supabase/supabase-js";
import { FEED_LIMIT } from "@/constants";

export const getGlobalFeed = async ({
  user_id,
  offset,
}: {
  user_id: User["id"];
  offset: number;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_global_feed", {
    viewer_id: user_id,
    offset_count: offset,
    limit_count: FEED_LIMIT,
  });

  if (error) throw error;

  const posts = await Promise.all(
    data.map(async (post) => {
      const track = await getTrack(post.deezer_id);
      return { ...post, track };
    }),
  );

  return posts;
};
