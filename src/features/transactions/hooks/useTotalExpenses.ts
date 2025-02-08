import { useTransactions } from './useTransactions';
import { filterTransactionsByPeriod } from '@/utils/dateFilters';
import { Period } from '../types/transaction.types';

export const useTotalExpenses = (userId: string, period: Period) => {
  const { data: transactions, isLoading } = useTransactions(userId);
  
  const calculateTotal = () => {
    if (!transactions) return 0;
    
    const filteredTransactions = filterTransactionsByPeriod(transactions, period);
    return filteredTransactions
      .filter(t => t.transactionType === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return {
    total: calculateTotal(),
    isLoading
  };
};