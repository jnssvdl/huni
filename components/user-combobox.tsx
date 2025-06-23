"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Loader2, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "@/data/get-user-list";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function UserCombobox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", query],
    queryFn: () => getUserList(query),
    enabled: !!query,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          size="icon"
        >
          <Search />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Who are you looking for?"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {!query ? (
              <CommandEmpty>Start typing to search for users</CommandEmpty>
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
            ) : !users || users.length === 0 ? (
              <CommandEmpty>No users found for {query}</CommandEmpty>
            ) : (
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => {
                      setOpen(false);
                    }}
                    asChild
                    className="cursor-pointer"
                  >
                    <Link href={`/u/${user.username}`}>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-10">
                          <AvatarImage
                            src={user.avatar_url || "/default_profile.png"}
                            alt={`${user.username} avatar`}
                            className="object-cover"
                          />
                        </Avatar>
                        <div>
                          <h3 className="truncate font-bold">
                            {user.username}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
