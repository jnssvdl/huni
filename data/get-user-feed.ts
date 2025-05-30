import { createClient } from "@/utils/supabase/client";
import { getTrack } from "@/lib/api/deezer/track";
import { User } from "@supabase/supabase-js";

export const PAGE_SIZE = 2;

export const getUserFeed = async ({
  target_user_id,
  user_id,
  offset,
}: {
  target_user_id: User["id"];
  user_id: User["id"];
  offset: number;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_user_feed", {
    target_user_id: target_user_id,
    viewer_id: user_id,
    offset_count: offset,
    limit_count: PAGE_SIZE,
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
