import { request } from "../utils/apiRequest";
import { Wallet } from "../features/wallets/types/wallet.types";

export const walletService = {
  getAll: async (userId: string): Promise<Wallet[]> => {
    const data = await request<{ wallets: Wallet[] }>("get", `/api/wallets/${userId}`);
    return data.wallets || [];
  },

  create: async (wallet: Omit<Wallet, "_id">): Promise<Wallet> => {
    const data = await request<{ wallet: Wallet }>("post", "/api/wallets/add", wallet);
    return data.wallet;
  },

  update: async (id: string, wallet: Partial<Wallet>): Promise<Wallet> => {
    const data = await request<{ wallet: Wallet }>("put", `/api/wallets/update/${id}`, wallet);
    return data.wallet;
  },

  delete: async (id: string): Promise<void> => {
    await request<void>("delete", `/api/wallets/delete/${id}`);
  },
};
