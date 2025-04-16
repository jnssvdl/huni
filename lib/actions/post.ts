"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const postSchema = z.object({
  content: z
    .string()
    .max(280, "Post must be 280 characters or fewer")
    .optional()
    .nullable(),
  deezer_id: z
    .string({ invalid_type_error: "Track is required" })
    .min(1, "Track is required"),
});

export async function createPost(prevState: unknown, formData: FormData) {
  const parsed = await postSchema.safeParseAsync({
    content: formData.get("content") || null,
    deezer_id: formData.get("deezer_id"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { content, deezer_id } = parsed.data;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const post = {
    user_id: user.id,
    content,
    deezer_id,
  };

  await supabase.from("posts").insert(post);
}
