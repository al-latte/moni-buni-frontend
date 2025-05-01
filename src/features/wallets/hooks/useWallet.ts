import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletService } from "@/services/walletService";
import { Wallet } from "../types/wallet.types";
import { useMutationHandlers } from "@/utils/mutationHandlers";

export const useWalletMutations = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useMutationHandlers(queryClient);

  const createWallet = useMutation({
    mutationFn: (wallet: Omit<Wallet, "_id">) => walletService.create(wallet),
    onSuccess: () => {
      handleSuccess("Wallet created successfully", ["wallets"]);
    },
    onError: handleError,
  });

  const updateWallet = useMutation({
    mutationFn: ({ id, wallet }: { id: string; wallet: Partial<Wallet> }) =>
      walletService.update(id, wallet),
    onSuccess: () => {
      handleSuccess("Wallet updated successfully", ["wallets"]);
    },
    onError: handleError,
  });

  const deleteWallet = useMutation({
    mutationFn: (id: string) => walletService.delete(id),
    onSuccess: () => {
      handleSuccess("Wallet deleted successfully", ["wallets"]);
    },
    onError: handleError,
  });

  return {
    createWallet,
    updateWallet,
    deleteWallet,
  };
};
