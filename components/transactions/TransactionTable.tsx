"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store";
import { useTheme } from "next-themes";
import {
  filterTransactions,
  formatCurrency,
  formatDate,
} from "@/lib/calculations";
import { motion } from "framer-motion";

interface TransactionTableProps {
  onEdit?: (transaction: any) => void;
}

export function TransactionTable({ onEdit }: TransactionTableProps = {}) {
  const transactions = useStore((state) => state.transactions);
  const searchQuery = useStore((state) => state.searchQuery);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const transactionType = useStore((state) => state.transactionType);
  const userRole = useStore((state) => state.userRole);
  const currentPage = useStore((state) => state.currentPage);
  const itemsPerPage = useStore((state) => state.itemsPerPage);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const deleteTransaction = useStore((state) => state.deleteTransaction);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);
  const addToast = useStore((state) => state.addToast);
  const { theme } = useTheme();

  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [paginatedTransactions, setPaginatedTransactions] = useState<any[]>([]);

  useEffect(() => {
    const filtered = filterTransactions(
      transactions,
      searchQuery,
      selectedCategory,
      transactionType,
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, transactionType, transactions]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setPaginatedTransactions(filteredTransactions.slice(startIdx, endIdx));
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleDelete = (id: string, description: string) => {
    deleteTransaction(id);
    saveToLocalStorage();
    addToast(
      `Transaction "${description}" deleted successfully`,
      "success",
      3000,
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-500 bg-gradient-to-r dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 dark:text-white">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Type
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                Amount
              </th>
              {userRole === "admin" && (
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950"
                >
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-right text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>
                  {userRole === "admin" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit?.(transaction)}
                          className="group relative overflow-hidden rounded p-2 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Edit2 size={16} className="relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(
                              transaction.id,
                              transaction.description,
                            )
                          }
                          className="group relative overflow-hidden rounded p-2 text-red-600 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={16} className="relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={userRole === "admin" ? 6 : 5}
                  className="px-6 py-8 text-center text-gray-600 dark:text-gray-400"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing{" "}
            {paginatedTransactions.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to{" "}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)}{" "}
            of {filteredTransactions.length} results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`group relative overflow-hidden rounded-lg border p-2 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 ${
                theme === "light"
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              <ChevronLeft size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`group relative overflow-hidden rounded px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white shadow-lg"
                      : theme === "light"
                        ? "text-black hover:bg-black hover:text-white"
                        : "text-white hover:bg-white hover:text-black"
                  }`}
                >
                  <span className="relative z-10">{i + 1}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`group relative overflow-hidden rounded-lg border p-2 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 ${
                theme === "light"
                  ? "border-black text-black hover:bg-black hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              <ChevronRight size={20} className="relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
