import { useMemo } from "react";
import moment from "moment";
import { useTransactions } from "./useTransactions";
import { Period } from "../types/transaction.types";
import { useTransactionFilterStore } from "@/stores/transactionFilter.store";
import { applyTransactionFilters } from "@/utils/dateFilters";

export const useFilteredTransactions = (
  userId: string | undefined,
  period: Period,
  walletId?: string
) => {
  const query = useTransactions(userId, period, walletId);
  const { subPeriodValues, categoryIds, transactionTypes } =
    useTransactionFilterStore();

  const transactions = useMemo(
    () => query.data?.pages.flatMap((page) => page.transactions) ?? [],
    [query.data]
  );

  const availableYears = useMemo(
    () =>
      period === "alltime"
        ? [...new Set(transactions.map((transaction) => moment(transaction.date).format("YYYY")))].sort(
            (a, b) => Number(b) - Number(a)
          )
        : [],
    [period, transactions]
  );

  const filteredTransactions = useMemo(
    () =>
      applyTransactionFilters(transactions, period, {
        subPeriodValues,
        categoryIds,
        transactionTypes,
      }),
    [transactions, period, subPeriodValues, categoryIds, transactionTypes]
  );

  const totalExpenses = useMemo(
    () =>
      filteredTransactions.reduce(
        (total, transaction) =>
          transaction.transactionType === "expense"
            ? total + transaction.amount
            : total,
        0
      ),
    [filteredTransactions]
  );

  return {
    ...query,
    transactions,
    filteredTransactions,
    totalExpenses,
    availableYears,
  };
};
