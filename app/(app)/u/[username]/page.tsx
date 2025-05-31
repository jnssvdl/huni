"use client";

import ProfileCard from "@/components/profile-card";
import UserFeed from "@/components/user-feed";
import { useUser } from "@/context/user-context";
import { getProfile } from "@/data/get-profile";
import { useQuery } from "@tanstack/react-query";
import React, { use } from "react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);

  const { id: viewer_id } = useUser();

  const { data: user } = useQuery({
    queryKey: ["profile", username],
    queryFn: () =>
      getProfile({ target_username: username, viewer_id: viewer_id }),
  });

  if (!user) return;

  return (
    <div>
      <ProfileCard profile={user} />
      <UserFeed target_user_id={user.user_id} />
    </div>
  );
}
