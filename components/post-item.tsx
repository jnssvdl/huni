"use client";

import { Post } from "@/types/post";
import { Avatar, AvatarImage } from "./ui/avatar";
import TrackItem from "./track-item";
import LikeButton from "./like-button";
import { Button } from "./ui/button";
import { Ellipsis, MessageCircle, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import UpdateDialog from "./update-dialog";
import DeleteDialog from "./delete-dialog";

type PostItemProps = {
  post: Post;
  user_id: User["id"];
  innerRef?: React.Ref<HTMLDivElement>;
};

export default function PostItem({ post, user_id, innerRef }: PostItemProps) {
  const [open, setOpen] = useState({
    updateDialog: false,
    deleteDialog: false,
  });

  return (
    <div className="space-y-2 border-b p-4" ref={innerRef}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage
              src={post.avatar_url || "/default_profile.png"}
              alt={`${post.username} avatar`}
              className="object-cover"
            />
          </Avatar>
          <div>
            <Link href={`/u/${post.username}`}>
              <h3 className="font-bold hover:underline">{post.username}</h3>
            </Link>
            <p className="text-muted-foreground text-sm">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {post.user_id === user_id && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  setOpen((prev) => ({ ...prev, updateDialog: true }))
                }
              >
                <Pencil />
                <span>Update</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  setOpen((prev) => ({ ...prev, deleteDialog: true }))
                }
              >
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {post.content && <p className="text-base">{post.content}</p>}

      <div className="rounded-md border p-2">
        <TrackItem track={post.track} />
      </div>

      <div className="space-x-4">
        <LikeButton
          post_id={post.post_id}
          likeCount={post.like_count}
          hasLiked={post.has_liked}
        />
        <Link href={`/u/${post.username}/p/${post.post_id}`}>
          <Button variant={"outline"} className="rounded-full">
            <MessageCircle />
            <span>
              {new Intl.NumberFormat("en", {
                notation: "compact",
                compactDisplay: "short",
                maximumFractionDigits: 1,
              }).format(post.comment_count)}
            </span>
          </Button>
        </Link>
      </div>

      <UpdateDialog
        open={open.updateDialog}
        onOpenChange={(open) =>
          setOpen((prev) => ({ ...prev, updateDialog: open }))
        }
        post={post}
      />

      <DeleteDialog
        open={open.deleteDialog}
        onOpenChange={(open) =>
          setOpen((prev) => ({ ...prev, deleteDialog: open }))
        }
        post={post}
      />
    </div>
  );
}
