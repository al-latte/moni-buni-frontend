import {
  DollarSign,
  Plus,
  ReceiptText,
  Settings,
  WalletMinimal,
} from "lucide-react";
import { Link } from "react-router-dom";
import fullHorizontalLogo from "./../assets/logo/full-ver-white2.svg";
import { useState } from "react";
import { AddEditTransactionDialog } from "@/features/transactions/components/AddEditTransactionDialog";

export const MainNav = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between w-20 h-[calc(100vh-2rem)] bg-black shadow-md px-4 py-12 text-white m-4 rounded-3xl">
        <div className="flex flex-col items-center space-y-10">
          <Link to="/">
            <div className="flex flex-col items-center mb-6">
              <img src={fullHorizontalLogo} alt="" className="w-full h-16" />
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-col items-center">
              <DollarSign />
              <p className="text-xs font-medium">Transactions</p>
            </div>
          </Link>
          <Link to="/wallets">
            <div className="flex flex-col items-center">
              <WalletMinimal />
              <p className="text-xs font-medium">Wallets</p>
            </div>
          </Link>
          <Link to="/">
            <div
              onClick={() => setIsDialogOpen(true)}
              className="flex flex-col items-center"
            >
              <div className="bg-white text-black rounded-full p-3 flex items-center justify-center w-10 h-10">
                <Plus />
              </div>
              <p className="text-xs font-medium text-center">Add New</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex flex-col items-center">
              <ReceiptText />
              <p className="text-xs font-medium">Receipts</p>
            </div>
          </Link>
        </div>
        <Link to="/">
          <div className="flex flex-col items-center">
            <Settings />
            <p className="text-xs font-medium">Settings</p>
          </div>
        </Link>
      </div>
      <AddEditTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
