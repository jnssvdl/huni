"use client";

import { Profile } from "@/types/profile";
import { Avatar, AvatarImage } from "./ui/avatar";
import FollowButton from "./follow-button";
import { useUser } from "@/context/user-context";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileForm from "./profile-form";
import { useState } from "react";
import AvatarUpload from "./avatar-upload";

type ProfileCardProps = {
  profile: Profile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  const { id } = useUser();

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 border-b p-4">
      <div className="flex items-start justify-between">
        {/* Avatar */}

        {profile.user_id === id ? (
          <AvatarUpload
            avatar_url={profile.avatar_url}
            user_id={profile.user_id}
            username={profile.username}
          />
        ) : (
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={profile.avatar_url || "/default_profile.png"}
              alt={`${profile.username} avatar`}
            />
          </Avatar>
        )}

        {id === profile.user_id ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <Pencil />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
                <ProfileForm
                  user_id={id}
                  initialValues={{
                    username: profile.username,
                    bio: profile.bio,
                  }}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <FollowButton
            hasFollowed={profile.has_followed}
            follower_id={id}
            following_id={profile.user_id}
            username={profile.username}
          />
        )}
      </div>

      {/* Username and Bio */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">@{profile.username}</h2>
        <p className="text-muted-foreground">
          {profile.bio ? profile.bio : "No bio available"}
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-2">
        <span className="text-muted-foreground">
          {profile.following_count} Following
        </span>
        <span className="text-muted-foreground">
          {profile.followers_count} Followers
        </span>
      </div>
    </div>
  );
}
