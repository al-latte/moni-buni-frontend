import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../services/transactionService";
import { Transaction } from "../types/transaction.types";
import { useToast } from "@/hooks/use-toast";

export const useTransactionMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTransaction = useMutation({
    mutationFn: (transaction: Omit<Transaction, "_id">) =>
      transactionService.create(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        description: "Transaction created successfully",
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

  const updateTransaction = useMutation({
    mutationFn: ({
      id,
      transaction,
    }: {
      id: string;
      transaction: Partial<Transaction>;
    }) => transactionService.update(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        description: "Transaction updated successfully",
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

  const deleteTransaction = useMutation({
    mutationFn: (id: string) => transactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast({
        description: "Transaction deleted successfully",
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

  return { createTransaction, updateTransaction, deleteTransaction };
};
