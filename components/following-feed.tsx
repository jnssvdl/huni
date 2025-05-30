"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowingFeed, PAGE_SIZE } from "@/data/get-following-feed";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";

export default function FollowingFeed() {
  const user = useUser();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["following-feed"],
      queryFn: ({ pageParam }) =>
        getFollowingFeed({
          user_id: user.id,
          offset: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) return undefined;
        return allPages.flat().length;
      },
      initialPageParam: 0,
    });

  return (
    <div>
      {data?.pages
        .flat()
        .map((post) => (
          <PostItem key={post.post_id} post={post} current_user_id={user.id} />
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
    </div>
  );
}
