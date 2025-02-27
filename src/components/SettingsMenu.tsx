import { Edit, Ellipsis, LogOut, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAccountDialog } from '@/features/userAccount/hooks/useAccountDialog'; 
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useState } from "react";

const SettingsMenu = () => {
  const { mutate: logout } = useLogout();
  const { openDialog } = useAccountDialog();
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEdit = () => {
    if (user) {
      openDialog(user);
    }
  };

  const handleDelete = () => {
    // Delete account logic here
  };
      
  return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <Ellipsis />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-fit sm:w-56 mx-2 mb-10 bg-white shadow-md border">
            <DropdownMenuLabel className="py-3">
              Account Settings
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="mb-10">
              <DropdownMenuItem className="cursor-pointer py-3" onClick={() => {
                setIsDropdownOpen(false);
                handleEdit()}}>
              <span className="flex flex-row items-center gap-3">
                Edit Profile<Edit className="mr-2 h-4 w-4" />
              </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer py-3" onClick={handleLogout}>
              <span className="flex flex-row items-center gap-3">
              Log out<LogOut className="mr-2 h-4 w-4" />
              </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 font-medium py-3"
              onClick={handleDelete}
            >
              <span className="flex flex-row items-center gap-3">
              Delete Account <Trash className="mr-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  )
}
export default SettingsMenu