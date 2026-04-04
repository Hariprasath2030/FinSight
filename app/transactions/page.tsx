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
  const [editingTransaction, setEditingTransaction] = useState<any>(null);

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

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
            className="group relative overflow-hidden flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:bg-blue-700 shadow-lg hover:shadow-xl"
          >
            <Plus size={20} className="relative z-10" />
            <span className="relative z-10">Add Transaction</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </button>
        )}
      </div>

      <TransactionFilters />
      <TransactionTable onEdit={handleEdit} />

      <TransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingTransaction={editingTransaction}
      />
    </motion.div>
  );
}
