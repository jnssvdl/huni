"use client";

import { useQuery } from "@tanstack/react-query";
import { search } from "@/lib/api/deezer/search";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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

export function SearchCombobox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<Track>();

  const { data: tracks, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
    enabled: !!query,
  });

  return (
    <div className="flex w-full items-center gap-2">
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
      {track ? (
        <div className="flex-1 rounded-md border p-2">
          <input
            type="text"
            className="sr-only"
            name="deezer_id"
            value={track.id}
            readOnly
            required
          />
          <TrackItem track={track} />
        </div>
      ) : (
        <input type="text" name="deezer_id" className="sr-only" required />
      )}
    </div>
  );
}
