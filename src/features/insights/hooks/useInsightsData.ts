import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transactionService";
import { Period } from "@/features/transactions/types/transaction.types";
import { getPeriodDateRange } from "@/utils/dateFilters";

export const useInsightsData = (
  userId: string | undefined,
  period: Period,
  walletId?: string
) => {
  return useQuery({
    queryKey: ["insights-transactions", userId, period, walletId],
    queryFn: async () => {
      if (!userId) return [];
      const { startDate, endDate } = getPeriodDateRange(period);
      const result = await transactionService.getAll(userId, {
        page: 1,
        limit: 10000,
        startDate,
        endDate,
        walletId,
      });
      return result.transactions;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
