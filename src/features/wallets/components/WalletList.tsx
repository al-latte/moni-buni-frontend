import { useWallets } from "../hooks/useWallets";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { WalletItem } from "./WalletItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useWalletDialogStore } from "@/stores/wallet.store";

const WalletList = () => {
  const { user } = useAuth();
  const { data: wallets, isLoading } = useWallets(user?._id);
  const { openDialog } = useWalletDialogStore();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 mb-44">
      <div className="flex justify-between items-center my-6">
      <h2 className="text-2xl font-bold">My Wallets</h2>
      <Button onClick={() => openDialog()} className="rounded-full">
        <Plus className="mr-2 h-4 w-4" />
        Add New Wallet
      </Button>
      </div>
      

      {!wallets?.length ? (
        <div className="text-center py-8 text-gray-500">
          No wallets found. Create your first wallet to get started.
        </div>
      ) : (
        <div className="grid gap-4">
          {wallets.map((wallet) => (
            <WalletItem key={wallet._id} wallet={wallet} />
          ))}
        </div>
      )}
    </div>
  ); 
};

export default WalletList;
