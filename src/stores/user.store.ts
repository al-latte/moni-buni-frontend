import { User } from "@/features/auth/types/auth.types";
import { AuthResponse } from "@/features/auth/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  user: User | null;
  isLoading: boolean;
  isDialogOpen: boolean;
  setUser: (userData: User | null) => void;
  login: (data: AuthResponse) => void;
  logout: () => void;
  openDialog: (user?: User) => void;
  closeDialog: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isDialogOpen: false,

      setUser: (userData) =>
        set((state) => {
          if (!userData) {
            return { user: null };
          }

          const updatedUser = state.user
            ? {
                ...state.user,
                ...userData,
                token: userData.token || state.user.token,
              }
            : userData;

          return { user: updatedUser };
        }),

      login: (data) =>
        set({
          user: {
            ...data.user,
            token: data.token,
          },
        }),

      logout: () => set({ user: null }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      openDialog: (user) =>
        set((state) => {
          if (state.isDialogOpen && state.user?._id === user?._id) {
            return state;
          }

          return {
            isDialogOpen: true,
            user: user ?? state.user,
          };
        }),

      closeDialog: () =>
        set((state) => {
          if (!state.isDialogOpen) return state;

          document.body.style.pointerEvents = "auto";

          return {
            isDialogOpen: false,
          };
        }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
