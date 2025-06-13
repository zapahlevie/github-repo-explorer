import { create } from 'zustand';

type ExplorerState = {
  query: string;
  searchQuery: string;
  setQuery: (q: string) => void;
  setSearchQuery: (q: string) => void;
};

export const useExplorerStore = create<ExplorerState>((set) => ({
  query: '',
  searchQuery: '',
  setQuery: (query) => set({ query }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
