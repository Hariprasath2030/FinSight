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
  const addToast = useStore((state) => state.addToast);
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
    addToast(
      `Exported ${transactions.length} transaction(s) as JSON`,
      "success",
      3000,
    );
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
    addToast(
      `Exported ${transactions.length} transaction(s) as CSV`,
      "success",
      3000,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative space-y-6 sm:space-y-8 lg:space-y-10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage and track your financial transactions
          </p>
        </div>

        {userRole === "admin" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="
          w-full sm:w-auto
          px-4 py-3 sm:py-4
          gap-2
          group relative
          rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
          hover:scale-[1.02]
          active:scale-95
          transition-all duration-300
          flex items-center justify-center
          overflow-hidden
        "
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
            <Plus size={18} />
            <span className="text-sm sm:text-base">Add Transaction</span>
          </button>
        )}
      </div>

      <TransactionFilters />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="
      rounded-2xl
      border border-gray-200 dark:border-gray-800
      bg-white dark:bg-black
      p-4 sm:p-6
      shadow-md
    "
      >
        <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          <Download size={22} />
          Export Data
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Download your financial data in different formats
        </p>

        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
          <button
            onClick={handleExportJSON}
            className="
          w-full
          flex items-center justify-center gap-2
          rounded-xl
          border-2 border-gray-300 dark:border-gray-700
          px-4 py-3
          text-sm sm:text-base
          font-medium
          text-gray-900 dark:text-white
          bg-gradient-to-r from-white via-gray-50 to-white
          dark:from-gray-950 dark:via-gray-950 dark:to-black
          shadow-md
          transition-all duration-300
          hover:scale-[1.02]
        "
          >
            <Database size={18} />
            Export JSON
          </button>

          <button
            onClick={handleExportCSV}
            className="
          w-full
          flex items-center justify-center gap-2
          rounded-xl
          border-2 border-gray-300 dark:border-gray-700
          px-4 py-3
          text-sm sm:text-base
          font-medium
          text-gray-900 dark:text-white
          bg-gradient-to-r from-white via-gray-50 to-white
          dark:from-gray-950 dark:via-gray-950 dark:to-black
          shadow-md
          transition-all duration-300
          hover:scale-[1.02]
        "
          >
            <Download size={18} />
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
