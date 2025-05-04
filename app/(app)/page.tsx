import PostForm from "@/components/post-form";
import Feed from "@/components/feed";

export default async function Home() {
  return (
    <>
      <PostForm />
      <Feed />
    </>
  );
}
