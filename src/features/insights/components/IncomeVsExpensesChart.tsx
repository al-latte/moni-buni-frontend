import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { Transaction, Period } from "@/features/transactions/types/transaction.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  transactions: Transaction[];
  period: Period;
}

const getGroupKey = (date: Date, period: Period): { key: string; order: number } => {
  const m = moment(date);
  switch (period) {
    case "week":
      return { key: m.format("ddd"), order: m.isoWeekday() };
    case "month":
      return { key: m.format("D"), order: m.date() };
    case "year":
      return { key: m.format("MMM"), order: m.month() };
    case "alltime":
      return { key: m.format("YYYY"), order: m.year() };
  }
};

const IncomeVsExpensesChart = ({ transactions, period }: Props) => {
  const data = useMemo(() => {
    const grouped: Record<string, { income: number; expenses: number; order: number }> = {};

    transactions.forEach((t) => {
      const { key, order } = getGroupKey(new Date(t.date), period);
      if (!grouped[key]) grouped[key] = { income: 0, expenses: 0, order };
      if (t.transactionType === "income") grouped[key].income += t.amount;
      else grouped[key].expenses += t.amount;
    });

    return Object.entries(grouped)
      .map(([date, vals]) => ({ date, ...vals }))
      .sort((a, b) => a.order - b.order);
  }, [transactions, period]);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No data for this period
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis
          dataKey="date"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          stroke="#9ca3af"
        />
        <YAxis
          fontSize={11}
          tickLine={false}
          axisLine={false}
          stroke="#9ca3af"
          tickFormatter={(v) => `$${v}`}
          width={50}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.06)" }}
          contentStyle={{
            background: "#09090b",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            color: "#fff",
          }}
          labelStyle={{ color: "#e5e7eb" }}
          formatter={(value: number, name: string) => [
            formatCurrency(value),
            name === "income" ? "Income" : "Expenses",
          ]}
        />
        <Legend
          formatter={(value) => (value === "income" ? "Income" : "Expenses")}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ color: "#d1d5db" }}
        />
        <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={32} />
        <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeVsExpensesChart;
