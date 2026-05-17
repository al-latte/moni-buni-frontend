import { useInfiniteQuery } from "@tanstack/react-query";
import { transactionService } from "../../../services/transactionService";
import { Period } from "../types/transaction.types";
import { getPeriodDateRange } from "@/utils/dateFilters";

export const useTransactions = (userId: string | undefined, period: Period, walletId?: string) => {
  return useInfiniteQuery({
    queryKey: ["transactions", userId, period, walletId],
    queryFn: async ({ pageParam }) => {
      if (!userId) return { transactions: [], total: 0, page: 1, totalPages: 1 };
      const { startDate, endDate } = getPeriodDateRange(period);
      return transactionService.getAll(userId, { page: pageParam, limit: 20, startDate, endDate, walletId });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
