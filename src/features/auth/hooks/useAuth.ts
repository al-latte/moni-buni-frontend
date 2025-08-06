import { useEffect } from "react";
import { useUserStore } from "@/stores/user.store";

export const useAuth = () => {
  try {
    const { user, isLoading, setUser, setIsLoading, login, logout, openDialog, closeDialog, isDialogOpen } = useUserStore();

    // Initialize loading state if needed
    useEffect(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, [isLoading, setIsLoading]);

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
  } catch (error) {
    console.error("Error in useAuth hook:", error);
    // Return default values if store fails
    return {
      user: null,
      isLoading: false,
      setUser: () => {},
      login: () => {},
      logout: () => {},
      openDialog: () => {},
      closeDialog: () => {},
      isDialogOpen: false,
    };
  }
};
