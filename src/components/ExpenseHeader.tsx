import { AmountDisplay } from "./AmountDisplay";
import Filter from "./Filter";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFilteredTotalExpenses } from "@/features/transactions/hooks/useFilteredTotalExpenses";
import { usePeriodStore } from "@/stores/period.store";

interface ExpenseHeaderProps {
  walletId?: string; // Optional wallet ID for wallet-specific filtering
}

export const ExpenseHeader = ({ walletId }: ExpenseHeaderProps) => {
  const { user } = useAuth();
  const { data: categories = [] } = useCategories(user?._id);
  const { selectedPeriod } = usePeriodStore();
  const { total, isLoading } = useFilteredTotalExpenses(user?._id, selectedPeriod, walletId);

  return (
    <div className="flex flex-row items-center justify-between mb-6">
      <AmountDisplay
        amount={total}
        isLoading={isLoading}
        label="Total Expenses"
      />
      <Filter categories={categories} />
    </div>
  );
};
