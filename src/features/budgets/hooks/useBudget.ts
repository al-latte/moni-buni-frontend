import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "../../../services/budgetService";
import { BudgetFormValues } from "../schemas/budgetSchema";
import { useMutationHandlers } from "@/utils/mutationHandlers";

export const useBudgets = (userId?: string) => {
  return useQuery({
    queryKey: ["budgets", userId],
    queryFn: async () => {
      if (!userId) return Promise.resolve([]);
      const budgets = await budgetService.getAll(userId!);
      return budgets;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

export const useBudgetMutations = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useMutationHandlers(queryClient);

  const createBudget = useMutation({
    mutationFn: (budget: BudgetFormValues & { userId: string }) =>
      budgetService.create(budget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      handleSuccess("Budget created successfully")},
    onError: handleError,
  });

  const updateBudget = useMutation({
    mutationFn: ({
      id,
      budget,
    }: {
      id: string;
      budget: Partial<BudgetFormValues> & { userId: string };
    }) => budgetService.update(id, budget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      handleSuccess("Budget updated successfully")},
    onError: handleError,
  });

  const deleteBudget = useMutation({
    mutationFn: (id: string) => budgetService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      handleSuccess("Budget deleted successfully")},
    onError: handleError,
  });

  return { createBudget, updateBudget, deleteBudget };
};
