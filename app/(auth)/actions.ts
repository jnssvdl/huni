"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, registerSchema } from "./validators";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid credentials.");
  }

  const { email, password } = result.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return error;
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
  };

  const result = registerSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Invalid credentials.");
  }

  const { email, password, username } = result.data;

  // Check if username already exists
  const { data: user } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();

  if (user) {
    throw new Error("Username is already taken.");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
    },
  });

  if (error) throw error;

  return null;
}
