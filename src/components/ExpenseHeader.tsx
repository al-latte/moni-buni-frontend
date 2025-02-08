import { AmountDisplay } from "./AmountDisplay";

interface ExpenseHeaderProps {
  total: number;
  isLoading: boolean;
}

export const ExpenseHeader = ({ total, isLoading }: ExpenseHeaderProps) => (
  <div className="flex flex-row items-end justify-between mb-6">
    <AmountDisplay
      amount={total}
      isLoading={isLoading}
      label="Total Expenses"
    />
    <AmountDisplay amount={0} isLoading={false} label="Left in budget" />
  </div>
);
