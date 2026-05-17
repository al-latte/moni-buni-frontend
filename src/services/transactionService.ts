import { request } from "../utils/apiRequest";
import { Transaction } from "../features/transactions/types/transaction.types";

export interface TransactionsPage {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

interface GetTransactionsParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  walletId?: string;
}

export const transactionService = {
  getAll: async (userId: string, params: GetTransactionsParams = {}): Promise<TransactionsPage> => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.startDate) query.set("startDate", params.startDate);
    if (params.endDate) query.set("endDate", params.endDate);
    if (params.walletId) query.set("walletId", params.walletId);

    const qs = query.toString();
    const url = `/api/transactions/${userId}${qs ? `?${qs}` : ""}`;
    const data = await request<TransactionsPage>("get", url);
    return data.transactions ? data : { transactions: [], total: 0, page: 1, totalPages: 1 };
  },

  create: async (transaction: Omit<Transaction, "_id">): Promise<Transaction> => {
    const data = await request<{ transaction: Transaction }>("post", "/api/transactions/add", transaction);
    return data.transaction;
  },

  update: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    const data = await request<{ transaction: Transaction }>("put", `/api/transactions/update/${id}`, transaction);
    return data.transaction;
  },

  delete: async (id: string): Promise<void> => {
    await request<void>("delete", `/api/transactions/delete/${id}`);
  },
};
