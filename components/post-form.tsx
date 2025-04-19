"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/lib/api/deezer/search";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TrackItem from "./track-item";
import { Music } from "lucide-react";
import { Track } from "@/types/track";
import { createClient } from "@/utils/supabase/client";
import { createPost } from "@/data/create-post";

export default function PostForm() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
    },
  });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [track, setTrack] = useState<Track>();

  const { data: tracks, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
    enabled: !!query,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    if (!track) return;

    mutate({
      content: content,
      user_id: user.id,
      deezer_id: track.id,
    });

    setContent("");
    setTrack(undefined);
  };

  return (
    <form className="flex flex-col gap-2 border-b p-4" onSubmit={handleSubmit}>
      <Textarea
        // name="content"
        placeholder="Write your thoughts..."
        className="resize-none"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />

      <div className="flex items-center gap-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              size="icon"
            >
              <Music />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search tracks..."
                value={query}
                onValueChange={setQuery}
              />
              <CommandList>
                {isLoading ? (
                  <CommandEmpty>Loading...</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {tracks?.map((track) => (
                      <CommandItem
                        key={track.id}
                        onSelect={() => {
                          setTrack(track);
                          setOpen(false);
                        }}
                      >
                        <TrackItem track={track} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {/* <input type="text" className="sr-only" name="deezer_id" required /> */}
        {track && (
          <div className="flex-1 rounded-md border p-2">
            <TrackItem track={track} />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        Post
      </Button>
    </form>
  );
}
