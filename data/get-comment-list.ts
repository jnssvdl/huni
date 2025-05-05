import { Post } from "@/types/post";
import { createClient } from "@/utils/supabase/client";

export const PAGE_SIZE = 2;

export const getCommentList = async ({
  post_id,
  offset,
}: {
  post_id: Post["post_id"];
  offset: number;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_comment_list", {
    target_post_id: post_id,
    offset_count: offset,
    limit_count: PAGE_SIZE,
  });

  if (error) throw error;

  return data;
};
