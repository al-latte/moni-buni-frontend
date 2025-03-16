import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  transactionSchema,
  type TransactionFormValues,
} from "../schemas/transactionSchema";
import { useTransactionMutations } from "../hooks/useTransaction";
import { useCategories } from "../../categories/hooks/useCategories";
import { useWallets } from "../../wallets/hooks/useWallets";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Portal } from "@radix-ui/react-dialog";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import { useCategoryDialogStore } from "@/stores/category.store";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { useEffect, useCallback } from "react";

const AddEditTransactionDialog = () => {
  const { createTransaction, updateTransaction } = useTransactionMutations();
  const { user } = useAuth();

  const { isDialogOpen, transaction, closeDialog } =
    useTransactionDialogStore();
  const { openDialog: openCategoryDialog } = useCategoryDialogStore();
  const { openDialog: openWalletDialog } = useWalletDialogStore();

  const { data: categories } = useCategories(user?._id);
  const { data: wallets } = useWallets(user?._id);
  const isEditing = !!transaction;

  const defaultValues: TransactionFormValues = {
    amount: 0,
    category: "",
    description: "",
    transactionType: "expense",
    date: new Date(),
    wallet: "",
  };

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues,
  });

  const resetFormWithTransaction = useCallback(() => {
    if (!transaction) {
      form.reset(defaultValues);
      return;
    }

    form.reset({
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      transactionType: transaction.transactionType as "expense" | "income",
      date: new Date(transaction.date),
      wallet: transaction.wallet,
    });
  }, [transaction, form]);

  useEffect(() => {
    if (isDialogOpen) {
      resetFormWithTransaction();
    }
  }, [isDialogOpen, resetFormWithTransaction]);

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      if (isEditing && transaction) {
        await updateTransaction.mutateAsync({
          id: transaction._id,
          transaction: data,
        });
      } else {
        if (!user?._id) return;
        await createTransaction.mutateAsync({
          ...data,
          description: data.description || "",
          userId: user._id,
        });
      }
      form.reset();
      closeDialog();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px] md:h-auto h-full max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit": "Add"} Transaction
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Edit your transaction" : "Track your new transaction"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl className="rounded-full">
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.length ? (
                          categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value=" " disabled>
                            No Categories Available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl className="rounded-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl className="rounded-full">
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent className="z-[9999] bg-background p-0 w-full" align="start">
                        <div
                          className="p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="border-none"
                          />
                        </div>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wallet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="rounded-full">
                        <SelectValue placeholder="Select wallet" />
                      </SelectTrigger>
                      <SelectContent>
                        {wallets?.length ? (
                          wallets?.map((wallet) => (
                            <SelectItem key={wallet._id} value={wallet._id}>
                              {wallet.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value=" " disabled>
                            No Wallets Available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                className="rounded-full flex-1 md:py-6 py-4 font-bold"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        <div className="mt-4 flex flex-row justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full flex-1"
            onClick={() => openCategoryDialog()}
          >
            <Plus className="h-4 w-4" />
            New category
          </Button>
          <Button
            variant="outline"
            className="rounded-full flex-1"
            onClick={() => openWalletDialog()}
          >
            <Plus className="h-4 w-4" />
            New wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditTransactionDialog;
