import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/database.types";
import { Track } from "@/types/track";

export const getPost = async ({
  postId,
  username,
}: {
  postId: Tables<"posts">["id"];
  username: Tables<"profiles">["username"];
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc("get_post", {
      target_post_id: postId,
      viewer_username: username,
    })
    .single();

  if (error) throw error;

  const res = await fetch(`https://api.deezer.com/track/${data.deezer_id}`);
  const track: Track = await res.json();

  const post = { ...data, track };

  return post;
};
