import { Transaction } from "../types/transaction.types";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useWallets } from "@/features/wallets/hooks/useWallets";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import { useTransactionMutations } from "../hooks/useTransaction";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CalendarDays, Wallet, FileText, Tag } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TransactionDetailDrawerProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDetailDrawer = ({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailDrawerProps) => {
  const { openDialog } = useTransactionDialogStore();
  const { deleteTransaction } = useTransactionMutations();
  const [alertOpen, setAlertOpen] = useState(false);

  const { data: categories } = useCategories(transaction.userId);
  const { data: wallets } = useWallets(transaction.userId);

  const category = categories?.find((c) => c._id === transaction.category) || null;
  const wallet = wallets?.find((w) => w._id === transaction.wallet) || null;

  const isExpense = transaction.transactionType === "expense";

  const handleEdit = () => {
    onOpenChange(false);
    openDialog(transaction);
  };

  const handleDelete = async () => {
    try {
      await deleteTransaction.mutateAsync(transaction._id);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
    setAlertOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-3xl">{category?.icon || "🛒"}</span>
            </div>
            <DrawerTitle className="text-center text-base font-semibold">
              {category?.title || "Uncategorized"}
            </DrawerTitle>
            <DrawerDescription asChild>
              <span
                className={`text-2xl font-bold ${
                  isExpense ? "text-red-500" : "text-green-500"
                }`}
              >
                {isExpense ? "-" : "+"}
                {formatCurrency(transaction.amount)}
              </span>
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-3 px-2 py-3 bg-gray-50 rounded-xl">
              <Tag className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">Type</p>
                <p className="text-sm font-medium capitalize">
                  {transaction.transactionType}
                </p>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  isExpense
                    ? "bg-red-100 text-red-500"
                    : "bg-green-100 text-green-500"
                }`}
              >
                {isExpense ? "Expense" : "Income"}
              </span>
            </div>

            <div className="flex items-center gap-3 px-2 py-3 bg-gray-50 rounded-xl">
              <CalendarDays className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-sm font-medium">
                  {moment(transaction.date).format("dddd, MMMM D, YYYY")}
                </p>
              </div>
            </div>

            {transaction.description && (
              <div className="flex items-start gap-3 px-2 py-3 bg-gray-50 rounded-xl">
                <FileText className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Description</p>
                  <p className="text-sm font-medium">{transaction.description}</p>
                </div>
              </div>
            )}

            {wallet && (
              <div className="flex items-center gap-3 px-2 py-3 bg-gray-50 rounded-xl">
                <Wallet className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Wallet</p>
                  <p className="text-sm font-medium">{wallet.title}</p>
                </div>
              </div>
            )}
          </div>

          <DrawerFooter className="flex-row gap-3 px-0 pt-6">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1 rounded-full">
                Close
              </Button>
            </DrawerClose>
            <Button
              variant="outline"
              className="flex-1 rounded-full border-blue-200 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
              onClick={handleEdit}
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => setAlertOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="border-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              transaction and remove it from our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TransactionDetailDrawer;