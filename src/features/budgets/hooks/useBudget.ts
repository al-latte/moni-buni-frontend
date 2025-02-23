import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "../../../services/budgetService";
import { BudgetFormValues } from "../schemas/budgetSchema";
import { useToast } from "@/hooks/use-toast";

export const useBudgets = (userId?: string) => {
  return useQuery({
    queryKey: ["budgets", userId],
    queryFn: async () => {
      if(!userId) return Promise.resolve([]);
      const budgets = await budgetService.getAll(userId!)
      return budgets
    },
    enabled: !!userId,
  });
};

export const useBudgetMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createBudget = useMutation({
    mutationFn: (budget: BudgetFormValues & { userId: string }) =>
      budgetService.create(budget),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast({
        description: "Budget created successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
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
      toast({
        description: "Budget updated successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteBudget = useMutation({
    mutationFn: (id: string) => budgetService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast({
        description: "Budget deleted successfully",
        variant: "success",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { createBudget, updateBudget, deleteBudget };
};
