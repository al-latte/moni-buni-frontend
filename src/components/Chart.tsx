import { Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Transaction } from "@/features/transactions/types/transaction.types";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";
import { useMemo } from "react";

interface ChartProps {
  transactions: Transaction[];
}

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
  income: {
    label: "Income",
    color: "#22c55e",
  },
} satisfies ChartConfig;

const Chart = ({ transactions }: ChartProps) => {
  const chartData = useMemo(() => {
    const totalsByDate = transactions.reduce<
      Record<string, { date: string; sortDate: number; expenses: number; income: number }>
    >((totals, transaction) => {
      const date = moment(transaction.date).format("DD MMM");

      if (!totals[date]) {
        totals[date] = {
          date,
          sortDate: moment(transaction.date).startOf("day").valueOf(),
          expenses: 0,
          income: 0,
        };
      }

      if (transaction.transactionType === "expense") {
        totals[date].expenses += transaction.amount;
      } else {
        totals[date].income += transaction.amount;
      }

      return totals;
    }, {});

    return Object.values(totalsByDate)
      .sort((a, b) => a.sortDate - b.sortDate)
      .map((data) => ({
        date: data.date,
        expenses: data.expenses,
        income: data.income,
      }));
  }, [transactions]);

  if (!chartData.length) {
    return (
      <div className="h-[260px] w-full bg-black rounded-lg p-4 my-4 flex items-center justify-center text-sm font-medium text-gray-400">
        No chart data for these filters
      </div>
    );
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="h-[260px] w-full bg-black rounded-lg p-4 my-4"
    >
      <LineChart
        data={chartData}
        accessibilityLayer
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <XAxis
          dataKey="date"
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="border-white/10 bg-zinc-950 text-white"
              formatter={(value, name) => (
                <>
                  <span className="text-gray-400">{name}</span>
                  <span className="ml-auto font-mono font-medium text-white">
                    {formatCurrency(Number(value))}
                  </span>
                </>
              )}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke={chartConfig.expenses.color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: chartConfig.expenses.color }}
        />
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
