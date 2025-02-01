import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../api/categoryService';
import { Category } from '../types/category.types';

export const useCategories = (userId: string | undefined) => {
  return useQuery<Category[]>({
    queryKey: ['categories', userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return categoryService.getAll(userId);
    },
    enabled: !!userId,
  });
};