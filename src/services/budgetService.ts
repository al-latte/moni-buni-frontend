import { request } from "@/utils/apiRequest";
import { Budget } from "../features/budgets/types/budget.types";
import { BudgetFormValues } from "../features/budgets/schemas/budgetSchema";

export const budgetService = {
  getAll: async (userId: string): Promise<Budget[]> => {
    const data = await request<{ budgets: Budget[] }>(
      "get",
      `/api/budgets/${userId}`
    );
    return data.budgets || [];
  },

  create: async (
    budget: BudgetFormValues & { userId: string }
  ): Promise<Budget> => {
    // Format the budget data as needed before sending
    const { dateRange, selectedCategories, ...rest } = budget;
    const formattedData = {
      ...rest,
      startDate: new Date(dateRange.from),
      endDate: new Date(dateRange.to),
      categories: selectedCategories.map((categoryId) => ({
        categoryId,
        limit: rest.totalAmount / selectedCategories.length,
        spent: 0,
      })),
    };
    console.log("Sending to API:", formattedData);
    const data = await request<{ budget: Budget }>(
      "post",
      "/api/budgets/add",
      formattedData
    );
    return data.budget;
  },

  update: async (
    id: string,
    budget: Partial<BudgetFormValues> & { userId: string }
  ): Promise<Budget> => {
    const { dateRange, selectedCategories, ...rest } = budget;
    const formattedData = {
      ...rest,
      startDate: dateRange ? new Date(dateRange.from) : undefined,
      endDate: dateRange ? new Date(dateRange.to) : undefined,
      categories: selectedCategories
        ? selectedCategories.map((categoryId) => ({
            categoryId,
            limit: (rest.totalAmount ?? 0) / (selectedCategories.length || 1),
            spent: 0,
          }))
        : undefined,
    };
    console.log("Updating budget with:", formattedData);
    const data = await request<{ budget: Budget }>(
      "put",
      `/api/budgets/update/${id}`,
      formattedData
    );
    return data.budget;
  },

  delete: async (id: string): Promise<void> => {
    await request<void>("delete", `/api/budgets/delete/${id}`);
  },
};
