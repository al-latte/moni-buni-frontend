import { Suspense, lazy } from "react";
import TransactionList from "@/features/transactions/components/TransactionList";
import { usePeriodStore } from "@/stores/period.store";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { ExpenseHeader } from "./ExpenseHeader";
import { useAuth } from "@/features/auth/hooks/useAuth";

const Chart = lazy(() => import("./Chart"));

export const WalletTabContentLayout = () => {
  const { selectedPeriod } = usePeriodStore();
  const { selectedWallet } = useWalletDialogStore();
  const { user } = useAuth();

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
      <ExpenseHeader walletId={selectedWallet._id} />

      <Suspense
        fallback={
          <div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />
        }
      >
        <Chart
          userId={user?._id}
          period={selectedPeriod}
          walletId={selectedWallet._id}
        />
      </Suspense>

      <TransactionList
        userId={user?._id}
        period={selectedPeriod}
        walletId={selectedWallet._id}
      />
    </div>
  );
};
