"use client";

import { useState } from "react";
import {
  DollarSign,
  Moon,
  Sun,
  TrendingUp,
  Wallet,
  PieChart,
  LogOutIcon,
  AlertCircle,
  ShieldCheck,
  Eye,
  ChevronDown,
} from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useTheme } from "next-themes";
import { useStore } from "@/store";
import { UserRole } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function FinSightNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userRole = useStore((state) => state.userRole);
  const setUserRole = useStore((state) => state.setUserRole);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);
  const addToast = useStore((state) => state.addToast);
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  const handleRoleSwitch = (role: UserRole) => {
    setUserRole(role);
    saveToLocalStorage();
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
    addToast(`Switched to ${roleLabel} dashboard`, "success", 3000);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    addToast("You have been logged out successfully", "success", 3000);
    await new Promise((resolve) => setTimeout(resolve, 600));
    logout();
    saveToLocalStorage();
    setIsLoggingOut(false);
    router.push("/");
  };
  const navItems = [
    { href: "/dashboard", name: "Dashboard", icon: TrendingUp },
    { href: "/analytics", name: "Analytics", icon: PieChart },
    { href: "/transactions", name: "Transactions", icon: Wallet },
    { href: "/insights", name: "Insights", icon: AlertCircle },
  ];

  function RoleSwitcher({
    userRole,
    handleRoleSwitch,
  }: {
    userRole: string;
    handleRoleSwitch: (role: UserRole) => void;
  }) {
    const [isOpen, setIsOpen] = useState(false);

    const roles = [
      {
        key: "admin",
        label: "Admin",
        icon: ShieldCheck,
        color: "text-emerald-500",
      },
      {
        key: "viewer",
        label: "Viewer",
        icon: Eye,
        color: "text-blue-500",
      },
    ];

    const activeRole = roles.find((r) => r.key === userRole);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
          group relative
          flex items-center gap-3
          px-4 py-2.5
          w-full
          rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)]
          hover:scale-105
          active:scale-95
          transition-all duration-300
          overflow-hidden
        "
        >
          <div
            className="
            absolute inset-0
            w-full
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

          {activeRole && (
            <div className="relative z-10 flex w-full items-center justify-center gap-2">
              <activeRole.icon className={`w-4 h-4 ${activeRole.color}`} />

              <span className="font-medium text-sm text-black dark:text-white">
                {activeRole.label}
              </span>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="
              absolute right-0 mt-3 
              rounded-2xl w-full
              border border-black/10 dark:border-white/10
              bg-white/90 dark:bg-black/80
              backdrop-blur-2xl
              shadow-2xl
              overflow-hidden
              z-50
            "
            >
              {roles.map((role) => {
                const Icon = role.icon;

                return (
                  <button
                    key={role.key}
                    onClick={() => {
                      handleRoleSwitch(role.key as UserRole);
                      setIsOpen(false);
                    }}
                    className={`
                    w-full px-4 py-3
                    flex items-center gap-3
                    transition-all duration-300 
                    hover:bg-gray-50 dark:hover:bg-gray-900
                    ${
                      userRole === role.key
                        ? "bg-gray-100 dark:bg-gray-950"
                        : ""
                    }
                  `}
                  >
                    <Icon className={`w-4 h-4 ${role.color}`} />
                    <span className="text-sm font-medium text-black dark:text-white">
                      {role.label}
                    </span>
                    {userRole === role.key && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div className="fixed top-4 z-50 w-full px-4">
      <div className="hidden lg:block">
        <Navbar className="fixed top-4 z-50">
          <NavBody className="border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/70 backdrop-blur-2xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.04)] px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black shadow-lg">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                FinSight
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <NavItems
                items={navItems}
                className="text-black dark:text-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <RoleSwitcher
                userRole={userRole}
                handleRoleSwitch={handleRoleSwitch}
              />

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

                <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
                  {resolvedTheme === "light" ? (
                    <Moon className="w-4 h-4 text-slate-700" />
                  ) : (
                    <Sun className="w-4 h-4 text-yellow-400 drop-shadow-md" />
                  )}
                </div>
              </button>

              <button
                disabled={isLoggingOut}
                onClick={handleLogout}
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

                <LogOutIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="relative z-10 font-medium tracking-wide">
                  {isLoggingOut ? "Signing out..." : "Logout"}
                </span>
              </button>
            </div>
          </NavBody>
        </Navbar>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <MobileNav
          className="
    w-full
    rounded-2xl
    border border-black/10 dark:border-white/10
    bg-white/80 dark:bg-black/80
    backdrop-blur-2xl
    shadow-lg
    px-3 sm:px-4
    py-2
  "
        >
          <MobileNavHeader className="px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <span className="text-base sm:text-lg font-bold">FinSight</span>
            </div>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="
      mt-3
      rounded-2xl
      border border-black/10 dark:border-white/10
      bg-white dark:bg-black
      shadow-2xl
      p-4 sm:p-5
    "
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
            flex items-center gap-3
            py-3
            text-sm sm:text-base
            text-black dark:text-white
            border-b border-black/5 dark:border-white/5
            hover:opacity-70
            transition-all duration-300
          "
                >
                  {Icon && <Icon size={18} />}
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-4 flex flex-col gap-3 w-full">
              <RoleSwitcher
                userRole={userRole}
                handleRoleSwitch={handleRoleSwitch}
              />

              <button
                onClick={() =>
                  setTheme(resolvedTheme === "light" ? "dark" : "light")
                }
                className="
          w-full
          h-11
          rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          transition-all duration-300
          flex items-center justify-center gap-2
          hover:scale-[1.02]
        "
              >
                {resolvedTheme === "light" ? (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span className="text-sm">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">Light Mode</span>
                  </>
                )}
              </button>
              <button
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="
          w-full
          flex items-center justify-center gap-2
          px-4 py-3
          rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white text-black
          dark:bg-white/10 dark:text-white
          backdrop-blur-2xl
          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
          transition-all duration-300
          hover:scale-[1.02]
        "
              >
                <LogOutIcon className="w-4 h-4" />
                <span className="font-medium tracking-wide text-sm sm:text-base">
                  {isLoggingOut ? "Signing out..." : "Logout"}
                </span>
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </div>
    </div>
  );
}
