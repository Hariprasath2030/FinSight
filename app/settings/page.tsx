"use client";

import { useEffect, useState } from "react";
import { Download, Moon, Sun, Database } from "lucide-react";
import { useStore } from "@/store";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const userRole = useStore((state) => state.userRole);
  const setUserRole = useStore((state) => state.setUserRole);
  const transactions = useStore((state) => state.transactions);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleThemeChange = () => {
    toggleTheme();
    setTimeout(() => saveToLocalStorage(), 0);
  };

  const handleRoleChange = (newRole: "viewer" | "admin") => {
    setUserRole(newRole);
    setTimeout(() => saveToLocalStorage(), 0);
  };

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

  if (!isMounted) {
    return <div className="text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your preferences and account settings
        </p>
      </div>

      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
          {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
          Theme
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Customize your visual experience
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={handleThemeChange}
            className={`rounded-lg border-2 p-4 text-center transition-colors ${
              theme === "light"
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <div className="mb-2 flex justify-center">
              <Sun size={32} className="text-yellow-500" />
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              Light Mode
            </p>
          </button>

          <button
            onClick={handleThemeChange}
            className={`rounded-lg border-2 p-4 text-center transition-colors ${
              theme === "dark"
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <div className="mb-2 flex justify-center">
              <Moon size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <p className="font-medium text-gray-900 dark:text-white">
              Dark Mode
            </p>
          </button>
        </div>
      </motion.div>

      {/* Role Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          User Role
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Switch between Viewer and Admin roles
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => handleRoleChange("viewer")}
            className={`rounded-lg border-2 p-4 text-center transition-colors ${
              userRole === "viewer"
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <p className="font-medium text-gray-900 dark:text-white">Viewer</p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              View-only access
            </p>
          </button>

          <button
            onClick={() => handleRoleChange("admin")}
            className={`rounded-lg border-2 p-4 text-center transition-colors ${
              userRole === "admin"
                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            <p className="font-medium text-gray-900 dark:text-white">Admin</p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Full editing access
            </p>
          </button>
        </div>
      </motion.div>

      {/* Export Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
          <Download size={24} />
          Export Data
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Download your financial data in different formats
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Database size={20} />
            Export JSON
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </motion.div>

      {/* Data Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Data Summary
        </h2>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Transactions:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {transactions.length}
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Data stored in:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              Browser Local Storage
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            Your data is stored locally in your browser and will persist across
            sessions.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
