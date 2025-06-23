import { USER_LIST_LIMIT } from "@/constants";
import { createClient } from "@/utils/supabase/client";

export const getUserList = async (query: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .ilike("username", `%${query}%`)
    .order("username", { ascending: true })
    .limit(USER_LIST_LIMIT);

  if (error) throw error;

  return data;
};
