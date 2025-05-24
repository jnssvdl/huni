import PostPage from "@/components/post-page";
import { getPost } from "@/data/get-post.server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string; post_id: string }>;
}) {
  const { username, post_id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["post", post_id],
    queryFn: () => getPost({ post_id, username }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPage post_id={post_id} username={username} />
    </HydrationBoundary>
  );
}
