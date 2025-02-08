import { Transaction } from "@/features/transactions/types/transaction.types";
import { create } from "zustand";

type TransactionDialogState = {
  isDialogOpen: boolean;
  transaction: Transaction | null;
  openDialog: (transaction?: Transaction) => void;
  closeDialog: () => void;
};

export const useTransactionDialogStore = create<TransactionDialogState>(
  (set) => ({
    isDialogOpen: false,
    transaction: null,
    openDialog: (transaction?) => 
      set((state) => {
        // Only update if there's actually a change
        if (state.isDialogOpen && state.transaction?._id === transaction?._id) {
          return state;
        }
        return {
          isDialogOpen: true,
          transaction: transaction ?? null,
        };
      }),
      closeDialog: () => 
        set((state) => {
          if (!state.isDialogOpen) return state;
          
          // Force cleanup of any remaining overlays
          document.body.style.pointerEvents = 'auto';
          
          return {
            isDialogOpen: false,
            transaction: null,
          };
        }),
  })
);
