"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { SearchCombobox } from "./search-combobox";
import { createPost } from "@/lib/actions/post";

export default function PostForm() {
  const [state, formAction, pending] = useActionState(createPost, {
    errors: {},
  });

  return (
    <form action={formAction} className="flex flex-col gap-4 border-b p-4">
      <div className="flex flex-col gap-1.5">
        <Textarea
          name="content"
          placeholder="Write your thoughts..."
          className="resize-none"
        />
        {state?.errors?.content && (
          <p className="text-destructive text-sm">{state.errors.content[0]}</p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full">
          <SearchCombobox />
          {state?.errors?.deezer_id && (
            <p className="text-destructive text-sm">
              {state.errors.deezer_id[0]}
            </p>
          )}
        </div>
        <Button type="submit" disabled={pending}>
          Post
        </Button>
      </div>
    </form>
  );
}
