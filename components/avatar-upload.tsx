"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "./ui/input";
import { Avatar, AvatarImage } from "./ui/avatar";
import { uploadAvatar } from "@/actions/upload-avatar";
import { Profile } from "@/types/profile";

type AvatarUploadProps = {
  avatar_url: Profile["avatar_url"];
  user_id: Profile["user_id"];
  username: Profile["username"];
};

export default function AvatarUpload({
  avatar_url,
  user_id,
  username,
}: AvatarUploadProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutation.mutate({ user_id, file });
    }
  };

  return (
    <>
      <label htmlFor="avatar" className="cursor-pointer">
        <Avatar className="size-24">
          <AvatarImage
            src={avatar_url || "/default_profile.png"}
            alt={`${username} avatar`}
            className="object-cover"
          />
        </Avatar>
      </label>

      <Input
        id="avatar"
        type="file"
        accept="image/*"
        className="hidden"
        name="avatar"
        onChange={handleAvatarChange}
      />
    </>
  );
}
