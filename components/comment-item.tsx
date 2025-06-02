import { Comment } from "@/types/comment";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="space-y-2 border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-10">
          <AvatarImage
            src={comment.avatar_url || "/default_profile.png"}
            alt={`${comment.username} avatar`}
            className="object-cover"
          />
        </Avatar>
        <div>
          <Link href={`/u/${comment.username}`}>
            <h2 className="font-bold hover:underline">{comment.username}</h2>
          </Link>
          <p className="text-muted-foreground text-sm">
            {formatDistanceToNow(new Date(comment.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
