"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "@/store";
import { getCategorySpending, formatCurrency } from "@/lib/calculations";
import { useEffect, useState } from "react";

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#6366f1", // indigo
];

export function SpendingCategoryChart() {
  const transactions = useStore((state) => state.transactions);
  const theme = useStore((state) => state.theme);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(getCategorySpending(transactions));
  }, [transactions]);

  const isDark = theme === "dark";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Spending by Category
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                borderRadius: "8px",
              }}
              labelStyle={{ color: isDark ? "#f3f4f6" : "#000000" }}
              formatter={(value) => formatCurrency(value as number)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-80 items-center justify-center text-gray-500 dark:text-gray-400">
          <p>No expense data available</p>
        </div>
      )}
    </div>
  );
}
