import { useTransactions } from "./useTransactions";
import { filterTransactionsByPeriod } from "@/utils/dateFilters";
import { Period } from "../types/transaction.types";
import { useFilters } from "@/hooks/useFilters";
import { useMemo } from "react";

export const useFilteredTotalExpenses = (
  userId?: string,
  period?: Period,
  walletId?: string
) => {
  const { data: transactions, isLoading } = useTransactions(userId);
  const { applyFilters } = useFilters();

  const total = useMemo(() => {
    if (!transactions) return 0;

    // First filter by wallet if specified
    const walletFilteredTransactions = transactions.filter((t) => !walletId || t.wallet === walletId);
    
    // Then filter by period
    const periodFilteredTransactions = filterTransactionsByPeriod(
      walletFilteredTransactions,
      period || "week"
    );

    // Apply user filters (date range, category, transaction type)
    const userFilteredTransactions = applyFilters(
      periodFilteredTransactions.map(transaction => ({
        ...transaction,
        type: transaction.transactionType, // Map transactionType to type for filter compatibility
      }))
    );

    // Calculate total expenses from filtered transactions
    return userFilteredTransactions.reduce((acc, curr) => {
      if (curr.transactionType === "expense") {
        return acc + curr.amount;
      }
      return acc;
    }, 0);
  }, [transactions, period, walletId, applyFilters]);

  return { total, isLoading };
};
