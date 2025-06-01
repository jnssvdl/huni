"use client";

import { Post } from "@/types/post";
import { Avatar, AvatarImage } from "./ui/avatar";
import TrackItem from "./track-item";
import LikeButton from "./like-button";
import { Button } from "./ui/button";
import { Ellipsis, Loader2, MessageCircle } from "lucide-react";
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
import { deletePost } from "@/actions/delete-post";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

type PostItemProps = {
  post: Post;
  user_id: User["id"];
};

export default function PostItem({ post, user_id }: PostItemProps) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", post.post_id] });

      if (pathname === `/u/${post.username}/p/${post.post_id}`) {
        router.push("/");
      }
    },
  });

  return (
    <div className="space-y-2 border-b p-4">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
                    <AlertDialogTitle>Delete post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove the post and its comments permanently.
                      You can&apos;t undo this.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () =>
                        await mutation.mutateAsync({ post_id: post.post_id })
                      }
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending && (
                        <Loader2 className="animate-spin" />
                      )}
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
    </div>
  );
}
