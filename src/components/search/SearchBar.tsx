import { useSearchUsers } from '../../hooks/useSearchUsers';
import { useExplorerStore } from '../../store/useExplorerStore';

function SearchBar() {
  const { query, setQuery, setSearchQuery } = useExplorerStore();
  const { isLoading } = useSearchUsers();

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearchQuery(query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="sticky bg-white z-30 pt-4 top-0 flex max-sm:flex-col gap-4">
      <input
        data-testid="username-input"
        className="border py-2 px-4 w-full rounded bg-gray-100 focus-visible:outline-none"
        placeholder="Enter username"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        data-testid="search-button"
        className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 disabled:opacity-50"
        onClick={handleSearch}
        disabled={isLoading}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
