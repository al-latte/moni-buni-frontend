import { AxiosError } from "axios";
import { api } from "./axios.config";
import { Transaction } from "../features/transactions/types/transaction.types";

export const transactionService = {
  getAll: async (userId: string): Promise<Transaction[]> => {
    try {
      const { data } = await api.get(`/api/transactions/${userId}`);
      return data.transactions;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          return [];
        }
        console.error("Get all transactions error:", error);
        throw new Error(
          error.response?.data?.message || "Failed to fetch transactions"
        );
      }
      throw error;
    }
  },

  create: async (
    transaction: Omit<Transaction, "_id">
  ): Promise<Transaction> => {
    try {
      // Create transaction and update wallet/budget in a single API call
      const { data } = await api.post("/api/transactions/add", transaction)

      return data.transaction;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 400 &&
          error.response?.data?.message?.includes("insufficient")
        ) {
          throw new Error("Insufficient funds in wallet");
        }
        console.error("Create transaction error:", error);
        throw new Error(
          error.response?.data?.message || "Failed to create transaction"
        );
      }
      throw error;
    }
  },

  update: async (
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction> => {
    try {
      const { data } = await api.put(
        `/api/transactions/update/${id}`,
        transaction
      );
      return data.transaction;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Update transaction error:", error);
        throw new Error(
          error.response?.data?.message || "Failed to update transaction"
        );
      }
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/transactions/delete/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Delete transaction error:", error);
        throw new Error(
          error.response?.data?.message || "Failed to delete transaction"
        );
      }
      throw error;
    }
  },
};
