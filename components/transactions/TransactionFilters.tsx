"use client";

import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/store";
import { filterTransactions, getUniqueCategories } from "@/lib/calculations";

export function TransactionFilters() {
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const transactionType = useStore((state) => state.transactionType);
  const setTransactionType = useStore((state) => state.setTransactionType);
  const resetFilters = useStore((state) => state.resetFilters);
  const transactions = useStore((state) => state.transactions);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getUniqueCategories(transactions));
  }, [transactions]);

  const hasActiveFilters =
    searchQuery || selectedCategory || transactionType !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-black"
    >
      <div className="flex items-center justify-between ">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <motion.button
            onClick={() => {
              resetFilters();
              saveToLocalStorage();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
      className="px-4 py-2
      group relative
      rounded-2xl
      border border-black/10 dark:border-white/10
      bg-white/70 dark:bg-white/[0.05]
      backdrop-blur-2xl
      shadow-[0_8px_30px_rgba(0,0,0,0.08)]
      dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
      hover:scale-105
      hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
      dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.08)]
      active:scale-95
      transition-all duration-300
      flex items-center justify-center
      overflow-hidden
    "
            aria-label="Toggle theme"
          >
            <div
              className="
        absolute inset-0
        bg-gradient-to-r
        from-transparent
        via-white/20
        dark:via-white/10
        to-transparent
        -translate-x-full
        group-hover:translate-x-full
        transition-transform duration-1000
      "
            />
            <span className="relative z-10 flex items-center gap-1">
              <X size={16} /> Reset Filters
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </motion.button>
        )}
      </div>

      {/* Search */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by description or category..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            saveToLocalStorage();
          }}
          className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-black placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-black dark:text-white dark:placeholder-gray-400"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value || null);
              saveToLocalStorage();
            }}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-black dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <select
            value={transactionType}
            onChange={(e) => {
              setTransactionType(e.target.value as any);
              saveToLocalStorage();
            }}
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-black dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </motion.div>
      </div>
    </motion.div>
  );
}
