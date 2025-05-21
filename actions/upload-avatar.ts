"use server";

import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { z } from "zod";

// Define the avatar validation schema
const avatarSchema = z
  .instanceof(File, {
    message: "Invalid file",
  })
  .refine(
    (file) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type,
      ),
    "Only .jpg, .jpeg, .png and .webp formats are supported",
  )
  .refine(
    (file) => file.size === 0 || file.size < 5 * 1024 * 1024,
    "Avatar must be less than 5MB",
  )
  .optional();

export async function uploadAvatar({
  user_id,
  file,
}: {
  user_id: User["id"];
  file: File;
}) {
  const supabase = await createClient();

  // Validate the file before uploading
  const validatedAvatar = avatarSchema.safeParse(file);

  if (!validatedAvatar.success) {
    // Convert Zod errors to a more friendly format
    const errors = validatedAvatar.error.flatten();
    throw new Error(JSON.stringify(errors));
  }

  // If validation passes, proceed with upload
  const path = `${user_id}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, file, { upsert: true, cacheControl: "0" });

  if (error) throw error;

  const avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/avatars/${user_id}`;

  await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user_id);
}
