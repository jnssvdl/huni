"use client";

import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import PostItem from "@/components/post-item";
import { useUser } from "@/context/user-context";
import { getPost } from "@/data/get-post";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ username: string; post_id: string }>;
}) {
  const { username, post_id } = use(params);

  const { data } = useQuery({
    queryKey: ["post", post_id],
    queryFn: () => getPost({ username, post_id }),
  });

  const { id } = useUser();

  if (!data) return;

  return (
    <div className="flex h-full flex-col">
      <PostItem post={data} current_user_id={id} />
      <CommentList post_id={post_id} />
      <CommentForm post_id={post_id} />
    </div>
  );
}
