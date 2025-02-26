import { useEffect } from "react";
import { useUserStore } from "@/stores/user.store";

export const useAuth = () => {
  const { user, isLoading, setUser, login, logout } = useUserStore();

  // Initialize loading state (optional if using persist middleware)
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
  };
};
