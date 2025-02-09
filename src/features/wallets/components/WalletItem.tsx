import { Wallet } from "../types/wallet.types";
import { Card } from "@/components/ui/card";
import { Edit, Ellipsis, Trash, WalletCards } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useWalletMutations } from "../hooks/useWallet";

interface WalletItemProps {
  wallet: Wallet;
}

export const WalletItem = ({ wallet }: WalletItemProps) => {
  const { selectedWallet, setSelectedWallet } = useWalletDialogStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isSelected = selectedWallet?._id === wallet._id;

  const { openDialog } = useWalletDialogStore();
    const { deleteWallet } = useWalletMutations();

  const handleEdit = () => {
    setIsDropdownOpen(false);
    openDialog(wallet);
  };

const handleDelete = async () => {
  try {
    await deleteWallet.mutateAsync(wallet?._id);
  } catch (error) {
    console.error("Failed to delete transaction:", error);
  }
};
  
  return (
    <>
    <Card className={`p-6 rounded-xl hover:shadow-md transition-all cursor-pointer ${
      isSelected ? 'bg-black text-white' : ''
    }`} onClick={() => {
      if (isSelected) {
        setSelectedWallet(null);
      } else {  
      setSelectedWallet(wallet)
    }
      }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <WalletCards className="text-white h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">{wallet.title} </h3>
            {wallet.setAsDefault && (
            <span className={` py-1 px-3 rounded-full text-xs ${isSelected ? 'bg-white text-black' : 'bg-black text-white'}`}>
              Default
            </span>
          )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-bold text-lg">{formatCurrency(wallet.balance)}</p>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Ellipsis />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-3 mx-2 bg-white shadow-md border rounded">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <Button
                      onClick={handleEdit}
                      className="rounded-full w-full"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <Button
                      onClick={handleDelete}
                      className="rounded-full w-full bg-red-600"
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
