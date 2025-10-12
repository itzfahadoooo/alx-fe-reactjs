import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch posts
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

// Add a new post
const addPost = async (newPost) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  if (!res.ok) throw new Error("Failed to add post");
  return res.json();
};

export default function PostsComponent() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Fetch posts
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Mutation for adding a post
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (newPost) => {
      // Update cache
      queryClient.setQueryData(["posts"], (old) => [...old, newPost]);
      setTitle("");
      setBody("");
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Posts</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title || !body) return alert("Please fill all fields");
          mutation.mutate({ title, body, userId: 1 });
        }}
        className="space-y-3 mb-5"
      >
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {mutation.isPending ? "Adding..." : "Add Post"}
        </button>
      </form>

      {mutation.isError && (
        <p className="text-red-500">{mutation.error.message}</p>
      )}

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <p className="font-semibold">{post.title}</p>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
