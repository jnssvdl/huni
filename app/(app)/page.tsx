import PostForm from "@/components/post-form";
import GlobalFeed from "@/components/global-feed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "@/components/following-feed";

export default async function Home() {
  return (
    <>
      <PostForm />
      <Tabs defaultValue="global">
        <div className="bg-background sticky top-0 z-10 border-b p-4">
          <TabsList className="w-full">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
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
