"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/actions/like-post";
import { unlikePost } from "@/actions/unlike-post";
import { Post } from "@/types/post";
import { useUser } from "@/context/user-context";

type LikeButtonProps = {
  post_id: Post["post_id"];
  likeCount: number;
  hasLiked: boolean;
};

export default function LikeButton({
  post_id,
  likeCount,
  hasLiked,
}: LikeButtonProps) {
  const queryClient = useQueryClient();
  const user = useUser();

  const [optimisticLikeState, setOptimisticLikeState] = useState({
    hasLiked,
    likeCount,
  });

  const likeMutation = useMutation({
    mutationFn: likePost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post_id] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: () => {
      setOptimisticLikeState({
        hasLiked: false,
        likeCount,
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikePost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", post_id] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: () => {
      setOptimisticLikeState({
        hasLiked: true,
        likeCount,
      });
    },
  });

  const toggleLike = () => {
    if (optimisticLikeState.hasLiked) {
      setOptimisticLikeState((prev) => ({
        hasLiked: false,
        likeCount: prev.likeCount - 1,
      }));
      unlikeMutation.mutate({ post_id, user_id: user.id });
    } else {
      setOptimisticLikeState((prev) => ({
        hasLiked: true,
        likeCount: prev.likeCount + 1,
      }));
      likeMutation.mutate({ post_id, user_id: user.id });
    }
  };

  return (
    <Button variant="outline" className="rounded-full" onClick={toggleLike}>
      <Heart className={optimisticLikeState.hasLiked ? "text-primary" : ""} />
      <span>
        {new Intl.NumberFormat("en", {
          notation: "compact",
          compactDisplay: "short",
          maximumFractionDigits: 1,
        }).format(optimisticLikeState.likeCount)}
      </span>
    </Button>
  );
}
