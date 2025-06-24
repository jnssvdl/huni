"use client";

import { useEffect, useState } from "react";
import PostForm from "@/components/post-form";
import GlobalFeed from "@/components/global-feed";
import FollowingFeed from "@/components/following-feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TAB_KEY = "feed-tab";

export default function Home() {
  const [tab, setTab] = useState("global");

  useEffect(() => {
    const stored = localStorage.getItem(TAB_KEY);
    if (stored) setTab(stored);
  }, []);

  const handleTabChange = (value: string) => {
    setTab(value);
    localStorage.setItem(TAB_KEY, value);
  };

  return (
    <>
      <PostForm />
      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="bg-background sticky top-0 z-10 border-b p-4">
          <TabsList className="w-full">
            <TabsTrigger
              value="global"
              className="dark:data-[state=active]:bg-background"
            >
              Global
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="dark:data-[state=active]:bg-background"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="global">
          <GlobalFeed />
        </TabsContent>
        <TabsContent value="following">
          <FollowingFeed />
        </TabsContent>
      </Tabs>
    </>
  );
}
