import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import fullHorizontalLogo from "./../assets/logo/full-ver.svg"
import { TabContentLayout } from "./TabContentLayout"
import { usePeriod } from "@/contexts/PeriodContext"
import { Period } from "@/features/transactions/types/transaction.types";

export const PeriodFilterTabs = () => {
  const { selectedPeriod, setSelectedPeriod } = usePeriod();
  
  return (
    <>
    <div className="md:hidden flex items-center justify-center p-4">
      <img src={fullHorizontalLogo} alt="logo" className="w-auto h-16" />
    </div>
    <Tabs defaultValue="week" className="w-full p-3 md:p-6" onValueChange={(value) => setSelectedPeriod(value as Period)}>
      <TabsList className="grid w-full grid-cols-4 rounded-full bg-white border-2 border-black h-10 p-0 lg:w-[650px] md:ml-auto md:mr-0">
        <TabsTrigger className="rounded-full h-full data-[state=active]:bg-black data-[state=active]:text-white" value="week">Week</TabsTrigger>
        <TabsTrigger className="rounded-full h-full data-[state=active]:bg-black data-[state=active]:text-white" value="month">Month</TabsTrigger>
        <TabsTrigger className="rounded-full h-full data-[state=active]:bg-black data-[state=active]:text-white" value="year">Year</TabsTrigger>
        <TabsTrigger className="rounded-full h-full data-[state=active]:bg-black data-[state=active]:text-white" value="alltime">All Time</TabsTrigger>
      </TabsList>
      <TabsContent value="week">
        <TabContentLayout/>
      </TabsContent>
      <TabsContent value="month">
        <TabContentLayout />
      </TabsContent>
      <TabsContent value="year">
        <TabContentLayout />
      </TabsContent>
      <TabsContent value="alltime">
        <TabContentLayout />
      </TabsContent>
    </Tabs>
    </>
  )
}
