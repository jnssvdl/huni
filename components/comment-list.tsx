"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "@/data/get-comment-list";
import { Post } from "@/types/post";
import CommentItem from "./comment-item";
import { COMMENT_LIST_LIMIT } from "@/constants";
import { Loader2, RotateCcw } from "lucide-react";

type CommentListProps = {
  post_id: Post["post_id"];
};

export default function CommentList({ post_id }: CommentListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["comment-list", post_id],
    queryFn: ({ pageParam }) =>
      getCommentList({ post_id: post_id, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < COMMENT_LIST_LIMIT) return undefined;
      return allPages.flat().length;
    },
    initialPageParam: 0,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center p-2">
        <Button onClick={() => refetch()} variant={"ghost"}>
          <RotateCcw />
          Retry
        </Button>
      </div>
    );
  }

  const comments = data?.pages.flat() || [];

  return (
    <>
      {comments.length === 0 && (
        <div className="text-muted-foreground border-b p-4 text-center text-sm">
          No comments yet. Be the first to comment!
        </div>
      )}
      {comments.flat().map((comment) => (
        <CommentItem key={comment.comment_id} comment={comment} />
      ))}
      {hasNextPage && (
        <div className="flex justify-center border-b p-2">
          <Button
            variant={"ghost"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-busy={isFetchingNextPage}
          >
            {isFetchingNextPage && <Loader2 className="animate-spin" />}
            View more comments
          </Button>
        </div>
      )}
    </>
  );
}
