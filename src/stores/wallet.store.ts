import { Wallet } from "@/features/wallets/types/wallet.types";
import { create } from "zustand";

type WalletDialogState = {
  isDialogOpen: boolean;
  wallet: Wallet | null;
  openDialog: (wallet?: Wallet) => void;
  closeDialog: () => void;
};

export const useWalletDialogStore = create<WalletDialogState>((set) => ({
  isDialogOpen: false,
  wallet: null,
  openDialog: (wallet?) =>
    set((state) => {
      if (state.isDialogOpen && state.wallet?._id === wallet?._id) {
        return state;
      }
      return {
        isDialogOpen: true,
        wallet: wallet ?? null,
      };
    }),
  closeDialog: () =>
    set((state) => {
      if (!state.isDialogOpen) return state;
      
      document.body.style.pointerEvents = 'auto';
      
      return {
        isDialogOpen: false,
        wallet: null,
      };
    }),
}));
