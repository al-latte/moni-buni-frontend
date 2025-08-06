import { useFilterStore } from "@/stores/filter.store";
import { TransactionFilters } from "@/features/transactions/types/filter.types";

export const useFilters = () => {
  const {
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    getFilteredData,
  } = useFilterStore();

  const updateFilter = (key: keyof TransactionFilters, value: any) => {
    setFilter(key, value);
  };

  const clearFilterByKey = (key: keyof TransactionFilters) => {
    clearFilter(key);
  };

  const clearAll = () => {
    clearAllFilters();
  };

  const isActive = hasActiveFilters();

  const applyFilters = <T extends { date: Date; category?: string; type?: 'income' | 'expense' }>(
    data: T[]
  ) => {
    return getFilteredData(data);
  };

  return {
    filters,
    updateFilter,
    clearFilter: clearFilterByKey,
    clearAllFilters: clearAll,
    hasActiveFilters: isActive,
    applyFilters,
  };
};
