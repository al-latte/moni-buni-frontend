import { CircleUser, DollarSign, Notebook, Plus, WalletMinimal } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTransactionDialogStore } from "@/stores/transaction.store";

export const MobileNav = () => {
  const { openDialog } = useTransactionDialogStore();

  return (
    <menu className="fixed bottom-0 w-full h-24 bg-white shadow-md px-4 pt-2 z-50 border-t border-gray-200">
      <div className="flex gap-12 justify-center items-center w-full">
        
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "" : "text-gray-400"}`
            }
          >
            {({ isActive }) => (
              <>
                <DollarSign color={isActive ? "#000000" : "#9ca3af"} />
                {/* <p className="text-xs font-medium">Transactions</p> */}
              </>
            )}
          </NavLink>
          <NavLink
            to="/wallets"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "active-class" : "text-gray-400"}`
            }
          >
            {({ isActive }) => (
              <>
                <WalletMinimal color={isActive ? "#000000" : "#9ca3af"} />
                {/* <p className="text-xs font-medium">Wallets</p> */}
              </>
            )}
          </NavLink>
          <div
            onClick={() => openDialog()}
            className="bg-black text-white rounded-full p-3 cursor-pointer"
          >
            <Plus />
          </div>
          <NavLink
            to="/budgets"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "active-class" : "text-gray-400"}`
            }
          >
            {({ isActive }) => (
              <>
                <Notebook color={isActive ? "#000000" : "#9ca3af"} />
                {/* <p className="text-xs font-medium">Budget</p> */}
              </>
            )}
          </NavLink>
          <NavLink
            to="/account-settings"
            className={({ isActive }) =>
              `flex flex-col items-center ${isActive ? "active-class" : "text-gray-400"}`
            }
          >
            {({ isActive }) => (
              <>
                <CircleUser color={isActive ? "#000000" : "#9ca3af"} />
                {/* <p className="text-xs font-medium">Account</p> */}
              </>
            )}
          </NavLink>
                </div>
        </menu>
  );
};
