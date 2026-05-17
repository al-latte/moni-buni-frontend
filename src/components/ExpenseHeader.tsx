import type { ReactNode } from "react";
import { AmountDisplay } from "./AmountDisplay";

interface ExpenseHeaderProps {
  total: number;
  isLoading: boolean;
  actions?: ReactNode;
}

export const ExpenseHeader = ({ total, isLoading, actions }: ExpenseHeaderProps) => (
  <div className="flex flex-row items-center justify-between mb-6 sm:flex-row sm:items-start sm:justify-between">
    <AmountDisplay
      amount={total}
      isLoading={isLoading}
      label="Total Expenses"
    />
    {actions}
  </div>
);
