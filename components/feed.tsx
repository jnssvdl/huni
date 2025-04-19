"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed, PAGE_SIZE } from "@/data/get-feed";
import PostItem from "./post-item";

export default function Feed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feed"],
      queryFn: getFeed,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < PAGE_SIZE) return undefined;
        return allPages.length;
      },
      initialPageParam: 0,
    });

  return (
    <div>
      {data?.pages.flat().map((post) => <PostItem key={post.id} post={post} />)}
      {isFetchingNextPage ? (
        <h1>Loading...</h1>
      ) : hasNextPage ? (
        <Button onClick={() => fetchNextPage()}>Load more</Button>
      ) : (
        <h1>You have reached the end</h1>
      )}
    </div>
  );
}
