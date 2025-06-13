import { useQuery } from '@tanstack/react-query';
import type { GitHubRepo } from '../types/github';
import { getUserRepos } from '../api/github';

export function useUserRepo(username: string) {
  return useQuery<GitHubRepo[]>({
    queryKey: ['repos', username],
    queryFn: () => getUserRepos(username),
    retry: false,
  });
}
