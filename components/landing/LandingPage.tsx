"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import ShapeGrid from "@/components/ShapeGrid";

export function LandingPage() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const { theme, setTheme } = useTheme();
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

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!isMounted) return null;

  const isDark = theme === "dark";

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

  const stats = [
    { number: "10K+", label: "Active Users", icon: "👥" },
    { number: "99.9%", label: "Uptime", icon: "⚡" },
    { number: "100%", label: "Data Security", icon: "🔒" },
  ];

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          speed={0.57}
          squareSize={40}
          direction="diagonal"
          borderColor={isDark ? "#2a2a2a" : "#d1d5db"}
          hoverFillColor={isDark ? "#111111" : "#f3f4f6"}
          shape="hexagon"
          hoverTrailAmount={0}
          size={80}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white dark:bg-black border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
          <div className="px-6 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">FinSight</span>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="rounded-lg p-2 transition-all duration-300 hover:scale-110 active:scale-95 bg-black text-white dark:bg-white dark:text-black shadow-lg"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Login */}
              <button
                onClick={() => setShowLogin(true)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  showLogin
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                Login
              </button>

              {/* Signup */}
              <button
                onClick={() => setShowLogin(false)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  !showLogin
                    ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    : "bg-black text-white dark:bg-white dark:text-black"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              Take Control of Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Finances
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed"
            >
              FinSight helps you track, analyze, and optimize your spending with
              powerful insights and smart financial tools.
            </motion.p>

            <div className="mt-8 flex gap-2">
              {["Track", "Analyze", "Optimize"].map((text) => (
                <span
                  key={text}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Right Auth Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:sticky lg:top-32"
          >
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-white/10">
              {showLogin ? <LoginForm /> : <SignupForm />}
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to manage your finances effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white p-2.5 mb-4`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md py-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
            <p>
              © 2024 FinSight. All rights reserved. | Built with ❤️ for
              financial freedom
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
