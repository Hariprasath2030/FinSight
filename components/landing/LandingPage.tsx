"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, BarChart3, Zap } from "lucide-react";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function LandingPage() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const theme = useStore((state) => state.theme);
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);
  const [showLogin, setShowLogin] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  useEffect(() => {
    if (isMounted && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isMounted, router]);

  if (!isMounted) {
    return null;
  }

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description:
        "Visualize your financial data with interactive charts and graphs",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Insights",
      description:
        "Get intelligent recommendations based on your spending patterns",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description:
        "See your financial status update instantly as you track expenses",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Budget Management",
      description: "Track income, expenses, and savings all in one place",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                FinSight
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4"
            >
              <button
                onClick={() => setShowLogin(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  showLogin
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  !showLogin
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                Sign Up
              </button>
            </motion.div>
          </div>
        </nav>

        <div className="pt-20">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight"
              >
                Take Control of Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Finances
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-slate-600 dark:text-slate-300 mt-6 leading-relaxed"
              >
                FinSight is a powerful financial dashboard that helps you track,
                analyze, and optimize your spending. Get actionable insights and
                take control of your money.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-8 flex gap-4">
                <div className="flex gap-2">
                  {["Track", "Analyze", "Optimize"].map((text, idx) => (
                    <motion.span
                      key={text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {text}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right - Auth Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="lg:sticky lg:top-32"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                {showLogin ? <LoginForm /> : <SignupForm />}
              </div>
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-slate-800/50 py-20"
          >
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                  Powerful Features
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Everything you need to manage your finances effectively
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white p-2.5 mb-4 group-hover:scale-110 transition-transform`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 py-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "10K+", label: "Active Users", icon: "👥" },
                { number: "99.9%", label: "Uptime", icon: "⚡" },
                { number: "100%", label: "Data Security", icon: "🔒" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="border-t border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-slate-900 py-12"
          >
            <div className="max-w-7xl mx-auto px-6 text-center text-slate-600 dark:text-slate-400">
              <p>
                &copy; 2024 FinSight. All rights reserved. | Built with ❤️ for
                financial freedom
              </p>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
