import {
  DollarSign,
  Plus,
  ReceiptText,
  WalletMinimal
} from "lucide-react";
import { Link } from "react-router-dom";
import { AddEditTransactionDialog } from "@/features/transactions/components/AddEditTransactionDialog";
import SettingsMenu from "./SettingsMenu";
import { useState } from "react";

export const MobileNav = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  return (
    <>
      <div className="fixed bottom-0 flex justify-between items-center w-full h-16 bg-white shadow-md px-4 z-50 border-t border-gray-200">
        <Link to="/">
          <div className="flex flex-col items-center">
            <DollarSign />
            <p className="text-xs font-medium">Transactions</p>
          </div>
        </Link>
        <Link to="/">
          <div className="flex flex-col items-center">
            <WalletMinimal />
            <p className="text-xs font-medium">Wallets</p>
          </div>
        </Link>
        <div
          onClick={() => setIsDialogOpen(true)}
          className="bg-black text-white rounded-full p-3 cursor-pointer"
        >
          <Plus />
        </div>
        <Link to="/">
          <div className="flex flex-col items-center">
            <ReceiptText />
            <p className="text-xs font-medium">Receipts</p>
          </div>
        </Link>
        <SettingsMenu />
      </div>
      <AddEditTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
