"use client";

import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, CreditCard, Target } from "lucide-react";
import { useStore } from "@/store";
import { calculateDashboardStats } from "@/lib/calculations";
import { StatCard } from "@/components/common/StatCard";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingCategoryChart } from "@/components/dashboard/SpendingCategoryChart";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const transactions = useStore((state) => state.transactions);

  const [stats, setStats] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    savingsPercentage: 0,
  });

  useEffect(() => {
    setStats(calculateDashboardStats(transactions));
  }, [transactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative space-y-10"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
        <div className="absolute right-20 bottom-10 h-72 w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <motion.div variants={fadeUp}>
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-2">
          Finance Dashboard
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Monitor your balance, income, expenses, and financial growth in real
          time.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard
          title="Total Balance"
          value={stats.totalBalance}
          icon={<DollarSign size={22} />}
          color="blue"
        />

        <StatCard
          title="Total Income"
          value={stats.totalIncome}
          icon={<TrendingUp size={22} />}
          color="green"
        />

        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={<CreditCard size={22} />}
          color="red"
        />

        <StatCard
          title="Savings Rate"
          value={stats.savingsPercentage}
          icon={<Target size={22} />}
          color="purple"
          isCurrency={false}
        />
      </motion.div>

      {/* Charts section */}
      <motion.div variants={fadeUp}>
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-black dark:text-white">
            Financial Insights
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visual representation of your balance trends and spending categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="
              rounded-3xl
              border border-black/10 dark:border-white/10
              bg-white/80 dark:bg-white/[0.03]
              backdrop-blur-2xl
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]
            "
          >
            <BalanceTrendChart />
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="
              rounded-3xl
              border border-black/10 dark:border-white/10
              bg-white/80 dark:bg-white/[0.03]
              backdrop-blur-2xl
              p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]
            "
          >
            <SpendingCategoryChart />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
