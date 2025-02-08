import { useTransactions } from "./useTransactions";
import { filterTransactionsByPeriod } from "@/utils/dateFilters";
import { Period } from "../types/transaction.types";
import { useMemo } from "react";

export const useTotalExpenses = (
  userId?: string,
  period?: Period,
  walletId?: string
) => {
  const { data: transactions, isLoading } = useTransactions(userId);

  const total = useMemo(() => {
    if (!transactions) return 0;

    const filtered = filterTransactionsByPeriod(
      transactions.filter((t) => !walletId || t.wallet === walletId),
      period || "week"
    );

    return filtered.reduce((acc, curr) => {
      if (curr.transactionType === "expense") {
        return acc + curr.amount;
      }
      return acc;
    }, 0);
  }, [transactions, period, walletId]);

  return { total, isLoading };
};
