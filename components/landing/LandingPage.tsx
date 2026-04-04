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
  X,
  LogIn,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import ShapeGrid from "@/components/ShapeGrid";

export function LandingPage() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const { resolvedTheme, setTheme } = useTheme();
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  if (!isMounted) return null;

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
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          speed={0.24}
          squareSize={80}
          direction="diagonal"
          borderColor={resolvedTheme === "dark" ? "#4b5563" : "#cbd5e1"}
          hoverFillColor={resolvedTheme === "dark" ? "#1f2937" : "#e5e7eb"}
          shape="hexagon"
          hoverTrailAmount={0}
        />
      </div>

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
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
                className="
      group relative
      h-10 w-10
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

                {/* Icon */}
                <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
                  {resolvedTheme === "light" ? (
                    <Moon className="w-4 h-4 text-slate-700" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-400 drop-shadow-md" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="
    group relative overflow-hidden
    flex items-center gap-2
    px-5 py-3
    rounded-2xl
    border border-black/10 dark:border-white/10
    bg-white text-black
    dark:bg-white/10 dark:text-white
    backdrop-blur-2xl
    shadow-[0_10px_30px_rgba(0,0,0,0.08)]
    dark:shadow-[0_10px_30px_rgba(255,255,255,0.05)]
    hover:scale-105
    hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]
    dark:hover:shadow-[0_14px_40px_rgba(255,255,255,0.08)]
    active:scale-95
    transition-all duration-300
  "
                aria-label="Open login"
              >
                {/* Shine effect */}
                <div
                  className="
      absolute inset-0
      bg-gradient-to-r
      from-transparent
      via-black/5
      dark:via-white/10
      to-transparent
      -translate-x-full
      group-hover:translate-x-full
      transition-transform duration-1000
    "
                />

                <LogIn className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="relative z-10 font-medium tracking-wide">
                  Login
                </span>
              </button>
            </div>
          </div>
        </nav>
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              Take Control of Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Financial Future
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mt-6 leading-relaxed max-w-xl"
            >
              Smart budgeting, intelligent insights, real-time expense tracking,
              and AI-powered savings recommendations — all in one platform.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Track", "Analyze", "Save", "Invest"].map((text) => (
                <span
                  key={text}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {text}
                </span>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>

              <button className="px-6 py-3 rounded-2xl border border-gray-300 dark:border-white/10">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-white/90 dark:bg-black/70 border border-gray-200 dark:border-white/10 p-8 backdrop-blur-xl shadow-2xl">
              <div className="space-y-5">
                <div className="h-6 w-40 bg-blue-500 rounded-lg" />
                <div className="h-28 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 rounded-2xl bg-gray-100 dark:bg-white/5" />
                  <div className="h-24 rounded-2xl bg-gray-100 dark:bg-white/5" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
        </section>
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
        <section className="relative py-24 border-t border-white/10 bg-black overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
                backgroundSize: "28px 28px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT SIDE */}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl mb-8">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">Contact us</h2>

              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                We are always looking for ways to improve our platform and
                financial services. Contact us and let us know how we can help
                you achieve financial freedom.
              </p>

              <div className="mt-10 flex flex-wrap gap-6 text-gray-400 text-sm">
                <span>support@finsight.ai</span>
                <span>•</span>
                <span>+91 98765 43210</span>
                <span>•</span>
                <span>hello@finsight.ai</span>
              </div>

              {/* Location box */}
              <div className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <p className="text-sm text-gray-400 mb-2">We are here</p>
                <h4 className="text-xl font-semibold text-white">
                  Pune, India
                </h4>
                <p className="text-gray-500 mt-2">
                  Helping users manage smarter finances globally.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <label className="text-white font-medium block mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-white font-medium block mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-white font-medium block mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="FinSight Pvt Ltd"
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-white font-medium block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Type your message here"
                    className="w-full rounded-2xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:border-blue-500"
                  />
                </div>

                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl">
                  Send Message
                </button>
              </div>
            </div>
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

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
        relative w-full max-w-4xl mx-4
        rounded-3xl overflow-hidden
        border border-white/10
        bg-white/90 dark:bg-black/80
        backdrop-blur-xl
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <LoginForm onClose={() => setIsModalOpen(false)} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
