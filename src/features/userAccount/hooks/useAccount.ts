import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { useMutationHandlers } from "@/utils/mutationHandlers";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { AccountFormValues } from "../schema/accountSchema";

export const useAccountMutaions = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();
  const { handleSuccess, handleError } = useMutationHandlers(queryClient);

  const updateAccount = useMutation({
    mutationFn: ({
      id, 
      data}: {
        id: string, data: AccountFormValues
      }) => authService.updateUser(id, data),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleSuccess("Account updated successfully");
    },
    onError: handleError,
  });

  return { updateAccount};
};


