import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabContentLayout } from "./TabContentLayout";
import { WalletTabContentLayout } from "./WalletTabContentLayout";
import { Period } from "@/features/transactions/types/transaction.types";
import { usePeriodStore } from "@/stores/period.store";
import { PeriodTabTrigger } from "./PeriodTabTrigger";

interface PeriodFilterTabsProps {
  variant?: "default" | "wallet";
}

const PERIOD_OPTIONS = [
  { value: "week" as Period, label: "Week" },
  { value: "month" as Period, label: "Month" },
  { value: "year" as Period, label: "Year" },
  { value: "alltime" as Period, label: "All Time" },
] as const;

export const PeriodFilterTabs = ({
  variant = "default",
}: PeriodFilterTabsProps) => {
  const { selectedPeriod, setSelectedPeriod } = usePeriodStore();

  const ContentComponent =
    variant === "wallet" ? WalletTabContentLayout : TabContentLayout;

  return (
    <>
      <Tabs
        defaultValue={selectedPeriod}
        value={selectedPeriod}
        className="w-full p-3 md:p-6"
        onValueChange={(value) => setSelectedPeriod(value as Period)}
      >
        <TabsList className="grid w-full grid-cols-4 rounded-full bg-white border-2 border-black h-10 p-0 lg:w-[650px] md:ml-auto md:mr-0">
          {PERIOD_OPTIONS.map((option) => (
            <PeriodTabTrigger key={option.value} value={option.value}>
              {option.label}
            </PeriodTabTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedPeriod}>
          <ContentComponent />
        </TabsContent>
      </Tabs>
    </>
  );
};
