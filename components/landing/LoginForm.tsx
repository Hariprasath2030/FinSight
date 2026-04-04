"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { UserRole } from "@/types";

export function LoginForm() {
  const login = useStore((state) => state.login);
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [selectedRole, setSelectedRole] = useState<UserRole>("viewer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      login(email, password, selectedRole);
    } catch (err) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Sign in to your FinSight account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["viewer", "admin"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role as UserRole)}
                  className={`group relative overflow-hidden p-3 rounded-lg border-2 font-medium transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                    selectedRole === role
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-lg"
                      : theme === "light"
                        ? "border-black bg-black text-white hover:bg-gray-800 hover:shadow-xl"
                        : "border-white bg-white text-black hover:bg-gray-200 hover:shadow-xl"
                  }`}
                >
                  <span className="relative z-10">
                    {role === "viewer" ? "👁️ Viewer" : "⚙️ Admin"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {selectedRole === "viewer"
                ? "View-only access to dashboards and reports"
                : "Full control including add/edit/delete transactions"}
            </p>
          </div>

          {/* Submit Button */}
          <button
            disabled={isLoading}
            className={`group relative overflow-hidden w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
            onClick={handleSubmit}
          >
            <div className="w-full flex items-center justify-center gap-2 relative z-10">
              {isLoading ? (
                <div className="w-5 h-5 animate-spin border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </button>

          {/* Demo Credentials */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-700 dark:text-blue-400">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
