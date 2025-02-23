import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import { Category } from "../types/category.types";

export const useCategories = (userId: string | undefined) => {
  return useQuery<Category[]>({
    queryKey: ["categories", userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return categoryService.getAll(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,
  });
};
