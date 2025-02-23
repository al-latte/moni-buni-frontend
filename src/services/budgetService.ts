import { AxiosError } from "axios";
import { api } from "@/services/axios.config";
import { Budget } from "../features/budgets/types/budget.types";
import { BudgetFormValues } from "../features/budgets/schemas/budgetSchema";

export const budgetService = {
  getAll: async (userId: string): Promise<Budget[]> => {
    try {
      const { data } = await api.get(`/api/budgets/${userId}`);
      return data.budgets;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          return [];
        }
        console.error("Error in getAll budgets:", error);
        throw new Error(
          error.response?.data?.message || "Failed to fetch budgets"
        );
      }
      throw error;
    }
  },

  create: async (
    budget: BudgetFormValues & { userId: string }
  ): Promise<Budget> => {
    try {
      const { dateRange, selectedCategories, ...rest } = budget;

      const formattedData = {
        ...rest,
        startDate: new Date(dateRange.from),
        endDate: new Date(dateRange.to),
        categories: selectedCategories.map(categoryId => ({
          categoryId,
          limit: rest.totalAmount / selectedCategories.length,
          spent: 0
        }))
      };

      console.log('Sending to API:', formattedData);
      const { data } = await api.post("/api/budgets/add", formattedData);
      return data;
    } catch (error) {
      console.error("Error in create budget:", error);
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Failed to create budget"
        );
      }
      throw error;
    }
  },

  update: async (
    id: string,
    budget: Partial<BudgetFormValues> & { userId: string }
  ): Promise<Budget> => {
    try {
      const { dateRange, selectedCategories, ...rest } = budget;
      
      const formattedData = {
        ...rest,
        startDate: dateRange ? new Date(dateRange.from) : undefined,
        endDate: dateRange ? new Date(dateRange.to) : undefined,
        categories: selectedCategories?.map(categoryId => ({
          categoryId,
          limit: (rest.totalAmount ?? 0) / (selectedCategories?.length || 1),
          spent: 0
        }))
      };

      console.log('Date range values:', {
        from: dateRange?.from,
        to: dateRange?.to,
        startDate: formattedData.startDate?.toISOString(),
        endDate: formattedData.endDate?.toISOString()
      });
  
      console.log('Updating budget with:', formattedData); // Debug log
      const { data } = await api.put(`/api/budgets/update/${id}`, formattedData);
      return data;
    } catch (error) {
      console.error("Error in update budget:", error);
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.error || 
          error.response?.data?.message || 
          "Failed to update budget"
        );
      }
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/budgets/delete/${id}`);
    } catch (error) {
      console.error("Error in delete budget:", error);
      if (error instanceof AxiosError) {
        throw new Error(
          error.response?.data?.message || "Failed to delete budget"
        );
      }
      throw error;
    }
  },
};
