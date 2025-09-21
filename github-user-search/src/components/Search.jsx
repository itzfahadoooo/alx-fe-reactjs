import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

export default function Search() {
  // basic user search
  const [username, setUsername] = useState("");
  const [singleUser, setSingleUser] = useState(null);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [singleError, setSingleError] = useState("");

  // advanced search
  const [qTerm, setQTerm] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchError, setSearchError] = useState("");

  const perPage = 20;

  async function onSearchUser(e) {
    e && e.preventDefault();
    if (!username) return;
    setLoadingSingle(true);
    setSingleError("");
    setSingleUser(null);
    try {
      const data = await fetchUserData(username.trim());
      setSingleUser(data);
    } catch {
      setSingleError("Looks like we cant find the user");
    } finally {
      setLoadingSingle(false);
    }
  }

  async function onAdvancedSearch(e) {
    e && e.preventDefault();
    setLoadingSearch(true);
    setSearchError("");
    setResults([]);
    setPage(1);
    try {
      const res = await searchUsers({
        qTerm: qTerm.trim(),
        location: location.trim(),
        minRepos: minRepos ? Number(minRepos) : 0,
        per_page: perPage,
        page: 1,
      });
      setResults(res.items || []);
      setTotalCount(res.total_count || 0);
    } catch {
      setSearchError("Search failed. Try again later or adjust your criteria.");
    } finally {
      setLoadingSearch(false);
    }
  }

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingSearch(true);
    try {
      const res = await searchUsers({
        qTerm: qTerm.trim(),
        location: location.trim(),
        minRepos: minRepos ? Number(minRepos) : 0,
        per_page: perPage,
        page: nextPage,
      });
      setResults((prev) => [...prev, ...(res.items || [])]);
      setPage(nextPage);
    } catch {
      setSearchError("Failed to load more results.");
    } finally {
      setLoadingSearch(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Basic single-user search */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Search by username</h2>
        <form className="flex gap-2" onSubmit={onSearchUser}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="octocat"
            className="flex-1 border rounded px-3 py-2"
          />
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded">
            Search
          </button>
        </form>

        <div className="mt-4">
          {loadingSingle && <div>Loading...</div>}
          {singleError && <div className="text-red-500">{singleError}</div>}
          {singleUser && (
            <div className="mt-3 border p-4 rounded flex items-center gap-4">
              <img
                src={singleUser.avatar_url}
                alt={singleUser.login}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{singleUser.login}</h3>
                <a
                  href={singleUser.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Advanced search */}
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">Advanced search</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
          onSubmit={onAdvancedSearch}
        >
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600">Keywords</label>
            <input
              value={qTerm}
              onChange={(e) => setQTerm(e.target.value)}
              placeholder="name or language"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="San Francisco"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Min repos</label>
            <input
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="0"
              type="number"
              min="0"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="md:col-span-4">
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-6">
          {loadingSearch && <div>Loading...</div>}
          {searchError && <div className="text-red-500">{searchError}</div>}

          {!loadingSearch && !searchError && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Results: {totalCount}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((u) => (
                  <div
                    key={u.id}
                    className="border rounded p-3 flex items-center gap-3"
                  >
                    <img
                      src={u.avatar_url}
                      alt={u.login}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{u.login}</p>
                      <a
                        href={u.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {results.length > 0 && results.length < totalCount && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMore}
                    className="px-4 py-2 border rounded"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
