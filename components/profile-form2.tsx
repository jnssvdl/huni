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
import { createProfile } from "@/actions/create-profile2";
import { User } from "@supabase/supabase-js";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(30, { message: "Username must be at most 30 characters." }),
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
        router.replace(`/users/${data.username}`);
      }
      queryClient.invalidateQueries({
        queryKey: ["profile", initialValues?.username],
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", initialValues?.username],
      });
      router.replace("/");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (initialValues) {
      updateMutation.mutate({
        user_id,
        username: values.username,
        bio: values.bio,
      });
    } else {
      createMutation.mutate({
        id: user_id,
        username: values.username,
        bio: values.bio,
      });
    }

    if (callback) callback();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="E.g. jnssvdl" {...field} />
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
                  placeholder="E.g. Just out here sharing songs that slap."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {!initialValues ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
}
