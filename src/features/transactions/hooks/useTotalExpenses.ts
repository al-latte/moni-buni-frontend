import { useTransactions } from "./useTransactions";
import { Period } from "../types/transaction.types";
import { useMemo } from "react";

export const useTotalExpenses = (
  userId?: string,
  period?: Period,
  walletId?: string
) => {
  const { data, isLoading } = useTransactions(userId, period || "week", walletId);

  const total = useMemo(() => {
    const transactions = data?.pages.flatMap((p) => p.transactions) ?? [];
    return transactions.reduce((acc, curr) => {
      return curr.transactionType === "expense" ? acc + curr.amount : acc;
    }, 0);
  }, [data]);

  return { total, isLoading };
};
