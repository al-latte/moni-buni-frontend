import { useQuery } from '@tanstack/react-query';
import { walletService } from '../api/walletService';
import { Wallet } from '../types/wallet.types';

export const useWallets = (userId: string | undefined) => {
  return useQuery<Wallet[]>({
    queryKey: ['wallets', userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return walletService.getAll(userId);
    },
    enabled: !!userId,
  });
};