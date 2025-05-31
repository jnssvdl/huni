"use client";

import { Button } from "./ui/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostItem from "./post-item";
import { useUser } from "@/context/user-context";
import { User } from "@supabase/supabase-js";
import { getUserFeed } from "@/data/get-user-feed";
import { FEED_LIMIT } from "@/constants";

type UserFeedProps = {
  target_user_id: User["id"];
};

export default function UserFeed({ target_user_id }: UserFeedProps) {
  const user = useUser();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-feed", target_user_id],
      queryFn: ({ pageParam }) =>
        getUserFeed({
          user_id: user.id,
          target_user_id: target_user_id,
          offset: pageParam,
        }),
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < FEED_LIMIT) return undefined;
        return allPages.flat().length;
      },
      initialPageParam: 0,
    });

  return (
    <div>
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
    </div>
  );
}
