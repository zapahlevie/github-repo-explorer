// SearchInfo.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SearchInfo from './SearchInfo';
import * as store from '../../store/useExplorerStore';
import * as useSearchUsersModule from '../../hooks/useSearchUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

vi.mock('../../store/useExplorerStore');
vi.mock('../../hooks/useSearchUsers');

const queryClient = new QueryClient();

function renderWithProviders() {
  return render(
    <QueryClientProvider client={queryClient}>
      <SearchInfo />
    </QueryClientProvider>
  );
}

describe('SearchInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function setupStore(searchQuery: string) {
    (store.useExplorerStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      searchQuery,
    });
  }

  type TestUser = { id: number };

  function setupSearchUsers({
    data = [],
    isLoading = false,
    isError = false,
  }: {
    data?: TestUser[];
    isLoading?: boolean;
    isError?: boolean;
  }) {
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data,
      isLoading,
      isError,
    });
  }

  it('renders nothing if searchQuery is empty', () => {
    setupStore('');
    setupSearchUsers({});
    const { container } = renderWithProviders();
    expect(container.firstChild).toBeNull();
  });

  it('shows loading/results message when loading', () => {
    setupStore('octocat');
    setupSearchUsers({ isLoading: true });
    renderWithProviders();
    expect(screen.getByTestId('search-info')).toHaveTextContent('Showing users for "octocat"');
  });

  it('shows results message when data is present', () => {
    setupStore('octocat');
    setupSearchUsers({ data: [{ id: 1 }], isLoading: false });
    renderWithProviders();
    expect(screen.getByTestId('search-info')).toHaveTextContent('Showing users for "octocat"');
  });

  it('shows no result message when data is empty', () => {
    setupStore('octocat');
    setupSearchUsers({ data: [], isLoading: false });
    renderWithProviders();
    expect(screen.getByTestId('search-info')).toHaveTextContent('No result found for "octocat"');
  });

  it('shows error message when isError is true', () => {
    setupStore('octocat');
    setupSearchUsers({ isError: true });
    renderWithProviders();
    expect(screen.getByTestId('search-info')).toHaveTextContent('Error loading users');
    expect(screen.getByTestId('search-info')).toHaveClass('text-red-500');
  });
});
