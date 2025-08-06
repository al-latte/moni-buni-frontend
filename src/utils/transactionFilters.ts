import { Transaction } from '../features/transactions/types/transaction.types';
import { TransactionFilters } from '../features/transactions/types/filter.types';

export const applyTransactionFilters = (
  transactions: Transaction[],
  filters: TransactionFilters
): Transaction[] => {
  return transactions.filter(transaction => {
    // Date range filter
    if (filters.dateRange) {
      const transactionDate = new Date(transaction.date);
      const { from, to } = filters.dateRange;
      
      if (transactionDate < from || transactionDate > to) {
        return false;
      }
    }

    // Category filter
    if (filters.category && transaction.category !== filters.category) {
      return false;
    }

    // Transaction type filter
    if (filters.type && transaction.transactionType !== filters.type) {
      return false;
    }

    return true;
  });
};