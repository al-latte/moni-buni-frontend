import { Suspense, lazy } from 'react'
import TransactionList from "../features/transactions/components/TransactionList";
import { useTotalExpenses } from "@/features/transactions/hooks/useTotalExpenses";
import { usePeriodStore } from "@/stores/period.store";
import { ExpenseHeader } from "./ExpenseHeader";
import { useAuth } from '@/features/auth/hooks/useAuth';

const Chart = lazy(() => import("./Chart"))

export const TabContentLayout = () => {
  const { selectedPeriod } = usePeriodStore();
  const { user } = useAuth();
  const { total, isLoading } = useTotalExpenses(user?._id, selectedPeriod); 

  if (!user) return null;

  return (
    <>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div>
          
          <ExpenseHeader total={total} isLoading={isLoading} />

          <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />}>
            <Chart userId={user?._id} period={selectedPeriod} />
          </Suspense>
          <TransactionList userId={user?._id} period={selectedPeriod} />
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row gap-4">
        <div className="lg:w-1/2 lg:pr-32">
        <ExpenseHeader total={total} isLoading={isLoading} />

          <TransactionList userId={user?._id} period={selectedPeriod} />
        </div>
        <div className="lg:w-1/2">
        <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />}>
            <Chart userId={user?._id} period={selectedPeriod} />
          </Suspense>
        </div>
      </div>
    </>
  );
};
