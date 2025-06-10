create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "post_id" uuid not null,
    "user_id" uuid not null,
    "content" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."comments" enable row level security;

create table "public"."follows" (
    "id" uuid not null default gen_random_uuid(),
    "follower_id" uuid not null,
    "following_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."follows" enable row level security;

create table "public"."likes" (
    "id" uuid not null default gen_random_uuid(),
    "post_id" uuid not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."likes" enable row level security;

create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "content" text not null,
    "is_read" boolean not null default false,
    "recipient_id" uuid not null,
    "actor_id" uuid,
    "post_id" uuid,
    "comment_id" uuid,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."notifications" enable row level security;

create table "public"."posts" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "content" text,
    "deezer_id" bigint not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."posts" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "username" text not null,
    "bio" text,
    "avatar_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX follows_follower_id_following_id_key ON public.follows USING btree (follower_id, following_id);

CREATE UNIQUE INDEX follows_pkey ON public.follows USING btree (id);

CREATE UNIQUE INDEX likes_pkey ON public.likes USING btree (id);

CREATE UNIQUE INDEX likes_post_id_user_id_key ON public.likes USING btree (post_id, user_id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."follows" add constraint "follows_pkey" PRIMARY KEY using index "follows_pkey";

alter table "public"."likes" add constraint "likes_pkey" PRIMARY KEY using index "likes_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."comments" add constraint "comments_content_check" CHECK ((length(content) <= 280)) not valid;

alter table "public"."comments" validate constraint "comments_content_check";

alter table "public"."comments" add constraint "comments_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_post_id_fkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."follows" add constraint "follows_check" CHECK ((follower_id <> following_id)) not valid;

alter table "public"."follows" validate constraint "follows_check";

alter table "public"."follows" add constraint "follows_follower_id_fkey" FOREIGN KEY (follower_id) REFERENCES profiles(id) not valid;

alter table "public"."follows" validate constraint "follows_follower_id_fkey";

alter table "public"."follows" add constraint "follows_follower_id_following_id_key" UNIQUE using index "follows_follower_id_following_id_key";

alter table "public"."follows" add constraint "follows_following_id_fkey" FOREIGN KEY (following_id) REFERENCES profiles(id) not valid;

alter table "public"."follows" validate constraint "follows_following_id_fkey";

alter table "public"."likes" add constraint "likes_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."likes" validate constraint "likes_post_id_fkey";

alter table "public"."likes" add constraint "likes_post_id_user_id_key" UNIQUE using index "likes_post_id_user_id_key";

alter table "public"."likes" add constraint "likes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."likes" validate constraint "likes_user_id_fkey";

alter table "public"."notifications" add constraint "notifications_actor_id_fkey" FOREIGN KEY (actor_id) REFERENCES profiles(id) not valid;

alter table "public"."notifications" validate constraint "notifications_actor_id_fkey";

alter table "public"."notifications" add constraint "notifications_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_comment_id_fkey";

alter table "public"."notifications" add constraint "notifications_post_id_fkey" FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_post_id_fkey";

alter table "public"."notifications" add constraint "notifications_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES profiles(id) not valid;

alter table "public"."notifications" validate constraint "notifications_recipient_id_fkey";

alter table "public"."posts" add constraint "posts_content_check" CHECK (((content IS NULL) OR (length(content) <= 280))) not valid;

alter table "public"."posts" validate constraint "posts_content_check";

alter table "public"."posts" add constraint "posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) not valid;

alter table "public"."posts" validate constraint "posts_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_bio_check" CHECK (((bio IS NULL) OR (length(bio) <= 160))) not valid;

alter table "public"."profiles" validate constraint "profiles_bio_check";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_check" CHECK (((length(username) >= 3) AND (length(username) <= 30))) not valid;

alter table "public"."profiles" validate constraint "profiles_username_check";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_comment_list(target_post_id uuid, offset_count integer, limit_count integer)
 RETURNS TABLE(comment_id uuid, user_id uuid, content text, created_at timestamp with time zone, username text, avatar_url text)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    c.id AS comment_id,
    pr.id AS user_id,  -- added
    c.content,
    c.created_at,
    pr.username,
    pr.avatar_url
  FROM comments c
  JOIN profiles pr ON pr.id = c.user_id
  WHERE c.post_id = target_post_id
  ORDER BY c.created_at DESC
  OFFSET offset_count
  LIMIT limit_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_following_feed(viewer_id uuid, offset_count integer, limit_count integer)
 RETURNS TABLE(post_id uuid, content text, created_at timestamp with time zone, deezer_id bigint, username text, avatar_url text, user_id uuid, like_count bigint, comment_count bigint, has_liked boolean)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS post_id,
    p.content,
    p.created_at,
    p.deezer_id,
    pr.username,
    pr.avatar_url,
    pr.id AS user_id,
    COALESCE((SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id), 0) AS like_count,
    COALESCE((SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id), 0) AS comment_count,
    EXISTS (
      SELECT 1
      FROM likes l
      WHERE l.post_id = p.id AND l.user_id = viewer_id
    ) AS has_liked
  FROM posts p
  JOIN profiles pr ON pr.id = p.user_id
  WHERE p.user_id IN (
    SELECT following_id
    FROM follows
    WHERE follower_id = viewer_id
  )
  ORDER BY p.created_at DESC
  OFFSET offset_count
  LIMIT limit_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_global_feed(viewer_id uuid, offset_count integer, limit_count integer)
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
      WHERE l.post_id = p.id AND l.user_id = get_global_feed.viewer_id
    ) AS has_liked
  FROM posts p
  JOIN profiles pr ON pr.id = p.user_id
  ORDER BY p.created_at DESC
  OFFSET offset_count
  LIMIT limit_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_post(target_post_id uuid, viewer_username text)
 RETURNS TABLE(post_id uuid, user_id uuid, content text, created_at timestamp with time zone, deezer_id bigint, username text, avatar_url text, like_count bigint, comment_count bigint, has_liked boolean)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS post_id,
    pr.id AS user_id,  -- added
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
      JOIN profiles vpr ON vpr.id = l.user_id
      WHERE l.post_id = p.id AND vpr.username = viewer_username
    ) AS has_liked
  FROM posts p
  JOIN profiles pr ON pr.id = p.user_id
  WHERE p.id = target_post_id
  LIMIT 1;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_profile(target_username text, viewer_id uuid)
 RETURNS TABLE(user_id uuid, username text, bio text, avatar_url text, created_at timestamp with time zone, updated_at timestamp with time zone, followers_count bigint, following_count bigint, has_followed boolean)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    pr.id AS user_id,
    pr.username,
    pr.bio,
    pr.avatar_url,
    pr.created_at,
    pr.updated_at,
    COALESCE((SELECT COUNT(*) FROM follows f WHERE f.following_id = pr.id), 0) AS followers_count,
    COALESCE((SELECT COUNT(*) FROM follows f WHERE f.follower_id = pr.id), 0) AS following_count,
    EXISTS (
      SELECT 1
      FROM follows f
      WHERE f.following_id = pr.id AND f.follower_id = viewer_id
    ) AS has_followed
  FROM profiles pr
  WHERE pr.username = target_username
  LIMIT 1;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_user_feed(target_user_id uuid, viewer_id uuid, offset_count integer, limit_count integer)
 RETURNS TABLE(post_id uuid, user_id uuid, content text, created_at timestamp with time zone, deezer_id bigint, username text, avatar_url text, like_count bigint, comment_count bigint, has_liked boolean)
 LANGUAGE plpgsql
 STABLE
AS $function$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS post_id,
    p.user_id,
    p.content,
    p.created_at,
    p.deezer_id,
    pr.username,
    pr.avatar_url,
    COALESCE((SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id), 0) AS like_count,
    COALESCE((SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id), 0) AS comment_count,
    EXISTS (
      SELECT 1 FROM likes l
      WHERE l.post_id = p.id AND l.user_id = viewer_id
    ) AS has_liked
  FROM posts p
  JOIN profiles pr ON pr.id = p.user_id
  WHERE p.user_id = target_user_id
  ORDER BY p.created_at DESC
  OFFSET offset_count
  LIMIT limit_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."follows" to "anon";

grant insert on table "public"."follows" to "anon";

grant references on table "public"."follows" to "anon";

grant select on table "public"."follows" to "anon";

grant trigger on table "public"."follows" to "anon";

grant truncate on table "public"."follows" to "anon";

grant update on table "public"."follows" to "anon";

grant delete on table "public"."follows" to "authenticated";

grant insert on table "public"."follows" to "authenticated";

grant references on table "public"."follows" to "authenticated";

grant select on table "public"."follows" to "authenticated";

grant trigger on table "public"."follows" to "authenticated";

grant truncate on table "public"."follows" to "authenticated";

grant update on table "public"."follows" to "authenticated";

grant delete on table "public"."follows" to "service_role";

grant insert on table "public"."follows" to "service_role";

grant references on table "public"."follows" to "service_role";

grant select on table "public"."follows" to "service_role";

grant trigger on table "public"."follows" to "service_role";

grant truncate on table "public"."follows" to "service_role";

grant update on table "public"."follows" to "service_role";

grant delete on table "public"."likes" to "anon";

grant insert on table "public"."likes" to "anon";

grant references on table "public"."likes" to "anon";

grant select on table "public"."likes" to "anon";

grant trigger on table "public"."likes" to "anon";

grant truncate on table "public"."likes" to "anon";

grant update on table "public"."likes" to "anon";

grant delete on table "public"."likes" to "authenticated";

grant insert on table "public"."likes" to "authenticated";

grant references on table "public"."likes" to "authenticated";

grant select on table "public"."likes" to "authenticated";

grant trigger on table "public"."likes" to "authenticated";

grant truncate on table "public"."likes" to "authenticated";

grant update on table "public"."likes" to "authenticated";

grant delete on table "public"."likes" to "service_role";

grant insert on table "public"."likes" to "service_role";

grant references on table "public"."likes" to "service_role";

grant select on table "public"."likes" to "service_role";

grant trigger on table "public"."likes" to "service_role";

grant truncate on table "public"."likes" to "service_role";

grant update on table "public"."likes" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."posts" to "anon";

grant insert on table "public"."posts" to "anon";

grant references on table "public"."posts" to "anon";

grant select on table "public"."posts" to "anon";

grant trigger on table "public"."posts" to "anon";

grant truncate on table "public"."posts" to "anon";

grant update on table "public"."posts" to "anon";

grant delete on table "public"."posts" to "authenticated";

grant insert on table "public"."posts" to "authenticated";

grant references on table "public"."posts" to "authenticated";

grant select on table "public"."posts" to "authenticated";

grant trigger on table "public"."posts" to "authenticated";

grant truncate on table "public"."posts" to "authenticated";

grant update on table "public"."posts" to "authenticated";

grant delete on table "public"."posts" to "service_role";

grant insert on table "public"."posts" to "service_role";

grant references on table "public"."posts" to "service_role";

grant select on table "public"."posts" to "service_role";

grant trigger on table "public"."posts" to "service_role";

grant truncate on table "public"."posts" to "service_role";

grant update on table "public"."posts" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Comments are viewable by everyone"
on "public"."comments"
as permissive
for select
to public
using (true);


create policy "Users can delete their own comments"
on "public"."comments"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can insert their own comments"
on "public"."comments"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update their own comments"
on "public"."comments"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Follows are viewable by everyone"
on "public"."follows"
as permissive
for select
to public
using (true);


create policy "Users can delete their own follows"
on "public"."follows"
as permissive
for delete
to public
using ((auth.uid() = follower_id));


create policy "Users can insert their own follows"
on "public"."follows"
as permissive
for insert
to public
with check ((auth.uid() = follower_id));


create policy "Likes are viewable by everyone"
on "public"."likes"
as permissive
for select
to public
using (true);


create policy "Users can delete their own likes"
on "public"."likes"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can insert their own likes"
on "public"."likes"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "System can insert notifications"
on "public"."notifications"
as permissive
for insert
to public
with check (true);


create policy "Users can update their own notifications"
on "public"."notifications"
as permissive
for update
to public
using ((auth.uid() = recipient_id));


create policy "Users can view their own notifications"
on "public"."notifications"
as permissive
for select
to public
using ((auth.uid() = recipient_id));


create policy "Posts are viewable by everyone"
on "public"."posts"
as permissive
for select
to public
using (true);


create policy "Users can delete their own posts"
on "public"."posts"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can insert their own posts"
on "public"."posts"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update their own posts"
on "public"."posts"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Public profiles are viewable by everyone"
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile"
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update their own profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();


