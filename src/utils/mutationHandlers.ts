import { QueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const useMutationHandlers = (queryClient: QueryClient) => {
  const { toast } = useToast();

  const handleSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    toast({
      description: message,
      variant: "success",
    });
  };

  const handleError = (error: unknown) => {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    toast({
      description: errorMessage,
      variant: "destructive",
    });
  };

  return { handleSuccess, handleError };
};