import { create } from 'zustand';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'popular' | 'rating';
  searchQuery: string;
  page: number;
  pageSize: number;
}

interface FilterStoreState extends FilterState {
  setCategories: (categories: string[]) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  clearCategories: () => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  resetFilters: () => void;
  getActiveFilters: () => Partial<FilterState>;
}

const defaultFilters: FilterState = {
  categories: [],
  priceRange: [0, 5000000],
  sortBy: 'newest',
  searchQuery: '',
  page: 1,
  pageSize: 12,
};

export const useFilterStore = create<FilterStoreState>((set, get) => ({
  ...defaultFilters,

  setCategories: (categories: string[]) =>
    set({ categories, page: 1 }),

  addCategory: (category: string) =>
    set((state) => ({
      categories: [...state.categories, category],
      page: 1,
    })),

  removeCategory: (category: string) =>
    set((state) => ({
      categories: state.categories.filter((c) => c !== category),
      page: 1,
    })),

  clearCategories: () =>
    set({ categories: [], page: 1 }),

  setPriceRange: (range: [number, number]) =>
    set({ priceRange: range, page: 1 }),

  setSortBy: (sort: FilterState['sortBy']) =>
    set({ sortBy: sort, page: 1 }),

  setSearchQuery: (query: string) =>
    set({ searchQuery: query, page: 1 }),

  setPage: (page: number) =>
    set({ page }),

  setPageSize: (size: number) =>
    set({ pageSize: size }),

  resetFilters: () =>
    set(defaultFilters),

  getActiveFilters: () => {
    const state = get();
    const filters: Partial<FilterState> = {};

    if (state.categories.length > 0) filters.categories = state.categories;
    if (state.priceRange[0] !== 0 || state.priceRange[1] !== 5000000) {
      filters.priceRange = state.priceRange;
    }
    if (state.sortBy !== 'newest') filters.sortBy = state.sortBy;
    if (state.searchQuery !== '') filters.searchQuery = state.searchQuery;

    return filters;
  },
}));

export default useFilterStore;
