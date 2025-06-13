import type { GitHubRepo } from '../../types/github';
import { useUserRepo } from '../../hooks/useUserRepo';
import { Star } from 'lucide-react';
import { formatCompactNumber } from '../../utils/formatNumber';
import SkeletonRepoList from './SkeletonRepoList';

type Props = {
  username: string;
};

function RepoList({ username }: Props) {
  const { data, isLoading, isError } = useUserRepo(username);

  if (isLoading) return <SkeletonRepoList />;
  if (isError) return <div className="text-red-500 my-2 ml-4">Error loading repositories.</div>;

  return (
    <ul className="flex flex-col gap-3 my-2 ml-4">
      {data?.map((repo: GitHubRepo) => (
        <li key={repo.id}>
          <a data-testid="repo-item" href={repo.html_url} target="_blank" rel="noopener noreferrer">
            <div className="flex justify-between rounded bg-gray-200 hover:bg-gray-300 gap-4 p-2">
              <div className="flex flex-col">
                <span className="font-bold text-lg">{repo.name}</span>
                <span className="text-gray-500 text-sm">
                  {repo.description || 'No description'}
                </span>
              </div>
              <div className="flex gap-1 items-start">
                <span className="font-bold text-lg">
                  {formatCompactNumber(repo.stargazers_count)}
                </span>
                <Star className="w-4 h-4 fill-[#213547] mt-[6px]" />
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default RepoList;
