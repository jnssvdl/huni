import { Track } from "./track";

export type Post = {
  track: Track;
  post_id: string;
  content: string;
  created_at: string;
  deezer_id: number;
  username: string;
  avatar_url: string;
  like_count: number;
  comment_count: number;
  has_liked: boolean;
};
