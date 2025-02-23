import { useQuery } from '@tanstack/react-query';
import { walletService } from '@/services/walletService';
import { Wallet } from '../types/wallet.types';

export const useWallets = (userId: string | undefined) => {
  return useQuery<Wallet[]>({
    queryKey: ['wallets', userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return walletService.getAll(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,
  });
};