"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed, PAGE_SIZE } from "@/data/get-feed";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";

export default function Feed() {
  const user = useUser();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: ({ pageParam }) =>
        getFeed({
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
        .map((post) => <PostItem key={post.post_id} post={post} />)}
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
