"use client";

import { useEffect, useState } from "react";
import { Plus, Download, Database } from "lucide-react";
import { useStore } from "@/store";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionModal } from "@/components/transactions/TransactionModal";
import { motion } from "framer-motion";
import { SkeletonTable } from "@/components/common/Skeleton";

export default function TransactionsPage() {
  const userRole = useStore((state) => state.userRole);
  const transactions = useStore((state) => state.transactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Export Handlers
  const handleExportJSON = () => {
    const data = {
      transactions,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `finsight-export-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount.toString(),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const dataBlob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `finsight-export-${new Date().getTime()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative space-y-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and track your financial transactions
          </p>
        </div>
        {userRole === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-4 gap-2
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
            <Plus size={20} />
            Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-black"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
          <Download size={24} /> Export Data
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Download your financial data in different formats
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-gradient-to-r from-white via-gray-50 to-white px-6 py-3 font-medium text-gray-900 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-gray-950 dark:via-gray-950 dark:to-black dark:text-white dark:border-gray-700"
          >
            <Database size={20} />
            Export JSON
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-gradient-to-r from-white via-gray-50 to-white px-6 py-3 font-medium text-gray-900 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:from-gray-950 dark:via-gray-950 dark:to-black dark:text-white dark:border-gray-700"
          >
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </motion.div>
      {loading ? <SkeletonTable /> : <TransactionTable onEdit={handleEdit} />}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTransaction={editingTransaction}
      />
    </motion.div>
  );
}
