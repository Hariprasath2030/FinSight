"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div
      className="
        rounded-2xl
        border border-gray-900/40
        bg-black
        p-5 sm:p-6
        shadow-sm
      "
    >
      <motion.div
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex items-center justify-between"
      >
        <div className="space-y-4 flex-1">
        
          <div className="h-5 w-28 rounded-md bg-gray-900" />

          <div className="h-10 w-36 rounded-md bg-gray-900" />
        </div>

        <div
          className="
            h-14 w-14 sm:h-16 sm:w-16
            rounded-2xl
            bg-gray-900
          "
        />
      </motion.div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-black overflow-hidden">
      <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        {["Date", "Description", "Category", "Type", "Amount"].map((_, i) => (
          <div
            key={i}
            className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700"
          />
        ))}
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="grid grid-cols-5 gap-4 px-6 py-4 items-center"
          >
            <div className="h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="h-4 w-40 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="h-6 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />

            <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-700" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function InsightsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-800"
        ></div>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative h-80 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"
      >
        {/* Optional: you can add a pseudo "line" effect with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg" />
      </motion.div>
    </div>
  );
}
