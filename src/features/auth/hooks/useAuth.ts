import { useEffect } from "react";
import { useUserStore } from "@/stores/user.store";

export const useAuth = () => {
  const { user, isLoading, setUser, login, logout, openDialog, closeDialog, isDialogOpen } = useUserStore();

  // Initialize loading state if needed
  useEffect(() => {
    if (isLoading) {
      useUserStore.setState({ isLoading: false });
    }
  }, [isLoading]);

  return {
    user,
    isLoading,
    setUser,
    login,
    logout,
    openDialog,
    closeDialog,
    isDialogOpen,
  };
};