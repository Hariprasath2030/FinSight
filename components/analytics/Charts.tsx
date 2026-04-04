"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useStore } from "@/store";
import { getMonthlyComparison, formatCurrency } from "@/lib/calculations";

export function IncomExpenseChart() {
  const transactions = useStore((state) => state.transactions);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(getMonthlyComparison(transactions));
  }, [transactions]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Income vs Expenses
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#000000" }}
              formatter={(value) => formatCurrency(value as number)}
            />
            <Legend />
            <Bar dataKey="income" fill="#10b981" />
            <Bar dataKey="expenses" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-80 items-center justify-center text-gray-500 dark:text-gray-400">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}

export function SavingsRateChart() {
  const transactions = useStore((state) => state.transactions);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const monthlyData = getMonthlyComparison(transactions);
    const savingsData = monthlyData.map((m) => ({
      month: m.month,
      savingsRate:
        m.income > 0 ? ((m.income - m.expenses) / m.income) * 100 : 0,
    }));
    setData(savingsData);
  }, [transactions]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        Savings Rate Trend
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: 12 }} />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: 12 }}
              label={{
                value: "Percentage (%)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#000000" }}
              formatter={(value) => `${(value as number).toFixed(2)}%`}
            />
            <Line
              type="monotone"
              dataKey="savingsRate"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-80 items-center justify-center text-gray-500 dark:text-gray-400">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
