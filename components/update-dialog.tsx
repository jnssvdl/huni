import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Post } from "@/types/post";
import TrackItem from "./track-item";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/actions/update-post";
import { Loader2 } from "lucide-react";

type UpdateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post;
};

export default function UpdateDialog({
  open,
  onOpenChange,
  post,
}: UpdateDialogProps) {
  const [content, setContent] = useState(post.content);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["post", data.id] });
    },
  });

  const handleUpdate = async () => {
    await mutation.mutateAsync({ content, post_id: post.post_id });
    setContent("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update post</DialogTitle>
          <DialogDescription>
            Changed your mind about this song?
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2">
          <Textarea
            placeholder={"What's this song making you feel?"}
            className="resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="rounded-md border p-2">
            <TrackItem track={post.track} />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdate} disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
