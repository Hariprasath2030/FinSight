"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useStore } from "@/store";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
}

export function Toast() {
  const toasts = useStore((state) => state.toasts);
  const removeToast = useStore((state) => state.removeToast);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, toasts[0].duration || 4000);

      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30";
      case "error":
        return "bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30";
      case "info":
      default:
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30";
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: -(index * 80),
              scale: 1,
            }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="pointer-events-auto mb-3"
          >
            <div
              className={`
                px-6 py-4 rounded-2xl backdrop-blur-xl
                bg-white/80 dark:bg-black/60
                shadow-xl dark:shadow-2xl
                flex items-center gap-4
                max-w-md
                ${getBackgroundStyle(toast.type)}
              `}
            >
              <div className="flex-shrink-0">{getIcon(toast.type)}</div>
              <p className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
