import { Transaction } from "../types/transaction.types";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useCategories } from "@/features/categories/hooks/useCategories";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTransactionMutations } from "../hooks/useTransaction";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import { useState } from 'react';
import { formatCurrency } from "@/utils/formatCurrency";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { openDialog } = useTransactionDialogStore();
  const { deleteTransaction } = useTransactionMutations();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: categories } = useCategories(transaction.userId);

  const category =
    categories?.find((c) => c._id === transaction.category) || null;

  const handleEdit = () => {
      setIsDropdownOpen(false);
      openDialog(transaction);
    };

  const handleDelete = async () => {
    try {
      await deleteTransaction.mutateAsync(transaction?._id);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <>
      <div className="py-2 text-sm">
        <div className="flex items-start gap-4 m-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">{category?.icon || '🛒'}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {category?.title || "Uncategorized"}
            </p>
            <p className="text-sm text-gray-500">
              {moment(transaction.date).format("MMM DD, YYYY")}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p
              className={`text-sm font-bold ${
                transaction.transactionType === "expense"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {transaction.transactionType === "expense" ? "-" : "+"}
              {formatCurrency(transaction.amount)}
            </p>
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="px-3 mx-2 bg-white shadow-md border rounded">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <Button
                      onClick={handleEdit}
                      className="rounded-full w-full"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer py-3">
                    <Button
                      onClick={handleDelete}
                      className="rounded-full w-full bg-red-600"
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator />
      </div>
    </>
  );
};

export default TransactionItem;
