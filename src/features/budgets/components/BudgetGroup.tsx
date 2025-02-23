import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Budget } from "../types/budget.types";
import { BudgetItem } from "./BudgetItem";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BudgetGroupProps {
  budgets: Budget[];
  label: string;
}

const BudgetGroup = ({ budgets, label }: BudgetGroupProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className=" mb-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between space-x-4 px-4 bg-black text-white rounded-full">
          <p className="text-sm font-semibold">{label}</p>
          <CollapsibleTrigger asChild>
            <Button className="bg-transparent">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <CollapsibleContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                {budgets.map((budget, index) => (
                  <BudgetItem key={budget._id} budget={budget} custom={index} />
                ))}
              </CollapsibleContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Collapsible>
    </div>
  );
};

export default BudgetGroup;
