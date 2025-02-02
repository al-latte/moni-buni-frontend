import {
  DollarSign,
  Plus,
  ReceiptText,
  WalletMinimal,
  LogOut,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AddEditTransactionDialog } from "@/features/transactions/components/AddEditTransactionDialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";

export const MobileNav = () => {
  const { mutate: logout } = useLogout();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <Settings />
              <p className="text-xs font-medium">Settings</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-2 mb-10 bg-white shadow-md border">
            <DropdownMenuLabel>
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 font-medium"
              onClick={handleLogout}
            >
              <span className="flex flex-row items-center gap-3">
                Log out <LogOut className="mr-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AddEditTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
