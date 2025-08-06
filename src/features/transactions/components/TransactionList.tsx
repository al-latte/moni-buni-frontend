import { useTransactions } from "../hooks/useTransactions";
import { useCollapseStore } from "@/stores/collapse.store";
import { useFilters } from "@/hooks/useFilters";

import TransactionGroup from "./TransactionGroup";
import { Period } from "../types/transaction.types";
import {
  filterTransactionsByPeriod,
  groupTransactionsByPeriod,
} from "@/utils/dateFilters";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useTransactionDialogStore } from "@/stores/transaction.store";

interface TransactionListProps {
  userId: string;
  period: Period;
  walletId?: string;
}

const TransactionListSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-3">
        {/* Group header skeleton */}
        <div className="flex items-center justify-between px-4 py-2 bg-black/5 rounded-full">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        {/* Transaction items skeleton */}
        <div className="space-y-2 px-2">
          {[1, 2].map((j) => (
            <div
              key={j}
              className="flex items-center justify-between p-3 border-b"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const TransactionList = ({
  userId,
  period,
  walletId,
}: TransactionListProps) => {
  const { data: transactions, isLoading, error } = useTransactions(userId);
  const { isAllExpanded, toggleAll } = useCollapseStore();
  const { applyFilters } = useFilters();

  // First filter by wallet if specified
  const walletFilteredTransactions = transactions?.filter((t) => !walletId || t.wallet === walletId) || [];
  
  // Then filter by period
  const periodFilteredTransactions = filterTransactionsByPeriod(
    walletFilteredTransactions,
    period
  );

  // Apply user filters (date range, category, transaction type)
  const userFilteredTransactions = applyFilters(
    periodFilteredTransactions.map(transaction => ({
      ...transaction,
      type: transaction.transactionType, // Map transactionType to type for filter compatibility
    }))
  );

  const groupedTransactions = groupTransactionsByPeriod(
    userFilteredTransactions,
    period
  );

  const { openDialog } = useTransactionDialogStore();

  return (
    <div className="mb-44">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold my-4">Transactions</h2>
        {transactions && transactions.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size={"sm"}
              onClick={toggleAll}
              className="rounded-full shadow-sm"
            >
              <span>{isAllExpanded ? "Collapse All" : "Expand All"}</span>
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <TransactionListSkeleton />
      ) : error ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[200px] space-y-4">
            <p className="text-destructive">Error loading transactions</p>
            <Button variant="outline" className="rounded-full">
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : !transactions?.length ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-[200px] space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-xl font-medium">No transactions yet</p>
              <p className="text-muted-foreground text-center">
                Get started by creating your first transaction
              </p>
            </div>
            <Button
              onClick={() => openDialog()}
              variant="outline"
              className="rounded-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create transaction
            </Button>
          </CardContent>
        </Card>
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
