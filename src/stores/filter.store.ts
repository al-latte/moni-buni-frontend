import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TransactionFilters } from "@/features/transactions/types/filter.types";

interface FilterState {
  filters: TransactionFilters;
  setFilter: (key: keyof TransactionFilters, value: any) => void;
  clearFilter: (key: keyof TransactionFilters) => void;
  clearAllFilters: () => void;
  hasActiveFilters: () => boolean;
  getFilteredData: <T extends { date: Date; category?: string; type?: 'income' | 'expense' }>(
    data: T[]
  ) => T[];
}

export const useFilterStore = create<FilterState>()((
  persist(
    (set, get) => ({
      filters: {},

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),

      clearFilter: (key) =>
        set((state) => {
          const newFilters = { ...state.filters };
          delete newFilters[key];
          return { filters: newFilters };
        }),

      clearAllFilters: () =>
        set(() => ({
          filters: {},
        })),

      hasActiveFilters: () => {
        const { filters } = get();
        return Object.keys(filters).length > 0;
      },

      getFilteredData: (data) => {
        const { filters } = get();
        
        return data.filter((item) => {
          // Date range filter
          if (filters.dateRange) {
            const itemDate = new Date(item.date);
            const fromDate = new Date(filters.dateRange.from);
            const toDate = new Date(filters.dateRange.to);
            
            // Set time to start/end of day for accurate comparison
            fromDate.setHours(0, 0, 0, 0);
            toDate.setHours(23, 59, 59, 999);
            
            if (itemDate < fromDate || itemDate > toDate) {
              return false;
            }
          }

          // Category filter
          if (filters.category && item.category !== filters.category) {
            return false;
          }

          // Transaction type filter
          if (filters.type && item.type !== filters.type) {
            return false;
          }

          return true;
        });
      },
    }),
    {
      name: "filter-storage",
      partialize: (state) => ({ filters: state.filters }),
    }
  )
));
