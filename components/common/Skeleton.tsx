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
        className="flex items-end justify-between gap-2"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-${[12, 16, 20, 24, 28, 32][Math.floor(Math.random() * 6)]} w-full rounded-lg bg-gray-300 dark:bg-gray-700`}
          />
        ))}
      </motion.div>
    </div>
  );
}
