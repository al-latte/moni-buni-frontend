import { Suspense, lazy } from 'react'
import TransactionList from "../features/transactions/components/TransactionList";
import { usePeriodStore } from "@/stores/period.store";
import { ExpenseHeader } from "./ExpenseHeader";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useFilteredTransactions } from '@/features/transactions/hooks/useFilteredTransactions';
import TransactionFilterBar from '@/features/transactions/components/TransactionFilterBar';
import WalletFilterChips from '@/features/wallets/components/WalletFilterChips';
import { useWalletDialogStore } from '@/stores/wallet.store';

const Chart = lazy(() => import("./Chart"))

export const TabContentLayout = () => {
  const { selectedPeriod } = usePeriodStore();
  const { user } = useAuth();
  const { selectedWallet } = useWalletDialogStore();
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
  } = useFilteredTransactions(user?._id, selectedPeriod, selectedWallet?._id);

  if (!user) return null;

  const renderActions = () => (
    <div className="flex items-end gap-3 sm:flex-row sm:items-start">
      <TransactionFilterBar
        period={selectedPeriod}
        userId={user._id}
        availableYears={availableYears}
      />
    </div>
  );

  return (
    <>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div>
          
          <WalletFilterChips />
          <ExpenseHeader total={totalExpenses} isLoading={isLoading} actions={renderActions()} />

          <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />}>
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
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row gap-4">
        <div className="lg:w-1/2 lg:pr-32">
        <WalletFilterChips />
        <ExpenseHeader total={totalExpenses} isLoading={isLoading} actions={renderActions()} />

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
        <div className="lg:w-1/2">
        <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />}>
            <Chart transactions={filteredTransactions} />
          </Suspense>
        </div>
      </div>
    </>
  );
};
