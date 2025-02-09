import { AxiosError } from "axios";
import { api } from "@/services/axios.config";
import { Wallet } from "../features/wallets/types/wallet.types";

export const walletService = {
  getAll: async (userId: string): Promise<Wallet[]> => {
    try {
      const { data } = await api.get(`/api/wallets/${userId}`);
      return data.wallets;
    } catch (error) {
      if (error instanceof AxiosError) {
        if(error.status === 404) {
          return [];
        }
        console.error("Error in getAll wallets:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch wallets");
      }
      throw error;
    }
  },

  create: async (wallet: Omit<Wallet, "_id">): Promise<Wallet> => {
    try {
      const { data } = await api.post("/api/wallets/add", wallet);
      return data.wallet;
    } catch (error) {
      console.error("Error in create wallet:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to create wallet");
      }
      throw error;
    }
  },

  update: async (id: string, wallet: Partial<Wallet>): Promise<Wallet> => {
    try {
      const { data } = await api.put(`/api/wallets/update/${id}`, wallet);
      return data.wallet;
    } catch (error) {
      console.error("Error in update wallet:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to update wallet");
      }
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/wallets/delete/${id}`);
    } catch (error) {
      console.error("Error in delete wallet:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to delete wallet");
      }
      throw error;
    }
  }
};
