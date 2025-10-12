import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export default function PostsComponent() {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // ✅ Required configuration
    cacheTime: 1000 * 60 * 5, // keep data in cache for 5 minutes
    staleTime: 1000 * 30, // data considered fresh for 30 seconds
    refetchOnWindowFocus: false, // don’t refetch when tab regains focus
    keepPreviousData: true, // keep previous data during refetch
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Posts</h2>

      <button
        onClick={() => refetch()}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>

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
