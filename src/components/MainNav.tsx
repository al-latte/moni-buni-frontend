import { CircleUser, DollarSign, Notebook, Plus, WalletMinimal } from "lucide-react";
import { NavLink } from "react-router-dom";
import fullHorizontalLogo from "./../assets/logo/full-ver-white2.svg";
import { useTransactionDialogStore } from "@/stores/transaction.store";

export const MainNav = () => {
  const { openDialog } = useTransactionDialogStore();

  return (
    <>
      <div className="flex flex-col items-center justify-between w-20 h-[calc(100vh-2rem)] bg-black shadow-md px-4 py-12 text-white m-4 rounded-3xl">
        <div className="flex flex-col items-center space-y-10">
          <NavLink to="/">
            <div className="flex flex-col items-center mb-6">
              <img src={fullHorizontalLogo} alt="" className="w-full h-16" />
            </div>
          </NavLink>
          <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "" : "text-gray-400"}`
          }
        >
          {({ isActive }) => (
            <>
              <DollarSign color={isActive ? "#ffffff" : "#9ca3af"} />
              <p className="text-xs font-medium">Transactions</p>
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
              <WalletMinimal color={isActive ? "#ffffff" : "#9ca3af"} />
              <p className="text-xs font-medium">Wallets</p>
            </>
          )}
        </NavLink>
            <div
              onClick={() => openDialog()}
              className="flex flex-col items-center"
            >
              <div className="bg-white text-black rounded-full p-3 flex items-center justify-center w-10 h-10">
                <Plus />
              </div>
              <p className="text-xs font-medium text-center">Add New</p>
            </div>
            <NavLink
          to="/budgets"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "active-class" : "text-gray-400"}`
          }
        >
          {({ isActive }) => (
            <>
              <Notebook color={isActive ? "#ffffff" : "#9ca3af"} />
              <p className="text-xs font-medium">Budget</p>
            </>
          )}
        </NavLink>
        </div>
        <NavLink
          to="/account-settings"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "active-class" : "text-gray-400"}`
          }
        >
          {({ isActive }) => (
            <>
              <CircleUser color={isActive ? "#ffffff" : "#9ca3af"} />
              <p className="text-xs font-medium">Account</p>
            </>
          )}
        </NavLink>
      </div>
      
    </>
  );
};
