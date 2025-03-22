import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export const logout = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <p>Hello {data.user.email}</p>
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </div>
  );
}
