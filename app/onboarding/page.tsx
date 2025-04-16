import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import ProfileForm from "@/components/profile-form";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex w-full max-w-xl flex-col gap-4 border p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Hello there! 👋</h1>
          <p className="text-muted-foreground">
            Before we begin, add your avatar, username, and a short bio.
          </p>
        </div>

        <ProfileForm />

        <form action={logout} className="">
          <Button type="submit" variant="destructive" className="w-full">
            Log out
          </Button>
        </form>
      </div>
    </div>
  );
}
