import { create } from "zustand";
import { TransactionFilters } from "@/features/transactions/types/transaction.types";

interface TransactionFilterState extends TransactionFilters {
  setSubPeriodValues: (values: string[]) => void;
  setCategoryIds: (ids: string[]) => void;
  setTransactionTypes: (types: ("income" | "expense")[]) => void;
  clearFilters: () => void;
}

export const useTransactionFilterStore = create<TransactionFilterState>((set) => ({
  subPeriodValues: [],
  categoryIds: [],
  transactionTypes: [],
  setSubPeriodValues: (values) => set({ subPeriodValues: values }),
  setCategoryIds: (ids) => set({ categoryIds: ids }),
  setTransactionTypes: (types) => set({ transactionTypes: types }),
  clearFilters: () => set({ subPeriodValues: [], categoryIds: [], transactionTypes: [] }),
}));
