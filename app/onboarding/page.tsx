import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import ProfileForm from "@/components/profile-form";
import { LogOut } from "lucide-react";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="fixed top-2 right-2">
        <form action={logout}>
          <Button type="submit" variant="outline" size="icon">
            <LogOut />
          </Button>
        </form>
      </div>

      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome to Huni
            </CardTitle>
            <CardDescription className="text-center">
              Complete your profile to get started!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
