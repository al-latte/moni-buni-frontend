import { Category } from "@/features/categories/types/category.types";
import { create } from "zustand";

type CategoryDialogState = {
  isDialogOpen: boolean;
  category: Category | null;
  openDialog: (category?: Category) => void;
  closeDialog: () => void;
};

export const useCategoryDialogStore = create<CategoryDialogState>((set) => ({
  isDialogOpen: false,
  category: null,
  openDialog: (category?) =>
    set((state) => {
      if (state.isDialogOpen && state.category?._id === category?._id) {
        return state;
      }
      return {
        isDialogOpen: true,
        category: category ?? null,
      };
    }),
  closeDialog: () =>
    set((state) => {
      if (!state.isDialogOpen) return state;
      
      document.body.style.pointerEvents = 'auto';
      
      return {
        isDialogOpen: false,
        category: null,
      };
    }),
}));
