// SearchBar.test.tsx
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import * as store from '../../store/useExplorerStore';
import type { ExplorerState } from '../../store/useExplorerStore';
import * as useSearchUsersModule from '../../hooks/useSearchUsers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

vi.mock('../../store/useExplorerStore');
vi.mock('../../hooks/useSearchUsers');

const queryClient = new QueryClient();

describe('SearchBar', () => {
  const setQuery = vi.fn();
  const setSearchQuery = vi.fn();

  let queryValue = '';
  let storeMock: Partial<ExplorerState>;
  beforeEach(() => {
    vi.clearAllMocks();
    queryValue = '';
    storeMock = {
      get query() {
        return queryValue;
      },
      setQuery: (val: string) => {
        queryValue = val;
        setQuery(val);
      },
      setSearchQuery,
    };
    (store.useExplorerStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => storeMock
    );
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
    });
  });

  function renderComponentWithState() {
    const Wrapper = () => {
      const [query, setQueryState] = React.useState('');
      React.useEffect(() => {
        queryValue = query;
      }, [query]);
      storeMock.setQuery = (val: string) => {
        setQueryState(val);
        queryValue = val;
        setQuery(val);
      };
      return (
        <QueryClientProvider client={queryClient}>
          <SearchBar />
        </QueryClientProvider>
      );
    };
    return render(<Wrapper />);
  }

  function changeInputValue(value: string) {
    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value } });
    fireEvent.blur(input);
  }

  it('renders input and button', () => {
    renderComponentWithState();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls setQuery on input change', () => {
    renderComponentWithState();
    const input = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(input, { target: { value: 'octocat' } });
    expect(setQuery).toHaveBeenCalledWith('octocat');
  });

  it('calls setSearchQuery on button click', async () => {
    renderComponentWithState();
    changeInputValue('octocat');
    const button = screen.getByRole('button', { name: /search/i });
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
    fireEvent.click(button);
    expect(setSearchQuery).toHaveBeenCalled();
  });

  it('calls setSearchQuery on Enter key press', async () => {
    renderComponentWithState();
    changeInputValue('octocat');
    const input = screen.getByPlaceholderText(/enter username/i);
    await waitFor(() => {
      expect(input).toHaveValue('octocat');
    });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(setSearchQuery).toHaveBeenCalled();
  });

  it('disables button when loading', () => {
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: true,
    });
    renderComponentWithState();
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
  });
});
