import axios from "axios";

const GITHUB_BASE = "https://api.github.com";

// Optional token for higher rate limits — set VITE_APP_GITHUB_API_KEY in .env if you have one.
const token = import.meta.env.VITE_APP_GITHUB_API_KEY || "";

const client = axios.create({
  baseURL: GITHUB_BASE,
  headers: token ? { Authorization: `token ${token}` } : {},
  timeout: 10000,
});

/**
 * Fetch a single user by username.
 * @param {string} username
 */
export async function fetchUserData(username) {
  const url = `/users/${encodeURIComponent(username)}`;
  const res = await client.get(url);
  return res.data;
}

/**
 * Advanced search using GitHub Search API (users).
 * Accepts { qTerm, location, minRepos, per_page, page }
 * Returns search response (items + total_count)
 */
export async function searchUsers({ qTerm = "", location = "", minRepos = 0, per_page = 30, page = 1 }) {
  // Build query
  let queryParts = [];
  if (qTerm) queryParts.push(qTerm);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos && Number(minRepos) > 0) queryParts.push(`repos:>=${minRepos}`);

  const q = encodeURIComponent(queryParts.join(" ").trim() || "type:user");

  const url = `/search/users?q=${q}&per_page=${per_page}&page=${page}`;
  const res = await client.get(url);
  return res.data; // { total_count, incomplete_results, items: [] }
}
