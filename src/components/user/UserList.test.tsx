// UserList.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';
import * as useAccordionModule from '../../hooks/useAccordion';
import * as useSearchUsersModule from '../../hooks/useSearchUsers';
import { vi } from 'vitest';

vi.mock('../../hooks/useAccordion');
vi.mock('../../hooks/useSearchUsers');
vi.mock('../repo/RepoList', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="repo-list">Repo List</div>),
}));
vi.mock('../user/SkeletonUserList', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="skeleton-user-list">Skeleton User List</div>),
}));

const mockUsers = [
  { id: 1, login: 'user1' },
  { id: 2, login: 'user2' },
];

describe('UserList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useAccordionModule.useAccordion as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      expanded: null,
      toggle: vi.fn(),
    });
  });

  it('renders loading state', () => {
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<UserList />);
    expect(screen.queryByTestId('skeleton-user-list')).toBeInTheDocument();
  });

  it('renders list of users', () => {
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<UserList />);
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.queryByTestId('repo-list')).not.toBeInTheDocument();
  });

  it('expands and shows RepoList when user is expanded', () => {
    (useAccordionModule.useAccordion as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      expanded: 'user1',
      toggle: vi.fn(),
    });
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<UserList />);
    expect(screen.getByTestId('repo-list')).toBeInTheDocument();
  });

  it('calls toggle when user row is clicked', () => {
    const toggleMock = vi.fn();
    (useAccordionModule.useAccordion as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      expanded: null,
      toggle: toggleMock,
    });
    (useSearchUsersModule.useSearchUsers as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockUsers,
      isLoading: false,
    });

    render(<UserList />);
    const userRow = screen.getByText('user1').closest('div');
    fireEvent.click(userRow!);
    expect(toggleMock).toHaveBeenCalledWith('user1');
  });
});
