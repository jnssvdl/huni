import { Comment } from "@/types/comment";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <li className="flex flex-col gap-2 border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={comment.avatar_url || "/default_profile.png"}
            alt={`${comment.username} avatar`}
          />
        </Avatar>
        <div>
          <Link href={`/users/${comment.username}`}>
            <h3 className="font-semibold hover:underline">
              {comment.username}
            </h3>
          </Link>
          <p className="text-muted-foreground text-xs">
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <p>{comment.content}</p>
    </li>
  );
}
