import { AmountDisplay } from "./AmountDisplay";
import Filter from "./Filter";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ExpenseHeaderProps {
  total: number;
  isLoading: boolean;
}

export const ExpenseHeader = ({ total, isLoading }: ExpenseHeaderProps) => {
  const { user } = useAuth();
  const { data: categories = [] } = useCategories(user?._id);

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
