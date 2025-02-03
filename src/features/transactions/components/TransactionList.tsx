import { useEffect, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";

import { Progress } from "@/components/ui/progress";
import TransactionGroup from "./TransactionGroup";
import { Period } from "../types/transaction.types";
import { filterTransactionsByPeriod, groupTransactionsByPeriod } from "../utils/dateFilters";

const TransactionList = ({ userId, period }: { userId: string; period: Period }) => {
  const { data: transactions, isLoading, error } = useTransactions(userId);
  const filteredTransactions = filterTransactionsByPeriod(transactions || [], period);
  const groupedTransactions = groupTransactionsByPeriod(filteredTransactions, period);
  const [progress, setProgress] = useState(13)

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
      <div>
        <h2 className="text-2xl font-bold my-4">Transactions</h2>
      </div>
      {isLoading ? (
        <div>
          <p>Loading transactions...</p>
          <Progress value={progress} className="w-[60%]" />
          </div>
      ) : error ? (
        <div>Error loading transactions</div>
      ) : !transactions?.length ? (
        <div className="flex flex-col items-center justify-center text-gray-500 font-medium p-8 my-auto">
          <p>No transactions</p>
          <p className="text-sm">Add your first transaction! 😀</p>
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
        </div>
      )}
    </div>
  );
};

export default TransactionList;
