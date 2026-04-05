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
import { InsightsSkeleton } from "../common/Skeleton";

interface Insight {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "amber" | "green" | "purple";
  progress?: number;
}

export function InsightsModule() {
  const transactions = useStore((state) => state.transactions);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const stats = calculateDashboardStats(transactions);
      const topCategory = getHighestSpendingCategory(transactions);
      const savingsRate = getSavingsRate(transactions);
      const categorySpending = getCategorySpending(transactions);
      const balanceTrend = getBalanceTrend(transactions);

      const newInsights: Insight[] = [];

      if (topCategory && topCategory !== "N/A") {
        const topCategoryAmount = categorySpending[0]?.value || 0;
        newInsights.push({
          title: "Top Spending Category",
          description: `${topCategory} is your highest expense at $${topCategoryAmount.toFixed(
            2,
          )} (${categorySpending[0]?.percentage.toFixed(1)}%)`,
          icon: <AlertCircle size={24} className="animate-bounce" />,
          color: "amber",
          progress: categorySpending[0]?.percentage || 0,
        });
      }

      newInsights.push({
        title: "Savings Rate",
        description: `You're saving ${savingsRate.toFixed(1)}% of your income. ${
          savingsRate >= 20
            ? "Great job! Keep it up!"
            : savingsRate >= 10
              ? "Good progress, aim for 20%!"
              : "Try to increase your savings rate!"
        }`,
        icon: <Target size={24} className="animate-bounce" />,
        color: savingsRate >= 20 ? "green" : "amber",
        progress: savingsRate,
      });

      if (balanceTrend.length > 1) {
        const latestBalance = balanceTrend[balanceTrend.length - 1].balance;
        const previousBalance =
          balanceTrend[Math.max(0, balanceTrend.length - 2)].balance;
        const isIncreasing = latestBalance > previousBalance;

        newInsights.push({
          title: "Balance Trend",
          description: `Your balance has been ${isIncreasing ? "increasing" : "decreasing"}. Current balance: $${latestBalance.toFixed(
            2,
          )}`,
          icon: <TrendingUp size={24} className="animate-bounce" />,
          color: isIncreasing ? "green" : "amber",
        });
      }

      if (stats.totalExpenses > 0) {
        const averageExpense =
          stats.totalExpenses /
          transactions.filter((t) => t.type === "expense").length;
        newInsights.push({
          title: "Average Transaction",
          description: `Your average expense transaction is $${averageExpense.toFixed(
            2,
          )}. Monitor unusual spikes!`,
          icon: <Zap size={24} className="animate-bounce" />,
          color: "blue",
        });
      }

      setInsights(newInsights);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
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

      {loading ? (
        <InsightsSkeleton />
      ) : insights.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            Add some transactions to see personalized insights!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
              }}
              className={`rounded-xl border-2 p-6 ${colorVariants[insight.color]} transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className={`rounded-lg p-3 flex items-center justify-center ${colorVariants[insight.color]}`}
                >
                  <div className={iconVariants[insight.color]}>
                    {insight.icon}
                  </div>
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {insight.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {insight.description}
                  </p>
                  {insight.progress !== undefined && (
                    <div className="mt-3 w-full bg-gray-200 h-2 rounded-full dark:bg-gray-700">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(insight.progress, 100)}%`,
                        }}
                        transition={{ duration: 1.2 }}
                        className={`h-2 rounded-full ${
                          insight.color === "blue"
                            ? "bg-blue-600 dark:bg-blue-400"
                            : insight.color === "green"
                              ? "bg-green-600 dark:bg-green-400"
                              : insight.color === "amber"
                                ? "bg-amber-600 dark:bg-amber-400"
                                : "bg-purple-600 dark:bg-purple-400"
                        }`}
                      ></motion.div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {insights.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
              <p className="text-gray-600 dark:text-gray-400">
                Add some transactions to see personalized insights!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
