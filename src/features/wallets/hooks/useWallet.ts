import { useMutation, useQueryClient } from '@tanstack/react-query';
import { walletService } from '../api/walletService';
import { Wallet } from '../types/wallet.types';
import { useToast } from '@/hooks/use-toast';


export const useWalletMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createWallet = useMutation({
    mutationFn: (wallet: Omit<Wallet, "_id">) => 
      walletService.create(wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      toast({
        description: "Wallet created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateWallet = useMutation({
    mutationFn: ({ id, wallet }: { id: string; wallet: Partial<Wallet> }) =>
      walletService.update(id, wallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      toast({
        description: "Wallet updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteWallet = useMutation({
    mutationFn: (id: string) => walletService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      toast({
        description: "Wallet deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    createWallet,
    updateWallet,
    deleteWallet,
  };
};
