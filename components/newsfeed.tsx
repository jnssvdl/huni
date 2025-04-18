"use client";

import { Button } from "./ui/button";
import TrackItem from "./track-item";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed, PAGE_SIZE } from "@/lib/api/supabase";

export default function Newsfeed() {
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
      {data?.pages.flat().map((post) => (
        <div key={post.id} className="border-b p-4">
          <div>{post.profiles.username}</div>
          <TrackItem track={post.track} />
        </div>
      ))}
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
