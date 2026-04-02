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
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Summary Cards */}
      <div>
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={stats.totalBalance}
            icon={<DollarSign size={24} />}
            color="blue"
          />
          <StatCard
            title="Total Income"
            value={stats.totalIncome}
            icon={<TrendingUp size={24} />}
            color="green"
          />
          <StatCard
            title="Total Expenses"
            value={stats.totalExpenses}
            icon={<CreditCard size={24} />}
            color="red"
          />
          <StatCard
            title="Savings Rate"
            value={stats.savingsPercentage}
            icon={<Target size={24} />}
            color="purple"
            isCurrency={false}
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BalanceTrendChart />
        <SpendingCategoryChart />
      </div>
    </motion.div>
  );
}
