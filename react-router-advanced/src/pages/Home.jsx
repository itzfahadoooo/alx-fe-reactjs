import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome to Advanced Routing Demo</h1>
      <nav className="space-x-4">
        <Link to="/about" className="text-blue-600">About</Link>
        <Link to="/profile/details" className="text-blue-600">Profile</Link>
        <Link to="/blog/1" className="text-blue-600">Blog Post #1</Link>
      </nav>
    </div>
  );
}
