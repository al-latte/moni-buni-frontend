import { Wallet } from "../types/wallet.types";
import { Card } from "@/components/ui/card";
import { Edit, Ellipsis, Trash, WalletCards } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useWalletMutations } from "../hooks/useWallet";
import { AnimatePresence, motion } from "motion/react";

interface WalletItemProps {
  wallet: Wallet;
  custom: number;
}

export const WalletItem = ({ wallet, custom }: WalletItemProps) => {
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 0.5, ease: "easeOut", delay: custom * 0.2 }}
      >
      <Card
        className={`p-6 rounded-xl hover:shadow-md transition-all cursor-pointer ${
          isSelected ? "bg-black text-white" : ""
        }`}
        onClick={() => {
          if (isSelected) {
            setSelectedWallet(null);
          } else {
            setSelectedWallet(wallet);
          }
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <WalletCards className="text-white h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">{wallet.title} </h3>
              {wallet.setAsDefault && (
                <span
                  className={` py-1 px-3 rounded-full text-xs ${
                    isSelected ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  Default
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-bold text-lg">
              {formatCurrency(wallet.balance)}
            </p>
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={handleDelete}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="lg:hidden">
              <PeriodFilterTabs variant="wallet" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
