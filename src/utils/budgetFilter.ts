import { Budget } from "@/features/budgets/types/budget.types";

export const filterBudgetByIsActive = (budgets: Budget[], isActive: boolean): Budget[] => {
  return budgets.filter((budget) => budget.isActive === isActive);
};

export const groupBudgetsByIsActive = (budgets: Budget[]): Record<string, Budget[]> => {
  return budgets.reduce((acc, budget) => {
    const key = budget.isActive ? "Active Budgets" : "Inactive Budgets";
    return {
      ...acc,
      [key]: [...(acc[key] || []), budget],
    };
  }, {} as Record<string, Budget[]>);
}