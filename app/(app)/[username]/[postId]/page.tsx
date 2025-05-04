import PostItem from "@/components/post-item";
import { getPost } from "@/data/get-post";

export default async function PostPage({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) {
  const { username, postId } = await params;

  const post = await getPost({ postId: postId, username: username });

  return (
    <div>
      <PostItem post={post} />
    </div>
  );
}
