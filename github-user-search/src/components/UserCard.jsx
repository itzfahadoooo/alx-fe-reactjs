import React, { useEffect, useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function UserCard({ user, showExtra = false }) {
  // `user` may be either an item from search (which has limited fields)
  // or a full user object from /users/{username}.
  const [full, setFull] = useState(user);
  const isPartial = !user.name && user.login && user.url && !user.bio;

  useEffect(() => {
    let mounted = true;
    async function loadFull() {
      if (!isPartial) return;
      try {
        const data = await fetchUserData(user.login);
        if (mounted) setFull(data);
      } catch{
        // ignore
      }
    }
    loadFull();
    return () => (mounted = false);
  }, [user, isPartial]);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex gap-4">
      <img src={full.avatar_url || user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{full.name || full.login}</div>
            <div className="text-sm text-gray-600">@{full.login}</div>
          </div>
          <a className="text-sm underline" href={full.html_url || user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
        </div>

        { (showExtra || full.bio) && <p className="mt-2 text-sm text-gray-700">{full.bio}</p> }

        <div className="mt-3 text-xs text-gray-600 flex gap-4">
          {full.location && <span>📍 {full.location}</span>}
          {typeof full.public_repos !== "undefined" && <span>📦 {full.public_repos} repos</span>}
          {full.followers !== undefined && <span>👥 {full.followers} followers</span>}
        </div>
      </div>
    </div>
  );
}
