"use server";

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

// Username availability check
async function isTaken(username: string) {
  const supabase = await createClient();

  // Check if username already exists
  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .single();

  return !!data; // Returns true if username is taken
}

const profileSchema = z.object({
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
    .refine(async (username) => !(await isTaken(username)), {
      message: "Username already taken",
    }),
  bio: z
    .string({
      invalid_type_error: "Invalid bio",
    })
    .max(160, "Bio must be less than 160 characters")
    .optional()
    .nullable(),
  id: z.string(), // Assuming id is required
});

export async function createProfile(
  profile: Database["public"]["Tables"]["profiles"]["Insert"],
) {
  const supabase = await createClient();

  // Validate the input data
  const validatedProfile = await profileSchema.safeParseAsync(profile);

  if (!validatedProfile.success) {
    // Convert Zod errors to a more friendly format if needed
    const errors = validatedProfile.error.flatten();
    throw new Error(JSON.stringify(errors));
  }

  // If validation passes, insert the profile
  const { error } = await supabase
    .from("profiles")
    .insert(validatedProfile.data); // Use the validated data

  if (error) throw error;

  return { success: true };
}
