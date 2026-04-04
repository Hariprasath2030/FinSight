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
import { motion } from "framer-motion";

export function BalanceTrendChart() {
  const transactions = useStore((state) => state.transactions);
  const { theme } = useTheme();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(getBalanceTrend(transactions));
  }, [transactions]);

  const isDark = theme === "dark";

  const cardBg = isDark
    ? "bg-black/70 border-gray-800 shadow-[0_10px_40px_rgba(255,255,255,0.05)]"
    : "bg-white/80 border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)]";

  const lineGradient = isDark
    ? "url(#balanceGradientDark)"
    : "url(#balanceGradientLight)";

  return (
    <div
      className={`rounded-2xl border p-6 backdrop-blur-xl ${cardBg} transition-all duration-500`}
    >
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Balance Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Gradients */}
          <defs>
            <linearGradient
              id="balanceGradientLight"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient
              id="balanceGradientDark"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
            </linearGradient>
          </defs>

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
