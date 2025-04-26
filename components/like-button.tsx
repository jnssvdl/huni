"use client";

import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/data/like-post";
import { Post } from "@/types/post";
import { useUser } from "@/context/user-context";
import { unlikePost } from "@/data/unlike-post";

type LikeButtonProps = {
  postId: Post["post_id"];
  likes: number;
  hasLiked: boolean;
};

export default function LikeButton({
  postId,
  likes,
  hasLiked,
}: LikeButtonProps) {
  const queryClient = useQueryClient();

  const user = useUser();

  const likeMutation = useMutation({
    mutationFn: likePost,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikePost,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const toggleLike = () => {
    if (hasLiked) {
      unlikeMutation.mutate({ postId: postId, userId: user.id });
    } else {
      likeMutation.mutate({ postId: postId, userId: user.id });
    }
  };

  return (
    <Button variant={"outline"} className="rounded-full" onClick={toggleLike}>
      <Heart className={hasLiked ? `text-violet-500` : ""} />
      <span>{likes}</span>
    </Button>
  );
}
