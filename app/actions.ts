"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Profile } from "@/types/profile";

async function isTaken(username: Profile["username"]) {
  const supabase = await createClient();

  // Check if username already exists
  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return !data;
}

const schema = z.object({
  username: z
    .string({
      invalid_type_error: "Invalid username",
    })
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    )
    .refine(isTaken, "Username already taken"),
  bio: z
    .string({
      invalid_type_error: "Invalid bio",
    })
    .max(160, "Bio must be less than 160 characters")
    .optional()
    .nullable(),
  avatar: z
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
    .optional(),
});

export async function createProfile(prevState: unknown, formData: FormData) {
  const file = formData.get("avatar") as File;

  const validatedFields = await schema.safeParseAsync({
    username: formData.get("username"),
    bio: formData.get("bio") || null,
    avatar: file.size > 0 ? file : undefined,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, bio, avatar } = validatedFields.data;

  const supabase = await createClient();

  // Get user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Handle avatar upload
  const profile = {
    id: user.id,
    username,
    bio,
    avatar_url: null as string | null,
  };

  if (avatar && avatar.size > 0) {
    const path = `${user.id}/${Date.now()}`;
    await supabase.storage.from("avatars").upload(path, avatar);
    profile.avatar_url = supabase.storage
      .from("avatars")
      .getPublicUrl(path).data.publicUrl;
  }

  // Insert profile data
  await supabase.from("profiles").insert(profile);
  redirect("/");
}
