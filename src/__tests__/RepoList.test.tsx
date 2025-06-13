// RepoList.test.tsx
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import RepoList from '../components/repo/RepoList';
import * as useUserRepoModule from '../hooks/useUserRepo';
import * as formatNumberModule from '../utils/formatNumber';
import { vi } from 'vitest';

vi.mock('../hooks/useUserRepo');
vi.mock('../utils/formatNumber');
vi.mock('../components/repo/SkeletonRepoList', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="skeleton-repo-list">Skeleton Repo List</div>),
}));

const mockRepos = [
  {
    id: 1,
    name: 'repo1',
    html_url: 'https://github.com/user/repo1',
    stargazers_count: 1234,
    description: 'First repo',
  },
  {
    id: 2,
    name: 'repo2',
    html_url: 'https://github.com/user/repo2',
    stargazers_count: 5678,
    description: '',
  },
];

describe('RepoList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (
      formatNumberModule.formatCompactNumber as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation((n) => `${n}K`);
  });

  it('renders loading state', () => {
    (useUserRepoModule.useUserRepo as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<RepoList username="user" />);
    expect(screen.queryByTestId('skeleton-repo-list')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useUserRepoModule.useUserRepo as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<RepoList username="user" />);
    expect(screen.getByText(/Error loading repositories/i)).toBeInTheDocument();
  });

  it('renders list of repositories', () => {
    (useUserRepoModule.useUserRepo as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockRepos,
      isLoading: false,
      isError: false,
    });

    render(<RepoList username="user" />);
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('First repo')).toBeInTheDocument();
    expect(screen.getByText('No description')).toBeInTheDocument();
    expect(screen.getAllByText(/K/)).toHaveLength(2);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
