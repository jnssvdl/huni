import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/actions/delete-post";
import { usePathname, useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { Button } from "./ui/button";

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
};

export default function DeleteDialog({
  open,
  onOpenChange,
  post,
}: DeleteDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
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
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete post?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the post and its comments permanently. You
            can&apos;t undo this.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={async () =>
                await mutation.mutateAsync({ post_id: post.post_id })
              }
              disabled={mutation.isPending}
              variant={"destructive"}
            >
              {mutation.isPending && <Loader2 className="animate-spin" />}
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
