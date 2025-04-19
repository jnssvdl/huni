import { Post } from "@/types/post";
import { Avatar, AvatarImage } from "./ui/avatar";
import TrackItem from "./track-item";
import LikeButton from "./like-button";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-2 border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={post.profiles.avatar_url || "/default_profile.png"}
            alt={`${post.profiles.username} avatar`}
          />
        </Avatar>
        <div>
          <h3 className="font-semibold">{post.profiles.username}</h3>
          <p className="text-muted-foreground text-sm">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {post.content && <p className="text-base">{post.content}</p>}

      <div className="rounded-md border p-2">
        <TrackItem track={post.track} />
      </div>

      <div className="flex items-center gap-2">
        <LikeButton initialLikes={post.likes[0].count} />
      </div>
    </div>
  );
}
