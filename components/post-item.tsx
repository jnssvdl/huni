import { Post } from "@/types/post";
import { Avatar, AvatarImage } from "./ui/avatar";
import TrackItem from "./track-item";
import LikeButton from "./like-button";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-2 border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={post.avatar_url || "/default_profile.png"}
            alt={`${post.username} avatar`}
          />
        </Avatar>
        <div>
          <Link href={`/users/${post.username}`}>
            <h3 className="font-semibold hover:underline">{post.username}</h3>
          </Link>
          <p className="text-muted-foreground text-xs">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {post.content && <p className="text-base">{post.content}</p>}

      <div className="rounded-md border p-2">
        <TrackItem track={post.track} />
      </div>

      <div className="flex items-center gap-2">
        <LikeButton
          post_id={post.post_id}
          likeCount={post.like_count}
          hasLiked={post.has_liked}
        />
        <Link href={`/users/${post.username}/posts/${post.post_id}`}>
          <Button variant={"outline"} className="rounded-full">
            <MessageCircle />
            <span>{post.comment_count}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
