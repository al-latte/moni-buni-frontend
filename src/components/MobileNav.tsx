import { House, Notebook, Plus, Settings, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTransactionDialogStore } from "@/stores/transaction.store";

export const MobileNav = () => {
  const { openDialog } = useTransactionDialogStore();

  return (
    <menu className="fixed bottom-3 w-full bg-white/70 backdrop-blur-md rounded-full shadow-md p-2 z-50 border border-gray-200/50">
      <div className="flex gap-2 justify-between items-center w-full text-black">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 rounded-full ${isActive ? "bg-black/10" : ""}`
          }
        >
          <House color="#000000" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/insights"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 rounded-full ${isActive ? "bg-black/10" : ""}`
          }
        >
          <TrendingUp color="#000000" />
          <span className="text-xs">Insights</span>
        </NavLink>
        <div className="flex flex-col items-center">
          <div
            onClick={() => openDialog()}
            className="bg-black text-white rounded-full p-3 cursor-pointer"
          >
            <Plus />
          </div>
        </div>
        <NavLink
          to="/budgets"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 rounded-full ${isActive ? "bg-black/10" : ""}`
          }
        >
          <Notebook color="#000000" />
          <span className="text-xs">Budgets</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-col items-center py-2 px-4 rounded-full ${isActive ? "bg-black/10" : ""}`
          }
        >
          <Settings color="#000000" />
          <span className="text-xs">Settings</span>
        </NavLink>
      </div>
    </menu>
  );
};