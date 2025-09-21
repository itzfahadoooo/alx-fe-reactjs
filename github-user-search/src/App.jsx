import React from "react";
import Search from "./components/Search";

export default function App() {
  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">GitHub User Search</h1>
          <p className="text-sm text-gray-600 mt-1">Search users, filter by location and repo count.</p>
        </header>

        <Search />
      </div>
    </div>
  );
}
