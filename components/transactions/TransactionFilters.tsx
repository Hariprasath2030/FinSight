"use client";

import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";
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
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={() => {
              resetFilters();
              saveToLocalStorage();
            }}
            className="group relative overflow-hidden text-sm transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 px-3 py-1 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-black dark:hover:bg-slate-200"
          >
            <span className="relative z-10">Reset Filters</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by description or category..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            saveToLocalStorage();
          }}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value || null);
              saveToLocalStorage();
            }}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type
          </label>
          <select
            value={transactionType}
            onChange={(e) => {
              setTransactionType(e.target.value as any);
              saveToLocalStorage();
            }}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>
      </div>
    </div>
  );
}
