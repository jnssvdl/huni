set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_post(target_post_id uuid, viewer_id uuid)
 RETURNS TABLE(post_id uuid, user_id uuid, content text, created_at timestamp with time zone, deezer_id bigint, username text, avatar_url text, like_count bigint, comment_count bigint, has_liked boolean)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS post_id,
    pr.id AS user_id,
    p.content,
    p.created_at,
    p.deezer_id,
    pr.username,
    pr.avatar_url,
    COALESCE((SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id), 0) AS like_count,
    COALESCE((SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id), 0) AS comment_count,
    EXISTS (
      SELECT 1
      FROM likes l
      WHERE l.post_id = p.id AND l.user_id = viewer_id
    ) AS has_liked
  FROM posts p
  JOIN profiles pr ON pr.id = p.user_id
  WHERE p.id = target_post_id
  LIMIT 1;
END;
$function$
;


