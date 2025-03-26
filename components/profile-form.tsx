"use client";

import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createProfile } from "@/app/actions";
import { Upload } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";

export default function ProfileForm() {
  const [state, formAction, pending] = useActionState(createProfile, {
    errors: {},
  });
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-40 w-40">
          <AvatarImage
            src={avatar || "/default_profile.png"}
            alt="Avatar preview"
            className="object-cover"
          />
        </Avatar>

        <Button variant="outline" className="max-w-40" asChild>
          <label htmlFor="avatar" className="cursor-pointer">
            <Upload className="h-3.5 w-3.5" />
            <span>Upload avatar</span>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="sr-only"
              name="avatar"
              onChange={handleAvatarChange}
            />
          </label>
        </Button>
      </div>

      {state?.errors.avatar && (
        <p className="text-destructive">{state.errors.avatar[0]}</p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="username" className="text-sm">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="username"
          placeholder="Username"
          min={3}
          max={30}
          required
        />
        {state?.errors.username && (
          <p className="text-destructive text-sm">{state.errors.username[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bio" className="text-sm">
          Bio
        </Label>
        <Textarea id="bio" name="bio" placeholder="Bio" maxLength={160} />
        {state?.errors.bio && (
          <p className="text-destructive text-sm">{state.errors.bio[0]}</p>
        )}
      </div>

      <Button type="submit" disabled={pending} className="w-full">
        Continue
      </Button>
    </form>
  );
}
