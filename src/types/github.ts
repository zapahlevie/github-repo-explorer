export interface GitHubUser {
  id: number;
  login: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}
