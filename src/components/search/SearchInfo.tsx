import { useSearchUsers } from '../../hooks/useSearchUsers';
import { useExplorerStore } from '../../store/useExplorerStore';

function SearchInfo() {
  const { searchQuery } = useExplorerStore();
  const { data, isLoading, isError } = useSearchUsers();

  const hasResults = data && data.length > 0;
  const showInfo = !!searchQuery;

  if (!showInfo) return null;

  const message = isError
    ? 'Error loading users'
    : isLoading || hasResults
      ? `Showing users for "${searchQuery}"`
      : `No result found for "${searchQuery}"`;

  return (
    <div className="sticky z-20 top-[58px] py-4 flex flex-col bg-white gap-2">
      <span data-testid="search-info" className={isError ? 'text-red-500' : 'text-gray-500'}>
        {message}
      </span>
    </div>
  );
}

export default SearchInfo;
