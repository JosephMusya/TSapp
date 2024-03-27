import { useState } from "react";

export interface Post {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

export const fetchPosts = async (endpoint: string): Promise<Post[]> => {
  let posts: Post[] = [];
  const getPosts = await fetch(endpoint, {
    method: "GET",
  });
  if (getPosts.ok) {
    posts = await getPosts.json();
  } else {
    posts = [];
  }
  return posts;
};

export const makePost = async (
  endpoint: string,
  title: string,
  body: string
): Promise<Post> => {
  const [post, setPost] = useState<Post | null>();

  console.log("POKPPPPPP");

  const submitPost = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  });

  if (submitPost.ok) {
    const post: Post = await submitPost.json();
    setPost(post);
    console.log(post);
  } else {
    console.log("NONE");
    setPost(null);
  }
  console.log(post);
  return <Post>post;
};
