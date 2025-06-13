import axios from "axios";
import type { GitHubRepo, GitHubUser } from "../types/github";

const GITHUB_API_BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
});

export const searchGitHubUsers = async (
  query: string,
  limit: number = 5
): Promise<GitHubUser[]> => {
  const res = await axiosInstance.get(
    `${GITHUB_API_BASE_URL}/search/users?q=${query}&per_page=${limit}`
  );
  return res.data.items;
};

export const getUserRepos = async (username: string): Promise<GitHubRepo[]> => {
  const res = await axiosInstance.get(
    `${GITHUB_API_BASE_URL}/users/${username}/repos`
  );
  return res.data;
};
