import { Settings, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useNavigate } from "react-router-dom";

const SettingsMenu = () => {
    const { mutate: logout } = useLogout();
    const navigate = useNavigate();


    const handleLogout = () => {
        try {
          logout();
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };
      
  return (
    <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <Settings />
              <p className="text-xs font-medium">Settings</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit sm:w-56 mx-2 mb-10 bg-white shadow-md border">
            <DropdownMenuLabel className="py-3">
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="mb-10">
              <DropdownMenuItem className="cursor-pointer py-3" onClick={() => navigate("/settings/user-profile")}>
                User Profile
              </DropdownMenuItem>
              <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer py-3">Manage</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className="cursor-pointer py-3" onClick={() => navigate("/settings/categories")}>Categories</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-3">Recurring Transactions</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 font-medium py-3"
              onClick={handleLogout}
            >
              <span className="flex flex-row items-center gap-3">
                Log out <LogOut className="mr-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}
export default SettingsMenu