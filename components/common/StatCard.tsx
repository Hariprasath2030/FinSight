"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/calculations";

interface StatCardProps {
  title: string;
  value: number | React.ReactNode; // <-- allow numbers or nodes
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple";
  isCurrency?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorVariants = {
  blue: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
  green: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
  red: "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400",
  purple:
    "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
};

export function StatCard({
  title,
  value,
  icon,
  color,
  isCurrency = true,
  trend,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {
              typeof value === "number"
                ? isCurrency
                  ? formatCurrency(value)
                  : `${value}%`
                : value
            }
          </h3>
          {trend && (
            <p
              className={`mt-2 text-sm font-medium ${
                trend.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last
              month
            </p>
          )}
        </div>
        <div className={`rounded-lg p-3 ${colorVariants[color]}`}>{icon}</div>
      </div>
    </motion.div>
  );
}
