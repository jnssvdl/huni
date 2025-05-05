"use client";

import { getPost } from "@/data/get-post";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostItem from "./post-item";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";

type PostPageProps = {
  username: string;
  post_id: string;
};

export default function PostPage({ username, post_id }: PostPageProps) {
  const { data } = useQuery({
    queryKey: ["post", post_id],
    queryFn: () => getPost({ username, post_id }),
  });

  if (!data) return;

  return (
    <div className="flex flex-col">
      <PostItem post={data} />
      <CommentList post_id={post_id} />
      <CommentForm post_id={post_id} />
    </div>
  );
}
