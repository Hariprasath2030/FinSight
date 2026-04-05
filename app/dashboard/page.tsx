"use client";

import { useEffect, useState } from "react";
import { TrendingUp, DollarSign, CreditCard, Target } from "lucide-react";
import { useStore } from "@/store";
import { calculateDashboardStats } from "@/lib/calculations";
import { StatCard } from "@/components/common/StatCard";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingCategoryChart } from "@/components/dashboard/SpendingCategoryChart";
import { motion, type Variants } from "framer-motion";
import { SkeletonCard, SkeletonChart } from "@/components/common/Skeleton";

export default function DashboardPage() {
  const transactions = useStore((state) => state.transactions);
  const userRole = useStore((state) => state.userRole);

  const [stats, setStats] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    savingsPercentage: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats(calculateDashboardStats(transactions));

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [transactions]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const getHeaderTitle = () => {
    if (userRole === "admin") {
      return "Admin Dashboard";
    }
    return "Viewer Dashboard";
  };

  const getHeaderDescription = () => {
    if (userRole === "admin") {
      return "Full access to analytics, reporting, and financial management tools.";
    }
    return "View your financial overview and analytics.";
  };

  function CountUp({
    end,
    duration = 2000,
    suffix = "",
  }: {
    end: number;
    duration?: number;
    suffix?: string;
  }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration]);

    return (
      <span>
        {end % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </span>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative space-y-10"
    >
      {/* Dashboard Header */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
          {getHeaderTitle()}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
          {getHeaderDescription()}
        </p>
      </motion.div>

      {/* Cards Section */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title="Total Balance"
              value={<CountUp end={stats.totalBalance} suffix="₹" />}
              icon={<DollarSign size={22} />}
              color="blue"
            />
            <StatCard
              title="Total Income"
              value={<CountUp end={stats.totalIncome} suffix="₹" />}
              icon={<TrendingUp size={22} />}
              color="green"
            />
            <StatCard
              title="Total Expenses"
              value={<CountUp end={stats.totalExpenses} suffix="₹" />}
              icon={<CreditCard size={22} />}
              color="red"
            />
            <StatCard
              title="Savings Rate"
              value={<CountUp end={stats.savingsPercentage} suffix="%" />}
              icon={<Target size={22} />}
              color="purple"
              isCurrency={false}
            />
          </>
        )}
      </motion.div>

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
          {loading ? (
            <>
              <SkeletonChart />
              <SkeletonChart />
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-4xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]"
              >
                <BalanceTrendChart />
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-4xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] backdrop-blur-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]"
              >
                <SpendingCategoryChart />
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
