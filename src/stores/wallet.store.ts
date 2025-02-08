import { Wallet } from "@/features/wallets/types/wallet.types";
import { create } from "zustand";

type WalletDialogState = {
  isDialogOpen: boolean;
  wallet: Wallet | null;
  selectedWallet: Wallet | null;
  openDialog: (wallet?: Wallet) => void;
  closeDialog: () => void;
  setSelectedWallet: (wallet: Wallet | null) => void;
};

export const useWalletDialogStore = create<WalletDialogState>((set) => ({
  isDialogOpen: false,
  wallet: null,
  selectedWallet: null,
  openDialog: (wallet?) =>
    set((state) => {
      if (state.isDialogOpen && state.wallet?._id === wallet?._id) {
        return state;
      }
      return {
        ...state,
        isDialogOpen: true,
        wallet: wallet ?? null,
      };
    }),
  closeDialog: () =>
    set((state) => {
      if (!state.isDialogOpen) return state;
      
      document.body.style.pointerEvents = 'auto';
      
      return {
        ...state,
        isDialogOpen: false,
        wallet: null,
      };
    }),
  setSelectedWallet: (wallet) => set({ selectedWallet: wallet }),
}));
