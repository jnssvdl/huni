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
import { Loader2, Music } from "lucide-react";
import { Track } from "@/types/track";
import { createPost } from "@/actions/create-post";
import { useUser } from "@/context/user-context";
import useDebounce from "@/hooks/use-debounce";

export default function PostForm() {
  const user = useUser();

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

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: tracks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => search(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <form className="space-y-2 border-b p-4" onSubmit={handleSubmit}>
      <Textarea
        placeholder={
          track
            ? "What's this song making you feel?"
            : "Choose a song and say something, or just let it speak."
        }
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
          <PopoverContent className="p-0" align="start">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Got a song on your mind?"
                value={query}
                onValueChange={setQuery}
              />
              <CommandList>
                {!query ? (
                  <CommandEmpty>Powered by Deezer</CommandEmpty>
                ) : isLoading ? (
                  <CommandEmpty>
                    <div className="flex justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  </CommandEmpty>
                ) : isError ? (
                  <CommandEmpty>
                    Something went wrong. Please try again.
                  </CommandEmpty>
                ) : !tracks || tracks.length === 0 ? (
                  <CommandEmpty>No songs found for {query}</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {tracks.map((track) => (
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
        {track && (
          <div className="min-w-0 flex-1 rounded-md border p-2">
            <TrackItem track={track} />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending && <Loader2 className="animate-spin" />}
        Post
      </Button>
    </form>
  );
}
