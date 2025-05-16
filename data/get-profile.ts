import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { User } from "@supabase/supabase-js";

export const getProfile = async ({
  target_username,
  viewer_id,
}: {
  target_username: Tables<"profiles">["username"];
  viewer_id: User["id"];
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .rpc("get_profile", {
      target_username: target_username,
      viewer_id: viewer_id,
    })
    .single();

  if (error) throw error;

  return data;
};
