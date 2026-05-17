import { lazy, Suspense } from "react";
import { Layout } from "@/layouts/Layout";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { PeriodTabTrigger } from "@/components/PeriodTabTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePeriodStore } from "@/stores/period.store";
import { useInsightsData } from "@/features/insights/hooks/useInsightsData";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { Period } from "@/features/transactions/types/transaction.types";
import WalletFilterChips from "@/features/wallets/components/WalletFilterChips";
import { useWalletDialogStore } from "@/stores/wallet.store";

const SpendingByCategoryChart = lazy(
  () => import("@/features/insights/components/SpendingByCategoryChart"),
);
const IncomeVsExpensesChart = lazy(
  () => import("@/features/insights/components/IncomeVsExpensesChart"),
);
const NetSavingsTrendChart = lazy(
  () => import("@/features/insights/components/NetSavingsTrendChart"),
);

const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
  { value: "alltime", label: "All Time" },
];

const ChartSkeleton = () => (
  <Skeleton className="w-full h-52 rounded-xl bg-zinc-800" />
);

export const InsightsPage = () => {
  const { user } = useAuth();
  const { selectedPeriod, setSelectedPeriod } = usePeriodStore();
  const { selectedWallet } = useWalletDialogStore();

  const { data: transactions = [], isLoading } = useInsightsData(
    user?._id,
    selectedPeriod,
    selectedWallet?._id,
  );
  const { data: categories = [] } = useCategories(user?._id);

  if (!user) return null;

  return (
    <Layout>
      <div className="p-3 md:p-6 mb-28">
        <Tabs
          value={selectedPeriod}
          onValueChange={(v) => setSelectedPeriod(v as Period)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 rounded-full bg-white border-2 border-black h-10 p-0 lg:w-[500px]">
            {PERIOD_OPTIONS.map((o) => (
              <PeriodTabTrigger key={o.value} value={o.value}>
                {o.label}
              </PeriodTabTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedPeriod}>
            <WalletFilterChips />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Spending by Category */}
              <Card className="border-black bg-black text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-white">
                    Spending by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ChartSkeleton />
                  ) : (
                    <Suspense fallback={<ChartSkeleton />}>
                      <SpendingByCategoryChart
                        transactions={transactions}
                        categories={categories}
                      />
                    </Suspense>
                  )}
                </CardContent>
              </Card>

              {/* Income vs Expenses */}
              <Card className="border-black bg-black text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-white">
                    Income vs. Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ChartSkeleton />
                  ) : (
                    <Suspense fallback={<ChartSkeleton />}>
                      <IncomeVsExpensesChart
                        transactions={transactions}
                        period={selectedPeriod}
                      />
                    </Suspense>
                  )}
                </CardContent>
              </Card>

              {/* Net Savings Trend — full width */}
              <Card className="md:col-span-2 border-black bg-black text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-white">
                    Savings Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ChartSkeleton />
                  ) : (
                    <Suspense fallback={<ChartSkeleton />}>
                      <NetSavingsTrendChart
                        transactions={transactions}
                        period={selectedPeriod}
                      />
                    </Suspense>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};
