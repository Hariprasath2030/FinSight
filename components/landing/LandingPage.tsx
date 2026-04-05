"use client";

import { useEffect, useState, useRef } from "react";
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
  Linkedin,
  Twitter,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoginForm } from "./LoginForm";
import ShapeGrid from "@/components/ShapeGrid";
import { TextGenerateEffect } from "../TextGenerateEffect";

export function LandingPage() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const addToast = useStore((state) => state.addToast);
  const { resolvedTheme, setTheme } = useTheme();
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

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

  const handleLearnMore = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.email || !formData.message) {
      addToast("Please fill in all required fields", "error", 3000);
      return;
    }

    // Show success toast
    addToast(
      "Message sent successfully! Our team will contact you soon.",
      "success",
      4000,
    );

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      company: "",
      message: "",
    });
  };

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
    { value: 10000, suffix: "+", label: "Active Users", icon: "👥" },
    { value: 99.9, suffix: "%", label: "Uptime", icon: "⚡" },
    { value: 100, suffix: "%", label: "Data Security", icon: "🔒" },
  ];
  function CountUp({
    end,
    duration = 2000,
    suffix = "",
  }: {
    end: number;
    duration?: number;
    suffix?: string;
  }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;

        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration]);

    return (
      <span>
        {end % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </span>
    );
  }

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          speed={0.2}
          squareSize={100}
          direction="diagonal"
          borderColor={resolvedTheme === "dark" ? "#4b5563" : "#cbd5e1"}
          hoverFillColor={resolvedTheme === "dark" ? "#1f2937" : "#e5e7eb"}
          shape="hexagon"
          hoverTrailAmount={0}
        />
      </div>

      <div className="relative z-10">
        <nav
          className="
    fixed top-0 w-full z-50
    backdrop-blur-md
    bg-white dark:bg-black
    border-b border-gray-200 dark:border-white/10
    transition-colors duration-300
  "
        >
          <div
            className="
      px-4 sm:px-6 lg:px-8
      py-3 sm:py-4
      flex items-center justify-between
    "
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div
                className="
          flex h-9 w-9 sm:h-11 sm:w-11
          items-center justify-center
          rounded-xl sm:rounded-2xl
          border border-black/10 dark:border-white/10
          bg-black text-white
          dark:bg-white dark:text-black
          backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          dark:shadow-[0_8px_30px_rgba(255,255,255,0.08)]
          transition-all duration-300
          hover:scale-105
        "
              >
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="flex flex-col leading-tight">
                <span
                  className="
            text-lg sm:text-xl lg:text-2xl
            font-bold tracking-tight
            text-black dark:text-white
          "
                >
                  FinSight
                </span>

                <span
                  className="
            hidden sm:block
            text-[10px] sm:text-xs
            text-gray-500 dark:text-gray-400
            font-medium
            tracking-[0.2em]
            uppercase
          "
                >
                  Finance Intelligence
                </span>
              </div>
            </motion.div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
                className="
          group relative
          h-9 w-9 sm:h-10 sm:w-10
          rounded-xl sm:rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
          hover:scale-105
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

                <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
                  {resolvedTheme === "light" ? (
                    <Moon className="w-4 h-4 text-slate-700" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="
          group relative overflow-hidden
          flex items-center gap-2
          px-3 sm:px-5
          py-2 sm:py-3
          rounded-xl sm:rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white text-black
          dark:bg-white/10 dark:text-white
          backdrop-blur-2xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          dark:shadow-[0_10px_30px_rgba(255,255,255,0.05)]
          hover:scale-105
          active:scale-95
          transition-all duration-300
        "
                aria-label="Open login"
              >
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

                <LogIn className="relative z-10 w-4 h-4" />

                <span
                  className="
            relative z-10
            text-sm sm:text-base
            font-medium tracking-wide
          "
                >
                  Login
                </span>
              </button>
            </div>
          </div>
        </nav>
        <section
          className="
    max-w-7xl mx-auto
    px-4 sm:px-6 lg:px-6
    pt-48 sm:pt-32 lg:pt-56
    pb-12 sm:pb-16 lg:pb-20
  "
        >
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
        max-w-7xl
        text-4xl sm:text-5xl lg:text-7xl
        font-bold
        leading-tight sm:leading-[1.05]
        tracking-tight
      "
            >
              <TextGenerateEffect
                words="Take Control of Your Financial Future"
                className="
          text-4xl sm:text-5xl lg:text-7xl
          font-bold
          leading-tight sm:leading-[1.05]
          tracking-tight
          text-black dark:text-white
        "
              />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="
        mt-5 sm:mt-6
        max-w-3xl
        px-2 sm:px-0
        text-sm sm:text-lg lg:text-xl
        leading-relaxed
        text-gray-600 dark:text-gray-400
      "
            >
              Smart budgeting, intelligent insights, real-time expense tracking,
              and AI-powered savings recommendations — all in one premium
              finance platform.
            </motion.p>

            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {["Track", "Analyze", "Save", "Invest"].map((text) => (
                <span
                  key={text}
                  className="
            px-3 sm:px-4
            py-1.5 sm:py-2
            rounded-full
            text-xs sm:text-sm
            font-medium
            border border-black/10 dark:border-white/10
            bg-white/70 dark:bg-white/5
            backdrop-blur-xl
            text-gray-800 dark:text-gray-300
            shadow-sm
          "
                >
                  {text}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="
          px-6 py-3 rounded-2xl
          bg-black text-white
          dark:bg-white dark:text-black
          font-semibold
          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
          dark:shadow-[0_10px_30px_rgba(255,255,255,0.08)]
          hover:scale-105
          transition-all duration-300
        "
              >
                Get Started
              </button>

              <button
                className="
          px-6 py-3 rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white/60 dark:bg-white/5
          backdrop-blur-xl
          text-black dark:text-white
          hover:scale-105
          transition-all duration-300
        "
                onClick={handleLearnMore}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
        <section
          className="relative py-16 sm:py-20 lg:py-28 overflow-hidden"
          ref={featuresRef}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/4 h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
            <div className="absolute bottom-10 right-1/4 h-40 w-40 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14 lg:mb-16">
              <p
                className="
          text-xs sm:text-sm
          uppercase
          tracking-[0.2em] sm:tracking-[0.3em]
          text-gray-500 dark:text-gray-400
          mb-3 sm:mb-4
        "
              >
                Premium Features
              </p>

              <h2
                className="
          text-2xl sm:text-4xl lg:text-5xl
          font-bold
          tracking-tight
        "
              >
                Powerful Finance Experience
              </h2>

              <p
                className="
          text-sm sm:text-base lg:text-lg
          text-gray-600 dark:text-gray-400
          mt-4 sm:mt-5
          max-w-3xl
          mx-auto
          leading-relaxed
        "
              >
                Everything you need to track expenses, monitor investments,
                optimize budgets, and unlock intelligent financial insights in
                one beautifully designed platform.
              </p>
            </div>

            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 55,
                  ease: "linear",
                }}
                className="flex gap-4 sm:gap-6 w-max"
              >
                {[...features, ...features].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="
              min-w-[240px]
              sm:min-w-[280px]
              lg:min-w-[320px]
              rounded-2xl sm:rounded-3xl
              border border-black/10 dark:border-white/10
              bg-white/80 dark:bg-white/[0.03]
              backdrop-blur-2xl
              p-5 sm:p-6 lg:p-7
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]
              transition-all duration-300
            "
                  >
                    <div
                      className="
                w-12 h-12 sm:w-14 sm:h-14
                rounded-xl sm:rounded-2xl
                flex items-center justify-center
                border border-black/10 dark:border-white/10
                bg-black text-white
                dark:bg-white dark:text-black
                shadow-lg
                mb-4 sm:mb-5
              "
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                      {feature.title}
                    </h3>

                    <p
                      className="
                text-sm sm:text-base
                text-gray-600 dark:text-gray-400
                leading-relaxed
              "
                    >
                      {feature.description}
                    </p>

                    <div className="mt-5 sm:mt-6 flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                        Real-time powered
                      </span>

                      <div className="h-2 w-2 rounded-full bg-black dark:bg-white animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        <section className="relative py-10 sm:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-10 h-32 w-32 sm:h-48 sm:w-48 lg:h-60 lg:w-60 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
            <div className="absolute right-1/4 bottom-10 h-32 w-32 sm:h-48 sm:w-48 lg:h-60 lg:w-60 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <p
                className="
          text-xs sm:text-sm
          uppercase
          tracking-[0.2em] sm:tracking-[0.3em]
          text-gray-500 dark:text-gray-400
          mb-3 sm:mb-4
        "
              >
                Performance Metrics
              </p>

              <h2
                className="
          text-2xl sm:text-4xl lg:text-5xl
          font-bold
          tracking-tight
        "
              >
                Trusted by Thousands
              </h2>

              <p
                className="
          mt-3 sm:mt-4
          text-sm sm:text-base lg:text-lg
          text-gray-600 dark:text-gray-400
          max-w-3xl
          mx-auto
          leading-relaxed
        "
              >
                Our platform continues to deliver reliable performance,
                security, and real-time insights for users worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.15,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="
            rounded-2xl sm:rounded-3xl
            border border-black/10 dark:border-white/10
            bg-white/80 dark:bg-white/[0.03]
            backdrop-blur-2xl
            p-5 sm:p-6 lg:p-8
            text-center
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]
            transition-all duration-300
          "
                >
                  <div
                    className="
              mx-auto mb-4 sm:mb-5
              flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16
              items-center justify-center
              rounded-xl sm:rounded-2xl
              border border-black/10 dark:border-white/10
              bg-black text-white
              dark:bg-white dark:text-black
              text-xl sm:text-2xl
              shadow-lg
            "
                  >
                    {stat.icon}
                  </div>

                  <h3
                    className="
              text-3xl sm:text-4xl lg:text-5xl
              font-bold
              tracking-tight
              mb-2 sm:mb-3
            "
                  >
                    <CountUp
                      end={stat.value}
                      duration={1800}
                      suffix={stat.suffix}
                    />
                  </h3>

                  <p
                    className="
              text-sm sm:text-base lg:text-lg
              font-medium
              text-gray-600 dark:text-gray-400
            "
                  >
                    {stat.label}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-black/5 dark:border-white/5">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                      Updated in real-time
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="relative py-10 sm:py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/4 h-32 w-32 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
            <div className="absolute bottom-10 right-1/4 h-32 w-32 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
          linear-gradient(to right, rgba(120,120,120,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(120,120,120,0.08) 1px, transparent 1px)
        `,
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          <div
            className="
      relative z-10
      max-w-7xl mx-auto
      px-4 sm:px-6 lg:px-8
      grid grid-cols-1 lg:grid-cols-2
      gap-8 sm:gap-10 lg:gap-16
      items-start
    "
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="
          w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
          rounded-2xl sm:rounded-3xl
          bg-white/70 dark:bg-white/5
          border border-black/10 dark:border-white/10
          backdrop-blur-2xl
          flex items-center justify-center
          shadow-xl
          mb-6 sm:mb-8
        "
              >
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
              </div>

              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                Contact
              </p>

              <h2
                className="
          text-3xl sm:text-4xl lg:text-6xl
          font-bold
          tracking-tight
          text-black dark:text-white
          mb-4 sm:mb-6
        "
              >
                Let’s talk
              </h2>

              <p
                className="
          text-sm sm:text-base lg:text-lg
          text-gray-600 dark:text-gray-400
          leading-relaxed
          max-w-lg
        "
              >
                We’re always looking for ways to improve the platform and help
                users achieve smarter financial freedom. Reach out anytime.
              </p>

              <div
                className="
          mt-6 sm:mt-10
          flex flex-col sm:flex-row
          flex-wrap
          gap-2 sm:gap-4
          text-sm
          text-gray-600 dark:text-gray-400
        "
              >
                <span>support@finsight.ai</span>
                <span className="hidden sm:block">•</span>
                <span>+91 98765 43210</span>
                <span className="hidden sm:block">•</span>
                <span>Pune, India</span>
              </div>

              <div
                className="
          mt-8 sm:mt-12 lg:mt-16
          rounded-2xl sm:rounded-3xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.03]
          backdrop-blur-2xl
          p-5 sm:p-6 lg:p-8
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)]
        "
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Our office
                </p>

                <h4 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
                  Bangalore, India
                </h4>

                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">
                  Serving users globally with secure finance tools.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
        rounded-3xl
        border border-black/10 dark:border-white/10
        bg-white/80 dark:bg-white/[0.03]
        backdrop-blur-2xl
        p-5 sm:p-6 lg:p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        dark:shadow-[0_20px_60px_rgba(255,255,255,0.04)]
      "
            >
              <div className="space-y-5 sm:space-y-6">
                {[
                  { label: "Full name", key: "fullName", type: "text" },
                  { label: "Email Address", key: "email", type: "email" },
                  { label: "Company", key: "company", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="text-black dark:text-white font-medium block mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [key]: e.target.value,
                        })
                      }
                      className="
                w-full rounded-2xl
                bg-black/[0.03] dark:bg-white/[0.03]
                border border-black/10 dark:border-white/10
                px-5 py-4
                text-black dark:text-white
                placeholder:text-gray-500
                outline-none
                focus:border-black dark:focus:border-white
                transition-all duration-300
              "
                    />
                  </div>
                ))}

                <div>
                  <label className="text-black dark:text-white font-medium block mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Type your message here"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    className="
              w-full rounded-2xl
              bg-black/[0.03] dark:bg-white/[0.03]
              border border-black/10 dark:border-white/10
              px-5 py-4
              text-black dark:text-white
              placeholder:text-gray-500
              outline-none
              focus:border-black dark:focus:border-white
              transition-all duration-300
            "
                  />
                </div>

                <button
                  onClick={handleSendMessage}
                  className="
            w-full py-4 rounded-2xl
            bg-black text-white
            dark:bg-white dark:text-black
            font-semibold
            hover:scale-[1.02]
            transition-all duration-300
            shadow-xl
          "
                >
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>
        </section>
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
    relative overflow-hidden
    border-t border-black/10 dark:border-white/10
    bg-white/70 dark:bg-black
    backdrop-blur-2xl
    text-black dark:text-gray-300
  "
        >
          <h1
            className="
      absolute bottom-0 left-1/2
      -translate-x-1/2 translate-y-2 sm:translate-y-6 lg:translate-y-10
      text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[12rem]
      font-extrabold tracking-tight
      text-black/[0.04] dark:text-white/[0.04]
      select-none z-0
      pointer-events-none
      whitespace-nowrap
    "
          >
            FinSight
          </h1>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/4 top-10 h-32 w-32 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
            <div className="absolute right-1/4 bottom-10 h-32 w-32 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-black/5 dark:bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <div
              className="
        mb-10 sm:mb-14 lg:mb-16
        rounded-3xl
        border border-black/10 dark:border-white/10
        bg-white/80 dark:bg-white/[0.03]
        backdrop-blur-2xl
        p-5 sm:p-6 lg:p-8
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]
        dark:shadow-[0_20px_60px_rgba(255,255,255,0.04)]
      "
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white">
                    Ready to take control of your finances?
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    Smart budgeting, expense tracking, and AI-powered financial
                    insights.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="
            px-4 sm:px-6
            py-2 sm:py-3
            text-sm sm:text-base
            rounded-xl sm:rounded-2xl
            bg-black text-white
            dark:bg-white dark:text-black
            font-semibold
            shadow-xl
            hover:scale-105
            transition-all duration-300
          "
                >
                  Get Started
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              <div className="space-y-4 sm:space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
                  FinSight
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  The most advanced AI-powered personal finance platform trusted
                  by thousands for smarter savings, secure transactions, and
                  real-time financial insights.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-black dark:text-white">
                  Platform
                </h3>

                <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li>Dashboard</li>
                  <li>Expense Tracking</li>
                  <li>Budget Planner</li>
                  <li>AI Insights</li>
                  <li>Investments</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-black dark:text-white">
                  Resources
                </h3>

                <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li>Financial Blog</li>
                  <li>Security Center</li>
                  <li>Reports</li>
                  <li>Help Center</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 sm:mb-4 text-black dark:text-white">
                  Company
                </h3>

                <ul className="space-y-2 sm:space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Contact</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>

            <div className="my-8 sm:my-10 lg:my-12 border-t border-black/10 dark:border-white/10 pt-6" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 sm:mt-12">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} FinSight. All rights reserved.
              </p>

              <div className="flex space-x-3 sm:space-x-4">
                {[LinkedinIcon, TwitterIcon, YoutubeIcon].map((Icon, idx) => (
                  <div
                    key={idx}
                    className="
              p-2 sm:p-3
              rounded-full
              border border-black/10 dark:border-white/10
              bg-white/70 dark:bg-white/[0.03]
              backdrop-blur-xl
              hover:scale-110
              transition-all duration-300
              cursor-pointer
            "
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
        {isModalOpen && (
          <div
            className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/40 dark:bg-black/70
      backdrop-blur-xl
      transition-all duration-300
    "
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
        relative w-full max-w-5xl mx-4
        rounded-[34px] overflow-hidden
        
        border border-black/10 dark:border-white/10
        
        bg-white/80 dark:bg-black/75
        backdrop-blur-2xl
        
        shadow-[0_20px_80px_rgba(0,0,0,0.12)]
        dark:shadow-[0_20px_80px_rgba(255,255,255,0.06)]
        
        ring-1 ring-black/5 dark:ring-white/5
        
        before:absolute before:inset-0
        before:bg-gradient-to-br
        before:from-white/40 before:to-transparent
        dark:before:from-white/5
        before:pointer-events-none
        
        transition-all duration-300
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
