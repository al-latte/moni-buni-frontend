import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import TransactionItem from "./TransactionItem";
import { type TransactionGroup } from "../types/transaction.types";
import { AnimatePresence, motion } from "motion/react";

const TransactionGroup = ({ date, transactions }: TransactionGroup) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between space-x-4 px-4 bg-black text-white rounded-full">
          <p className="text-sm font-semibold">{date}</p>
          <CollapsibleTrigger asChild>
            <Button className="bg-transparent">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <CollapsibleContent className="space-y-2">
                {transactions.map((transaction, index) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                    custom={index}
                  />
                ))}
              </CollapsibleContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
};
export default TransactionGroup;
