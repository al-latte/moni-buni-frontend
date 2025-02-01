import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Transaction {
  _id: string;
  amount: number;
  category: {
    _id: string;
    icon: string;
    title: string;
  };
  description: string;
  transactionType: string;
  date: string;
  wallet: {
    _id: string;
    title: string;
  };
}

export const useTransaction = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['transactions', userId],
    queryFn: async () => {
      if (!userId) {
        return [] as Transaction[];
      }
      try {
        const { data } = await axios.get(`/api/transactions/${userId}`);
        return data.transactions as Transaction[];
      } catch (error) {
        console.error('Error fetching transactions:', error);
        return [] as Transaction[];
      }
    },
    enabled: !!userId, // Only run query if userId exists
  });
};