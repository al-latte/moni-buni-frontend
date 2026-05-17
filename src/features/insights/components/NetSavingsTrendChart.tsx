import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import moment from "moment";
import { Transaction, Period } from "@/features/transactions/types/transaction.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
  transactions: Transaction[];
  period: Period;
}

const dateLabel = (date: Date, period: Period) => {
  const m = moment(date);
  switch (period) {
    case "week": return m.format("ddd");
    case "month": return m.format("D MMM");
    case "year": return m.format("MMM");
    case "alltime": return m.format("MMM YYYY");
  }
};

const NetSavingsTrendChart = ({ transactions, period }: Props) => {
  const data = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
    );
    let running = 0;
    return sorted.map((t) => {
      running += t.transactionType === "income" ? t.amount : -t.amount;
      return { date: dateLabel(new Date(t.date), period), net: parseFloat(running.toFixed(2)) };
    });
  }, [transactions, period]);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No data for this period
      </div>
    );
  }

  const isPositive = data[data.length - 1]?.net >= 0;

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={isPositive ? "#22c55e" : "#ef4444"}
              stopOpacity={0.25}
            />
            <stop
              offset="95%"
              stopColor={isPositive ? "#22c55e" : "#ef4444"}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
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
          width={55}
        />
        <Tooltip
          contentStyle={{
            background: "#09090b",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            color: "#fff",
          }}
          labelStyle={{ color: "#e5e7eb" }}
          formatter={(value: number) => [formatCurrency(value), "Net Savings"]}
        />
        <ReferenceLine y={0} stroke="#52525b" strokeDasharray="4 2" />
        <Area
          type="monotone"
          dataKey="net"
          stroke={isPositive ? "#22c55e" : "#ef4444"}
          strokeWidth={2}
          fill="url(#netGradient)"
          dot={false}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NetSavingsTrendChart;
