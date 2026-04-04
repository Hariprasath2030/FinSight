"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useStore } from "@/store";
import { Transaction } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTransaction?: Transaction;
}

export function TransactionModal({
  isOpen,
  onClose,
  editingTransaction,
}: TransactionModalProps) {
  const addTransaction = useStore((state) => state.addTransaction);
  const editTransaction = useStore((state) => state.editTransaction);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);

  const [formData, setFormData] = useState({
    date: editingTransaction?.date || new Date().toISOString().split("T")[0],
    description: editingTransaction?.description || "",
    amount: editingTransaction?.amount || 0,
    category: editingTransaction?.category || "Food",
    type: (editingTransaction?.type || "expense") as "income" | "expense",
  });

  useEffect(() => {
    setFormData({
      date: editingTransaction?.date || new Date().toISOString().split("T")[0],
      description: editingTransaction?.description || "",
      amount: editingTransaction?.amount || 0,
      category: editingTransaction?.category || "Food",
      type: (editingTransaction?.type || "expense") as "income" | "expense",
    });
  }, [editingTransaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTransaction) editTransaction(editingTransaction.id, formData);
    else addTransaction(formData);
    saveToLocalStorage();
    onClose();
    setFormData({
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      category: "Food",
      type: "expense",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-black border border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingTransaction ? "Edit" : "Add"} Transaction
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-full p-2 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/** Inputs with floating labels effect **/}
              {["date", "description", "amount", "category"].map((field) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay:
                      0.1 *
                      (["date", "description", "amount", "category"].indexOf(
                        field,
                      ) +
                        1),
                  }}
                  className="relative"
                >
                  <label
                    htmlFor={field}
                    className="absolute -top-2 left-3 bg-white dark:bg-gray-900 px-1 text-xs font-medium text-gray-500 dark:text-gray-300 transition-all duration-300"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type={
                      field === "amount"
                        ? "number"
                        : field === "date"
                          ? "date"
                          : "text"
                    }
                    step={field === "amount" ? 0.01 : undefined}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]:
                          field === "amount"
                            ? parseFloat(e.target.value)
                            : e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />
                </motion.div>
              ))}

              {/* Type select */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "income" | "expense",
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </motion.div>

              {/* Buttons */}
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 flex-1 rounded-xl border-2 border-black bg-black text-white font-medium shadow-lg transition-all duration-300 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 gap-2
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
                  {editingTransaction ? "Update Transaction" : "Add Transaction"}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
