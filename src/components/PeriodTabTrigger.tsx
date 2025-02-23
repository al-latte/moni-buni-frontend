import { Period } from "@/features/transactions/types/transaction.types";
import { TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface PeriodTabTriggerProps {
  value: Period;
  children: ReactNode;
}

export const PeriodTabTrigger = ({
  value,
  children,
}: PeriodTabTriggerProps) => {
  return (
    <TabsTrigger
      className="rounded-full h-full data-[state=active]:bg-black data-[state=active]:text-white"
      value={value}
    >
      {children}
    </TabsTrigger>
  );
};
