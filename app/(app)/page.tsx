import PostForm from "@/components/post-form";
import GlobalFeed from "@/components/global-feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "@/components/following-feed";

export default async function Home() {
  return (
    <>
      <PostForm />
      <Tabs defaultValue="global-feed">
        <div className="border-b px-4 py-2">
          <TabsList className="w-full">
            <TabsTrigger value="global-feed">Global</TabsTrigger>
            <TabsTrigger value="following-feed">Following</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="global-feed">
          <GlobalFeed />
        </TabsContent>
        <TabsContent value="following-feed">
          <FollowingFeed />
        </TabsContent>
      </Tabs>
    </>
  );
}
