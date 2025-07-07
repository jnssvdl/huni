import React from "react";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/actions/follow-user";
import { User } from "@supabase/supabase-js";
import { unfollowUser } from "@/actions/unfollow-user";
import { Profile } from "@/types/profile";

type FollowButtonProps = {
  hasFollowed: boolean;
  follower_id: User["id"];
  following_id: User["id"];
  username: Profile["username"];
};

export default function FollowButton({
  hasFollowed,
  follower_id,
  following_id,
  username,
}: FollowButtonProps) {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: followUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      queryClient.invalidateQueries({ queryKey: ["feed", "following"] });
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
      queryClient.invalidateQueries({ queryKey: ["feed", "following"] });
    },
  });

  const toggleFollow = () => {
    if (hasFollowed) {
      unfollowMutation.mutate({ follower_id, following_id });
    } else {
      followMutation.mutate({ follower_id, following_id });
    }
  };

  return (
    <Button
      variant={hasFollowed ? "outline" : "default"}
      onClick={toggleFollow}
    >
      {hasFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
}
