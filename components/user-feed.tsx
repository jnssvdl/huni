"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";
import { User } from "@supabase/supabase-js";
import { getUserFeed } from "@/data/get-user-feed";
import { FEED_LIMIT } from "@/constants";
import PostSkeleton from "./post-skeleton";
import { RotateCcw } from "lucide-react";

type UserFeedProps = {
  user_id: User["id"];
};

export default function UserFeed({ user_id }: UserFeedProps) {
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
    queryKey: ["feed", "user", user_id],
    queryFn: ({ pageParam }) =>
      getUserFeed({
        user_id: user_id,
        viewer_id: user.id,
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

  if (posts.length === 0) {
    return (
      <div className="flex justify-center p-4">
        <p className="text-muted-foreground text-sm">
          {user_id === user.id
            ? "Your feed is looking a little empty."
            : "Looks like they haven’t posted yet."}
        </p>
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
