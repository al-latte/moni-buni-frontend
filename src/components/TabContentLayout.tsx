import { Suspense, lazy } from 'react'
import { BreakdownDetail } from "./BreakdownDetail";
import TransactionList from "../features/transactions/components/TransactionList";
import { useTotalExpenses } from "@/features/transactions/hooks/useTotalExpenses";
import { usePeriodStore } from "@/stores/period.store";
import { ExpenseHeader } from "./ExpenseHeader";

const Chart = lazy(() => import("./Chart"))

export const TabContentLayout = () => {
  const { selectedPeriod } = usePeriodStore();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { total, isLoading } = useTotalExpenses(user?._id, selectedPeriod); 

  return (
    <>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div>
          
          <ExpenseHeader total={total} isLoading={isLoading} />

          <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-gray-200 rounded-3xl" />}>
            <Chart userId={user?._id} period={selectedPeriod} />
          </Suspense>
          <BreakdownDetail />
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
          <BreakdownDetail />
        </div>
      </div>
    </>
  );
};
