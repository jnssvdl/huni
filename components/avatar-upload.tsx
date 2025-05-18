"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { uploadAvatar } from "@/actions/upload-avatar";
import { useUser } from "@/context/user-context";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function AvatarUpload() {
  const mutation = useMutation({ mutationFn: uploadAvatar });

  const [avatar, setAvatar] = useState<string | null>(null);

  const user = useUser();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      mutation.mutate({ user_id: user.id, file: file });
    }
  };

  return (
    <div>
      <Avatar className="h-32 w-32">
        <AvatarImage
          src={avatar || "/default_profile.png"}
          alt="Avatar preview"
          className="object-cover"
        />
      </Avatar>
      <Button variant="outline" asChild>
        <label htmlFor="avatar" className="cursor-pointer">
          <Upload />
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
  );
}
