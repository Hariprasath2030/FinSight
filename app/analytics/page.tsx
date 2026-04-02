"use client";

import { motion } from "framer-motion";
import {
  IncomExpenseChart,
  SavingsRateChart,
} from "@/components/analytics/Charts";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingCategoryChart } from "@/components/dashboard/SpendingCategoryChart";

const MotionDiv = motion.div as any;

export default function AnalyticsPage() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Comprehensive financial analysis and trends
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <IncomExpenseChart />
        <SavingsRateChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BalanceTrendChart />
        <SpendingCategoryChart />
      </div>
    </MotionDiv>
  );
}
