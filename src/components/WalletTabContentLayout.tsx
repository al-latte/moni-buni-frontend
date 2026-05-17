import { Suspense, lazy } from "react";
import TransactionList from "@/features/transactions/components/TransactionList";
import { usePeriodStore } from "@/stores/period.store";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { ExpenseHeader } from "./ExpenseHeader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFilteredTransactions } from "@/features/transactions/hooks/useFilteredTransactions";
import TransactionFilterBar from "@/features/transactions/components/TransactionFilterBar";

const Chart = lazy(() => import("./Chart"));

export const WalletTabContentLayout = () => {
  const { selectedPeriod } = usePeriodStore();
  const { selectedWallet } = useWalletDialogStore();
  const { user } = useAuth();
  const {
    transactions,
    filteredTransactions,
    totalExpenses,
    availableYears,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFilteredTransactions(
    selectedWallet ? user?._id : undefined,
    selectedPeriod,
    selectedWallet?._id
  );

  if (!user) return null;

  if (!selectedWallet) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500">
        Select a wallet to view its transactions
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ExpenseHeader
        total={totalExpenses}
        isLoading={isLoading}
        actions={
          <TransactionFilterBar
            period={selectedPeriod}
            userId={user._id}
            availableYears={availableYears}
          />
        }
      />

      <Suspense
        fallback={
          <div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />
        }
      >
        <Chart transactions={filteredTransactions} />
      </Suspense>

      <TransactionList
        period={selectedPeriod}
        transactions={filteredTransactions}
        allTransactions={transactions}
        isLoading={isLoading}
        error={error}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};
