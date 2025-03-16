import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "../../../services/transactionService";
import { Transaction } from "../types/transaction.types";
import { useMutationHandlers } from "@/utils/mutationHandlers";

export const useTransactionMutations = () => {
  const queryClient = useQueryClient();
  const { handleSuccess, handleError } = useMutationHandlers(queryClient);

  const createTransaction = useMutation({
    mutationFn: (transaction: Omit<Transaction, "_id">) =>
      transactionService.create(transaction),
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["transactions"] });
      handleSuccess("Transaction created successfully", ["transactions"]);},
    onError: handleError,
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
      //queryClient.invalidateQueries({ queryKey: ["transactions"] });
      handleSuccess("Transaction updated successfully", ["transactions"])},
    onError: handleError,
  });

  const deleteTransaction = useMutation({
    mutationFn: (id: string) => transactionService.delete(id),
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["transactions"] });
      handleSuccess("Transaction deleted successfully", ["transactions"])},
    onError: handleError,
  });

  return { createTransaction, updateTransaction, deleteTransaction };
};
