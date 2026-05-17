import { Transaction } from "../types/transaction.types";
import moment from "moment";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useTransactionMutations } from "../hooks/useTransaction";
import { useTransactionDialogStore } from "@/stores/transaction.store";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  motion,
  useMotionValue,
  useTransform,
  useDragControls,
} from "motion/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState, useRef } from "react";
import TransactionDetailDrawer from "./TransactionDetailDrawer";

interface TransactionItemProps {
  transaction: Transaction;
  custom: number;
}

const TransactionItem = ({ transaction, custom }: TransactionItemProps) => {
  const { openDialog } = useTransactionDialogStore();
  const { deleteTransaction } = useTransactionMutations();
  const [alertOpen, setAlertOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const hasDragged = useRef(false);

  const { data: categories } = useCategories(transaction.userId);

  const category =
    categories?.find((c) => c._id === transaction.category) || null;

  const handleEdit = () => {
    openDialog(transaction);
  };

  const handleDelete = async () => {
    try {
      await deleteTransaction.mutateAsync(transaction?._id);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
    setAlertOpen(false);
  };

  const x = useMotionValue(0);
  const dragControls = useDragControls();

  const deleteProgress = useTransform(x, [-100, -20], [1, 0]);
  const deleteWidth = useTransform(
    x,
    value => value < 0 ? Math.abs(value) : 0
  );

  const editProgress = useTransform(x, [20, 100], [0, 1]);
  const editWidth = useTransform(
    x,
    value => value > 0 ? value : 0
  );

  const handleDragStart = () => {
    hasDragged.current = false;
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 5) {
      hasDragged.current = true;
    }
    if (info.offset.x > 100) {
      handleEdit();
    } else if (info.offset.x < -100) {
      setAlertOpen(true);
    }
    x.set(0);
  };

  const handleTap = () => {
    if (!hasDragged.current) {
      setDetailOpen(true);
    }
    hasDragged.current = false;
  };

  return (
    <div className="relative overflow-hidden mt-2">
      <div className="absolute inset-0 flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ width: editWidth }}
          className="bg-blue-500 flex items-center justify-center overflow-hidden rounded-s-xl"
        >
          <motion.div
            style={{ opacity: editProgress }}
            className="flex items-center text-white px-4"
          >
            <span className="font-medium">Edit</span>
          </motion.div>
        </motion.div>

        <div className="flex-grow"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{ width: deleteWidth }}
          className="bg-red-500 flex items-center justify-center overflow-hidden rounded-e-xl"
        >
          <motion.div
            style={{ opacity: deleteProgress }}
            className="flex items-center text-white px-4"
          >
            <span className="font-medium">Delete</span>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          ease: "easeOut",
          delay: custom * 0.2,
        }}
        className="py-2 text-sm relative overflow-hidden border-b border-gray-200 cursor-pointer"
        style={{ x }}
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTap={handleTap}
      >
        <div className="flex items-center justify-between gap-4 m-3">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">{category?.icon || "🛒"}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">
                {category?.title || "Uncategorized"}
              </p>
              <p className="text-sm text-gray-500">
                {moment(transaction.date).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
          <div className="flex items-end">
            <p
              className={`text-sm font-bold px-2 rounded-full ${
                transaction.transactionType === "expense"
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
              }`}
            >
              {transaction.transactionType === "expense" ? "-" : "+"}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </div>
      </motion.div>

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
            <AlertDialogAction className="bg-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TransactionDetailDrawer
        transaction={transaction}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
};

export default TransactionItem;