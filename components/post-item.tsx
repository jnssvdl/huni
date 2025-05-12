"use client";

import { Post } from "@/types/post";
import { Avatar, AvatarImage } from "./ui/avatar";
import TrackItem from "./track-item";
import LikeButton from "./like-button";
import { Button } from "./ui/button";
import { Ellipsis, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/data/delete-post";

export default function PostItem({ post }: { post: Post }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", post.post_id] });
    },
  });

  return (
    <div className="flex flex-col gap-2 border-b p-4">
      <div className="flex items-center justify-between">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => mutation.mutate({ post_id: post.post_id })}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
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
