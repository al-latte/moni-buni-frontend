import { lazy, Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { PeriodTabTrigger } from "@/components/PeriodTabTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useInsightsData } from "@/features/insights/hooks/useInsightsData";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { Period } from "@/features/transactions/types/transaction.types";

const SpendingByCategoryChart = lazy(() => import("./SpendingByCategoryChart"));
const IncomeVsExpensesChart = lazy(() => import("./IncomeVsExpensesChart"));
const NetSavingsTrendChart = lazy(() => import("./NetSavingsTrendChart"));

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "alltime", label: "All Time" },
];

const ChartSkeleton = () => <Skeleton className="w-full h-52 rounded-xl bg-zinc-800" />;

const InsightsTabContent = () => {
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>("month");

  const { data: transactions = [], isLoading } = useInsightsData(user?._id, period);
  const { data: categories = [] } = useCategories(user?._id);

  if (!user) return null;

  return (
    <div className="mt-4 mb-28">
      <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
        <TabsList className="grid w-full grid-cols-4 rounded-full bg-white border-2 border-black h-10 p-0 lg:w-[500px]">
          {PERIOD_OPTIONS.map((o) => (
            <PeriodTabTrigger key={o.value} value={o.value}>
              {o.label}
            </PeriodTabTrigger>
          ))}
        </TabsList>

        <TabsContent value={period}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

            <Card className="border-black bg-black text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton /> : (
                  <Suspense fallback={<ChartSkeleton />}>
                    <SpendingByCategoryChart transactions={transactions} categories={categories} />
                  </Suspense>
                )}
              </CardContent>
            </Card>

            <Card className="border-black bg-black text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Income vs. Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton /> : (
                  <Suspense fallback={<ChartSkeleton />}>
                    <IncomeVsExpensesChart transactions={transactions} period={period} />
                  </Suspense>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border-black bg-black text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Savings Trend</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <ChartSkeleton /> : (
                  <Suspense fallback={<ChartSkeleton />}>
                    <NetSavingsTrendChart transactions={transactions} period={period} />
                  </Suspense>
                )}
              </CardContent>
            </Card>

            

          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsightsTabContent;
