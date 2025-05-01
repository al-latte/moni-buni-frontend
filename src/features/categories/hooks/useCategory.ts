import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "../../../services/categoryService";
import { Category } from "../types/category.types";
import { useMutationHandlers } from "@/utils/mutationHandlers";

export const useCategoryMutations = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useMutationHandlers(queryClient);

  const createCategory = useMutation({
    mutationFn: (category: Omit<Category, "_id">) =>
      categoryService.create(category),
    onSuccess: () => {
      handleSuccess("Category created successfully", ["categories"]);
    },
    onError: handleError,
  });

  const updateCategory = useMutation({
    mutationFn: ({
      id,
      category,
    }: {
      id: string;
      category: Partial<Category>;
    }) => categoryService.update(id, category),
    onSuccess: () => {
      handleSuccess("Category updated successfully", ["categories"]);
    },
    onError: handleError,
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => categoryService.delete(id),
    onSuccess: () => {
      handleSuccess("Category deleted successfully", ["categories"]);
    },
    onError: handleError,
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
