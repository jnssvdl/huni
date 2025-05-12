"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList, PAGE_SIZE } from "@/data/get-comment-list";
import { Post } from "@/types/post";
import CommentItem from "./comment-item";

type CommentListProps = {
  post_id: Post["post_id"];
};

export default function CommentList({ post_id }: CommentListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comment-list", post_id],
      queryFn: ({ pageParam }) =>
        getCommentList({ post_id: post_id, offset: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) return undefined;
        return allPages.flat().length;
      },
      initialPageParam: 0,
    });

  return (
    <ul className="flex-1">
      {data?.pages.flat().length === 0 ? (
        <li className="text-muted-foreground p-4 text-center">
          No comments yet. Be the first to comment!
        </li>
      ) : (
        <>
          {data?.pages
            .flat()
            .map((comment) => (
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
                View more comments
              </Button>
            </div>
          )}
        </>
      )}
    </ul>
  );
}
