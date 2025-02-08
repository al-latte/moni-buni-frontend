import { useQuery } from "@tanstack/react-query";
import { transactionService } from "../../../services/transactionService";
import { Transaction } from "../types/transaction.types";

export const useTransactions = (userId: string | undefined) => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", userId],
    queryFn: async () => {
      if (!userId) return Promise.resolve([]);
      const transactions = await transactionService.getAll(userId);
      return transactions;
    },
    enabled: !!userId,
  });
};
