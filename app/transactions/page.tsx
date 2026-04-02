"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/store";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionModal } from "@/components/transactions/TransactionModal";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const userRole = useStore((state) => state.userRole);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
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
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        )}
      </div>

      <TransactionFilters />
      <TransactionTable />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  );
}
