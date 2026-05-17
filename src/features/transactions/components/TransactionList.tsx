import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import TransactionGroup from "./TransactionGroup";
import { Period, Transaction } from "../types/transaction.types";
import { groupTransactionsByPeriod } from "@/utils/dateFilters";

interface TransactionListProps {
  period: Period;
  transactions: Transaction[];
  allTransactions: Transaction[];
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const TransactionList = ({
  period,
  transactions,
  allTransactions,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: TransactionListProps) => {
  const groupedTransactions = groupTransactionsByPeriod(transactions, period);

  const [progress, setProgress] = useState(13);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + 5 : prev));
      }, 100);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="mb-44">
      <h2 className="text-2xl font-bold my-4">Transactions</h2>
      {isLoading ? (
        <div>
          <p>Loading transactions...</p>
          <Progress value={progress} className="w-[60%]" />
        </div>
      ) : error ? (
        <div>Error loading transactions</div>
      ) : !transactions.length ? (
        <div className="flex flex-col items-center justify-center text-gray-500 font-medium p-8 my-auto">
          <p>No transactions</p>
          <p className="text-sm">
            {allTransactions.length > 0
              ? "No transactions match the selected filters."
              : "Add your first transaction! 😀"}
          </p>
        </div>
      ) : (
        <div>
          {groupedTransactions.map((group) => (
            <TransactionGroup
              key={group.date}
              date={group.date}
              transactions={group.transactions}
              total={group.total}
            />
          ))}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
