import PostForm from "@/components/post-form";
import GlobalFeed from "@/components/global-feed";

export default async function Home() {
  return (
    <>
      <PostForm />
      <GlobalFeed />
    </>
  );
}
