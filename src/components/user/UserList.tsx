import type { GitHubUser } from '../../types/github';
import RepoList from '../repo/RepoList';
import { useAccordion } from '../../hooks/useAccordion';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { ChevronDown } from 'lucide-react';
import SkeletonUserList from './SkeletonUserList';

function UserList() {
  const { expanded, toggle } = useAccordion<string>();

  const { data, isLoading } = useSearchUsers();

  if (isLoading) return <SkeletonUserList />;

  return (
    <ul className="flex flex-col gap-3 pb-4">
      {data?.map((user: GitHubUser) => (
        <li key={user.id}>
          <div
            data-testid="user-item"
            className="sticky top-[114px] z-10 flex justify-between items-center gap-2 cursor-pointer select-none rounded bg-gray-100 hover:bg-gray-200 p-2 font-medium"
            onClick={() => toggle(user.login)}
          >
            <span>{user.login}</span>
            <ChevronDown
              className={`shrink-0 w-6 h-6 transform transition-transform duration-200 ${
                expanded === user.login ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
          <div
            className={`transition-all overflow-hidden duration-300 ease-in-out ${
              expanded === user.login ? 'opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {expanded === user.login && <RepoList username={user.login} />}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
