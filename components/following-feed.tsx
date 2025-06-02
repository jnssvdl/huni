"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingFeed } from "@/data/get-following-feed";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";
import { FEED_LIMIT } from "@/constants";
import PostSkeleton from "./post-skeleton";
import { RotateCcw } from "lucide-react";

export default function FollowingFeed() {
  const user = useUser();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["feed", "following"],
    queryFn: ({ pageParam }) =>
      getFollowingFeed({
        user_id: user.id,
        offset: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < FEED_LIMIT) return undefined;
      return allPages.flat().length;
    },
    initialPageParam: 0,
  });

  const posts = data?.pages.flat() || [];

  if (isLoading) {
    // Show skeletons while first page is loading
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
      {posts.map((post) => (
        <PostItem key={post.post_id} post={post} user_id={user.id} />
      ))}

      {/* Show additional skeleton when fetching next page */}
      {isFetchingNextPage &&
        Array.from({ length: FEED_LIMIT }).map((_, i) => (
          <PostSkeleton key={i} />
        ))}

      <div className="flex justify-center border-b p-4">
        {hasNextPage ? (
          <Button
            variant={"ghost"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            View more posts
          </Button>
        ) : (
          <p className="text-muted-foreground text-sm">
            You have reached the end of the page.
          </p>
        )}
      </div>
    </>
  );
}
