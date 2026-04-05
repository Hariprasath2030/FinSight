"use client";

import { motion } from "framer-motion";
import {
  IncomExpenseChart,
  SavingsRateChart,
} from "@/components/analytics/Charts";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingCategoryChart } from "@/components/dashboard/SpendingCategoryChart";
import { useState, useEffect } from "react";
import { SkeletonChart } from "@/components/common/Skeleton";

const MotionDiv = motion.div as any;

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Comprehensive financial analysis and trends
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="w-full overflow-hidden rounded-2xl">
          {loading ? <SkeletonChart /> : <IncomExpenseChart />}
        </div>

        <div className="w-full overflow-hidden rounded-2xl">
          {loading ? <SkeletonChart /> : <SavingsRateChart />}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="w-full overflow-hidden rounded-2xl">
          {loading ? <SkeletonChart /> : <BalanceTrendChart />}
        </div>
        <div className="w-full overflow-hidden rounded-2xl">
          {loading ? <SkeletonChart /> : <SpendingCategoryChart />}
        </div>
      </div>
    </MotionDiv>
  );
}
