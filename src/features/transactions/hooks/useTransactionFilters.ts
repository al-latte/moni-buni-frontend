import { useState } from 'react';
import { TransactionFilters } from '../types/filter.types';

export const useTransactionFilters = () => {
  const [filters, setFilters] = useState<TransactionFilters>({});

  const updateFilter = (key: keyof TransactionFilters, value: unknown) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key: keyof TransactionFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return {
    filters,
    updateFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters
  };
};