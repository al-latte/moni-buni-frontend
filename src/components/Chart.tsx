import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import { filterTransactionsByPeriod } from "@/utils/dateFilters";
import { Period } from "@/features/transactions/types/transaction.types";
import moment from "moment";
import { useMemo } from "react";

interface ChartProps {
  userId?: string;
  period: Period;
  walletId?: string; // Add walletId prop
}

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "#ef4444", // red
  },
  income: {
    label: "Income",
    color: "#22c55e", // green
  },
} satisfies ChartConfig;

const Chart = ({ userId, period, walletId }: ChartProps) => {
  const { data: transactions } = useTransactions(userId || "");

  const data = useMemo(() => {
    // First filter by wallet if provided
    const walletTransactions =
      transactions?.filter((t) => !walletId || t.wallet === walletId) || [];

    // Then filter by period
    const filtered = filterTransactionsByPeriod(
      walletTransactions,
      period || "week"
    );

    return filtered
      .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
      .map((t) => ({
        date: moment(t.date).format("DD MMM"),
        expenses: t.transactionType === "expense" ? t.amount : 0,
        income: t.transactionType === "income" ? t.amount : 0,
      }));
  }, [transactions, period, walletId]); // Add walletId to dependencies

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full bg-black rounded-3xl p-4 my-4"
    >
      <LineChart
        data={data}
        accessibilityLayer
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        width={800}
        height={300}
      >
        <XAxis
          dataKey="date"
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {/* Expense line */}
        <Line
          type="monotone"
          dataKey="expenses"
          stroke={chartConfig.expenses.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: chartConfig.expenses.color }}
        />
        {/* Income line */}
        <Line
          type="monotone"
          dataKey="income"
          stroke={chartConfig.income.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: chartConfig.income.color }}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default Chart;
