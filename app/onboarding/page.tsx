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
// import ProfileForm from "@/components/profile-form";
import { LogOut } from "lucide-react";
import ProfileForm from "@/components/profile-form2";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
            <ProfileForm user_id={user.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
