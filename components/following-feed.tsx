"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingFeed } from "@/data/get-following-feed";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";
import { FEED_LIMIT } from "@/constants";

export default function FollowingFeed() {
  const user = useUser();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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

  return (
    <>
      {data?.pages
        .flat()
        .map((post) => (
          <PostItem key={post.post_id} post={post} user_id={user.id} />
        ))}
      <div className="flex justify-center border-b p-2">
        {hasNextPage ? (
          <Button
            variant={"ghost"}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            View more posts
          </Button>
        ) : (
          <p>You have reached the end of the page</p>
        )}
      </div>
    </>
  );
}
