import { request } from "../utils/apiRequest";
import { Transaction } from "../features/transactions/types/transaction.types";

export const transactionService = {
  getAll: async (userId: string): Promise<Transaction[]> => {
      const data = await request<{ transactions: Transaction[] }>("get", `/api/transactions/${userId}`);
      return data.transactions || [];
  },

  create: async ( transaction: Omit<Transaction, "_id">): Promise<Transaction> => {
      const data  = await request<{ transaction: Transaction }>("post", "/api/transactions/add", transaction);
      return data.transaction;
  },

  update: async ( id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
      const data = await request<{ transaction: Transaction }>("put", `/api/transactions/update/${id}`, transaction);
      return data.transaction;
  },

  delete: async (id: string): Promise<void> => {
      await request<void>("delete", `/api/transactions/delete/${id}`);
  },
};
