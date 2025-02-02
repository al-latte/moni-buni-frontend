import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  transactionSchema,
  type TransactionFormValues,
} from "../schemas/transactionSchema";
import { Transaction } from "../types/transaction.types";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { AddCategory } from "@/features/categories/components/AddCategory";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AddWallet } from "@/features/wallets/components/AddWallet";
import { Portal } from "@radix-ui/react-dialog";

export const AddEditTransactionDialog = ({
  transaction,
  open,
  onOpenChange,
}: {
  transaction?: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { createTransaction, updateTransaction } = useTransactionMutations();
  const { user } = useAuth();
  const { data: categories } = useCategories(user?._id);
  const { data: wallets } = useWallets(user?._id);
  const isEditing = !!transaction;

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          amount: transaction.amount,
          category: transaction.category._id,
          description: transaction.description,
          transactionType: transaction.transactionType,
          date: new Date(transaction.date),
          wallet: transaction.wallet._id,
        }
      : {
          amount: 0,
          category: "",
          description: "",
          transactionType: "expense",
          date: new Date(),
          wallet: "",
        },
  });

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
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:h-auto h-full max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <DialogDescription>Track your new transaction</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row items-center justify-center gap-4 m-3"
                    >
                      <div>
                        <RadioGroupItem
                          value="expense"
                          id="expense"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="expense"
                          className="cursor-pointer flex items-center justify-center gap-2 rounded-full border-2 border-black bg-popover py-3 px-6 peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                        >
                          Expense
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="income"
                          id="income"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="income"
                          className="cursor-pointer flex items-center justify-center gap-2 rounded-full border-2 border-black bg-popover py-3 px-6 peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white"
                        >
                          Income
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
        
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem >
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
                        {categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.title}
                          </SelectItem>
                        ))}
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
                      <PopoverContent
                        className="z-[9999] bg-background p-0 w-full"
                        
                      >
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
                        {wallets?.map((wallet) => (
                          <SelectItem key={wallet._id} value={wallet._id}>
                            {wallet.title}
                          </SelectItem>
                        ))}
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
        <div className="mt-4 flex flex-row justify-between">
          <AddCategory />
          <AddWallet />
        </div>
      </DialogContent>
    </Dialog>
  );
};
