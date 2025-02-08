import { BreakdownDetail } from "./BreakdownDetail";
import { Chart } from "./Chart";
import TransactionList from "../features/transactions/components/TransactionList";
import { useTotalExpenses } from "@/features/transactions/hooks/useTotalExpenses";
import { usePeriod } from "@/contexts/PeriodContext"; 

export const TabContentLayout = () => {
  const { selectedPeriod } = usePeriod();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { total, isLoading } = useTotalExpenses(user?._id, selectedPeriod); 

  return (
    <>
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div>
          <div className="flex flex-row items-end justify-between my-6">
            <p className="">
              <span className="font-bold text-3xl">
                {" "}
                ${isLoading ? "..." : total.toFixed(2)}
              </span>
              <br />
              <span className="text-gray-400">Total Expenses</span>
            </p>
            <p>
              <span className="font-bold text-2xl">$0</span>
              <br />
              <span className="text-gray-400">Left in budget</span>
            </p>
          </div>

          <Chart userId={user?._id} period={selectedPeriod} />
          <BreakdownDetail />
          <TransactionList userId={user?._id} period={selectedPeriod} />
        </div>
      </div>
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row gap-4">
        <div className="lg:w-1/2 lg:pr-32">
          <div className="flex flex-row items-end justify-between  mb-6">
            <p>
              <span className="font-bold text-3xl">
                {" "}
                ${isLoading ? "..." : total.toFixed(2)}
              </span>
              <br />
              <span className="text-gray-400">Total Expenses</span>
            </p>
            <p>
              <span className="font-bold text-2xl">$0</span>
              <br />
              <span className="text-gray-400">Left in budget</span>
            </p>
          </div>

          <TransactionList userId={user?._id} period={selectedPeriod} />
        </div>
        <div className="lg:w-1/2">
          <Chart userId={user?._id} period={selectedPeriod} />
          <BreakdownDetail />
        </div>
      </div>
    </>
  );
};
