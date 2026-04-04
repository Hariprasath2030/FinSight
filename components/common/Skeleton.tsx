"use client";

import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="space-y-3"
      >
        <div className="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-8 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-4 w-1/4 rounded bg-gray-300 dark:bg-gray-700" />
      </motion.div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="p-6">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-between gap-4"
            >
              <div className="h-4 flex-1 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
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
