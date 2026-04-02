"use client";

import { useEffect, useState } from "react";
import { TrendingUp, AlertCircle, Target, Zap } from "lucide-react";
import { useStore } from "@/store";
import {
  getHighestSpendingCategory,
  calculateDashboardStats,
  getCategorySpending,
  getSavingsRate,
  getBalanceTrend,
} from "@/lib/calculations";
import { motion } from "framer-motion";

interface Insight {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "amber" | "green" | "purple";
}

export function InsightsModule() {
  const transactions = useStore((state) => state.transactions);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const stats = calculateDashboardStats(transactions);
    const topCategory = getHighestSpendingCategory(transactions);
    const savingsRate = getSavingsRate(transactions);
    const categorySpending = getCategorySpending(transactions);
    const balanceTrend = getBalanceTrend(transactions);

    const newInsights: Insight[] = [];

    // Insight 1: Highest Spending Category
    if (topCategory && topCategory !== "N/A") {
      const topCategoryAmount = categorySpending[0]?.value || 0;
      newInsights.push({
        title: "Top Spending Category",
        description: `${topCategory} is your highest expense at $${topCategoryAmount.toFixed(2)} (${categorySpending[0]?.percentage.toFixed(1)}% of total spending)`,
        icon: <AlertCircle size={24} />,
        color: "amber",
      });
    }

    // Insight 2: Savings Rate
    newInsights.push({
      title: "Savings Rate",
      description: `You're saving ${savingsRate.toFixed(1)}% of your income. ${
        savingsRate >= 20
          ? "Great job! Keep it up!"
          : savingsRate >= 10
            ? "Good progress, aim for 20%!"
            : "Try to increase your savings rate!"
      }`,
      icon: <Target size={24} />,
      color: savingsRate >= 20 ? "green" : "amber",
    });

    // Insight 3: Balance Trend
    if (balanceTrend.length > 1) {
      const latestBalance = balanceTrend[balanceTrend.length - 1].balance;
      const previousBalance =
        balanceTrend[Math.max(0, balanceTrend.length - 2)].balance;
      const isIncreasing = latestBalance > previousBalance;

      newInsights.push({
        title: "Balance Trend",
        description: `Your balance has been ${isIncreasing ? "increasing" : "decreasing"}. Current balance: $${latestBalance.toFixed(2)}`,
        icon: <TrendingUp size={24} />,
        color: isIncreasing ? "green" : "amber",
      });
    }

    // Insight 4: Monthly Stats
    if (stats.totalExpenses > 0) {
      const averageExpense =
        stats.totalExpenses /
        transactions.filter((t) => t.type === "expense").length;
      newInsights.push({
        title: "Average Transaction",
        description: `Your average expense transaction is $${averageExpense.toFixed(2)}. Monitor unusual spikes!`,
        icon: <Zap size={24} />,
        color: "blue",
      });
    }

    setInsights(newInsights);
  }, [transactions]);

  const colorVariants = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900",
    amber:
      "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900",
    green:
      "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900",
    purple:
      "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-900",
  };

  const iconVariants = {
    blue: "text-blue-600 dark:text-blue-400",
    amber: "text-amber-600 dark:text-amber-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Insights & Observations
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Smart financial insights based on your transactions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl border-2 p-6 ${colorVariants[insight.color]}`}
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-lg p-3 ${colorVariants[insight.color]}`}>
                <div className={iconVariants[insight.color]}>
                  {insight.icon}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {insight.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {insight.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {insights.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            Add some transactions to see personalized insights!
          </p>
        </div>
      )}
    </div>
  );
}
