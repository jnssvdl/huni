"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getGlobalFeed } from "@/data/get-global-feed";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";
import { FEED_LIMIT } from "@/constants";
import PostSkeleton from "./post-skeleton";
import { RotateCcw } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function GlobalFeed() {
  const user = useUser();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["feed", "global"],
    queryFn: ({ pageParam }) =>
      getGlobalFeed({
        user_id: user.id,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < FEED_LIMIT) return undefined;
      return allPages.flat().length;
    },
    initialPageParam: 0,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const posts = data?.pages.flat() || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: FEED_LIMIT }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </>
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

  return (
    <>
      {posts.map((post, index) =>
        posts.length === index + 1 ? (
          <PostItem
            key={post.post_id}
            post={post}
            user_id={user.id}
            innerRef={ref}
          />
        ) : (
          <PostItem key={post.post_id} post={post} user_id={user.id} />
        ),
      )}

      {/* Show additional skeleton when fetching next page */}
      {isFetchingNextPage &&
        Array.from({ length: FEED_LIMIT }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}

      <div className="flex justify-center border-b p-4">
        <p className="text-muted-foreground text-sm">
          You have reached the end of the feed.
        </p>
      </div>
    </>
  );
}
