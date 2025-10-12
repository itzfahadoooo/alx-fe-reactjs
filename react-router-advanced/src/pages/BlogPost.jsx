import React from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-2">Blog Post #{id}</h2>
      <p>This page is dynamically generated using the route parameter.</p>
    </div>
  );
}
