import { useUserStore } from "@/stores/user.store";

export const useAuth = () => {
  const { user, isLoading, setUser, setIsLoading, login, logout, openDialog, closeDialog, isDialogOpen } = useUserStore();

  return {
    user,
    isLoading,
    setUser,
    setIsLoading,
    login,
    logout,
    openDialog,
    closeDialog,
    isDialogOpen,
  };
};
