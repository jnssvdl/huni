"use client";

import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import PostItem from "@/components/post-item";
import PostSkeleton from "@/components/post-skeleton";
import { useUser } from "@/context/user-context";
import { getPost } from "@/data/get-post";
import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ username: string; post_id: string }>();

  const { post_id } = params;
  const { id } = useUser();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", post_id],
    queryFn: () => getPost({ user_id: id, post_id }),
  });

  if (!isLoading && (!post || isError)) {
    notFound();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {isLoading ? <PostSkeleton /> : <PostItem post={post!} user_id={id} />}

      <div className="flex-1">
        <CommentList post_id={post_id} />
      </div>
      <div className="bg-background sticky bottom-0">
        <CommentForm post_id={post_id} />
      </div>
    </div>
  );
}
