import { Wallet } from "../types/wallet.types";
import { Card } from "@/components/ui/card";
import { WalletCards } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs";

interface WalletItemProps {
  wallet: Wallet;
}

export const WalletItem = ({ wallet }: WalletItemProps) => {
  const { selectedWallet, setSelectedWallet } = useWalletDialogStore();
  const isSelected = selectedWallet?._id === wallet._id;
  
  return (
    <>
    <Card className={`p-6 rounded-xl hover:shadow-md transition-all cursor-pointer ${
      isSelected ? 'bg-black text-white' : ''
    }`} onClick={() => setSelectedWallet(wallet)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <WalletCards className="text-white h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">{wallet.title}</h3>
            <p className="text-sm text-gray-500">
              {wallet.description || "No description"}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{formatCurrency(wallet.balance)}</p>
          {wallet.setAsDefault && (
            <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
              Default
            </span>
          )}
        </div>
       
      </div>
    </Card>
     {isSelected && (
        <div className="lg:hidden">
          <PeriodFilterTabs variant="wallet" />
        </div>
      )}
     </>
  );
};
