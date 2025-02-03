import { Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTransactions } from "@/features/transactions/hooks/useTransactions"
import { filterTransactionsByPeriod } from "@/features/transactions/utils/dateFilters"
import { Period } from "@/features/transactions/types/transaction.types"
import moment from "moment"
import { useMemo } from "react"

interface ChartProps {
  userId?: string;
  period: Period;
}

const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export const Chart = ({ userId, period }: ChartProps) => {
  const { data: transactions } = useTransactions(userId || "");
  
  const data = useMemo(() => {
    const filtered = filterTransactionsByPeriod(transactions || [], period || "week");
    
    return filtered
      .sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())
      .map((t) => ({
        date: moment(t.date).format("DD MMM"),
        expenses: t.transactionType === "expense" ? t.amount : 0,
      }));
  }, [transactions, period]);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full bg-black rounded-3xl p-4 my-4">
      <LineChart
          data={data}
          accessibilityLayer
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
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
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#fff" }}
          />
        </LineChart>
    </ChartContainer>
  );
};