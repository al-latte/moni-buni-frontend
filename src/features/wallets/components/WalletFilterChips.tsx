import { useAuth } from "@/features/auth/hooks/useAuth";
import { useWallets } from "../hooks/useWallets";
import { useWalletDialogStore } from "@/stores/wallet.store";

const WalletFilterChips = () => {
  const { user } = useAuth();
  const { data: wallets = [], isLoading } = useWallets(user?._id);
  const { selectedWallet, setSelectedWallet } = useWalletDialogStore();

  if (isLoading) {
    return (
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-12 w-32 shrink-0 animate-pulse rounded-full bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!wallets.length) return null;

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {wallets.map((wallet) => {
        const isSelected = selectedWallet?._id === wallet._id;

        return (
          <button
            key={wallet._id}
            type="button"
            onClick={() => setSelectedWallet(isSelected ? null : wallet)}
            className={`rounded-full px-4 py-1 mt-3 transition-colors ${
              isSelected
                ? " bg-black text-white"
                : " bg-gray-100 text-black hover:border-black"
            }`}
            aria-pressed={isSelected}
          >
            <span className=" max-w-32 truncate text-sm font-medium">
              {wallet.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default WalletFilterChips;
