import { useQuery } from '@tanstack/react-query';
import type { GitHubUser } from '../types/github';
import { useExplorerStore } from '../store/useExplorerStore';
import { searchGitHubUsers } from '../api/github';

export function useSearchUsers() {
  const { searchQuery } = useExplorerStore();

  return useQuery<GitHubUser[]>({
    queryKey: ['searchUsers', searchQuery],
    queryFn: () => searchGitHubUsers(searchQuery),
    enabled: !!searchQuery,
    retry: false,
  });
}
