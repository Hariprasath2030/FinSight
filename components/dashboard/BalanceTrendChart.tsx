"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { getBalanceTrend, formatCurrency } from "@/lib/calculations";
import { useEffect, useState } from "react";

export function BalanceTrendChart() {
  const transactions = useStore((state) => state.transactions);
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(getBalanceTrend(transactions));
  }, [transactions]);

  const isDark = theme === "dark";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Balance Trend
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#e5e7eb"}
          />
          <XAxis
            dataKey="date"
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            style={{ fontSize: 12 }}
          />
          <YAxis
            stroke={isDark ? "#9ca3af" : "#6b7280"}
            style={{ fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: isDark ? "#f3f4f6" : "#000000" }}
            formatter={(value) => formatCurrency(value as number)}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
