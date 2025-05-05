"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import { useUser } from "@/context/user-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/data/create-comment";
import { Post } from "@/types/post";

type CommentFormProps = {
  post_id: Post["post_id"];
};

export default function CommentForm({ post_id }: CommentFormProps) {
  const [content, setContent] = useState("");
  const { id: user_id } = useUser();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createComment,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment-list"] });
      queryClient.invalidateQueries({ queryKey: ["post", post_id] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) return;

    mutation.mutate({ post_id, user_id, content });

    setContent("");
  };

  return (
    <form
      className="bg-background sticky bottom-0 flex gap-2 border-t p-4"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Write your comment here..."
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant={"ghost"} size={"icon"}>
        <SendHorizonal className="text-violet-500" />
      </Button>
    </form>
  );
}
