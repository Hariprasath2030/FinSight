"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { getCategorySpending, formatCurrency } from "@/lib/calculations";
import { useEffect, useState } from "react";

const BASE_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#6366f1", // indigo
];

export function SpendingCategoryChart() {
  const transactions = useStore((state) => state.transactions);
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(getCategorySpending(transactions));
  }, [transactions]);

  const isDark = theme === "dark";

  const cardBg = isDark
    ? "bg-black/70 border-gray-800 shadow-[0_10px_40px_rgba(255,255,255,0.05)]"
    : "bg-white/80 border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)]";

  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl ${cardBg} transition-all duration-500`}
    >
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
              paddingAngle={4}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BASE_COLORS[index % BASE_COLORS.length]}
                  style={{ transition: "all 0.3s ease-in-out" }}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#e5e7eb" : "#ffffff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                borderRadius: "12px",
                padding: "12px",
                backdropFilter: "blur(6px)",
                boxShadow: isDark
                  ? "0 4px 20px rgba(255,255,255,0.05)"
                  : "0 4px 20px rgba(0,0,0,0.1)",
              }}
              labelStyle={{
                color: isDark ? "#f3f4f6" : "#000000",
                fontWeight: 500,
              }}
              formatter={(value) => formatCurrency(value as number)}
            />

            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: 10,
                color: isDark ? "#f3f4f6" : "#374151",
                fontWeight: 500,
              }}
            />
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
