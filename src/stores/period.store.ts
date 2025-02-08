import { Period } from "@/features/transactions/types/transaction.types";
import { create } from "zustand";

type PeriodState = {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
};

export const usePeriodStore = create<PeriodState>((set) => ({
  selectedPeriod: "week",
  setSelectedPeriod: (period) => set({ selectedPeriod: period }),
}));
