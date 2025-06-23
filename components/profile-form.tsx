"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/actions/update-profile";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username must be at most 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Invalid username.",
    }),
  bio: z.string().max(160, { message: "Bio must be at most 160 characters." }),
});

type ProfileFormProps = {
  user_id: User["id"];
  initialValues?: z.infer<typeof formSchema>;
  callback?: () => void;
};

export default function ProfileForm({
  user_id,
  initialValues,
  callback,
}: ProfileFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialValues?.username || "",
      bio: initialValues?.bio || "",
    },
  });

  const router = useRouter();

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data.username !== initialValues?.username) {
        router.replace(`/u/${data.username}`);
      }
      queryClient.invalidateQueries({
        queryKey: ["profile", initialValues?.username],
      });
    },
    onError: (err) => {
      if (
        err instanceof Error &&
        err.message === "Username is already taken."
      ) {
        form.setError("username", {
          type: "manual",
          message: err.message,
        });
      } else {
        toast("Something went wrong", {
          description: err instanceof Error ? err.message : "Please try again.",
        });
      }
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (initialValues) {
      await updateMutation.mutateAsync({
        user_id,
        username: values.username,
        bio: values.bio,
      });
    }

    if (callback) callback();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Update your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about yourself"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {updateMutation.isPending && <Loader2 className="animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
}
