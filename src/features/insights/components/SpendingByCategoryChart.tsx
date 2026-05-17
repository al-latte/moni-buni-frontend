import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/features/transactions/types/transaction.types";
import { Category } from "@/features/categories/types/category.types";
import { formatCurrency } from "@/utils/formatCurrency";

const COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ec4899",
  "#8b5cf6", "#14b8a6", "#f97316", "#06b6d4", "#84cc16",
];

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

const SpendingByCategoryChart = ({ transactions, categories }: Props) => {
  const data = useMemo(() => {
    const totals: Record<string, number> = {};
    transactions
      .filter((t) => t.transactionType === "expense")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });

    return Object.entries(totals)
      .map(([id, value]) => {
        const cat = categories.find((c) => c._id === id);
        return { name: cat?.title || "Other", icon: cat?.icon || "🛒", value };
      })
      .sort((a, b) => b.value - a.value);
  }, [transactions, categories]);

  const total = data.reduce((s, d) => s + d.value, 0);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
        No expense data for this period
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#09090b",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "#fff",
            }}
            formatter={(value: number) => [formatCurrency(value), "Amount"]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>{item.icon}</span>
              <span className="text-gray-200 truncate max-w-[120px]">{item.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-gray-400 text-xs">
                {total > 0 ? Math.round((item.value / total) * 100) : 0}%
              </span>
              <span className="font-medium text-white">{formatCurrency(item.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingByCategoryChart;
