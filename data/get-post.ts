import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { getTrack } from "@/lib/api/deezer/track";
import { User } from "@supabase/supabase-js";

export const getPost = async ({
  post_id,
  user_id,
}: {
  post_id: Tables<"posts">["id"];
  user_id: User["id"];
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc("get_post", {
      target_post_id: post_id,
      viewer_id: user_id,
    })
    .single();

  if (error) throw error;

  const track = await getTrack(data.deezer_id);

  const post = { ...data, track };

  return post;
};
