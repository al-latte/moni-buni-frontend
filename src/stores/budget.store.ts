import { Budget } from "@/features/budgets/types/budget.types";
import { create } from "zustand";

type BudgetDialogState = {
  isDialogOpen: boolean;
  budget: Budget | null;
  openDialog: (budget?: Budget) => void;
  closeDialog: () => void;
};

export const useBudgetDialogStore = create<BudgetDialogState>((set) => ({
  isDialogOpen: false,
  budget: null,
  openDialog: (budget?) =>
    set((state) => {
      if (state.isDialogOpen && state.budget?._id === budget?._id) {
        return state;
      }
      return {
        isDialogOpen: true,
        budget: budget ?? null,
      };
    }),
  closeDialog: () =>
    set((state) => {
      if (!state.isDialogOpen) return state;

      document.body.style.pointerEvents = "auto";

      return {
        isDialogOpen: false,
        budget: null,
      };
    }),
}));
