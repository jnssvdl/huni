"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function uploadAvatar({
  user_id,
  file,
}: {
  user_id: User["id"];
  file: File;
}) {
  const supabase = await createClient();

  const path = `${user_id}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, cacheControl: "0" });

  if (error) throw error;
}
