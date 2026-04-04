"use client";

import { useState } from "react";
import {
  DollarSign,
  Moon,
  Sun,
  TrendingUp,
  Wallet,
  PieChart,
  Settings,
  LogOutIcon,
  AlertCircle,
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
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  const handleRoleSwitch = (role: string) => {
    setUserRole(role);
    saveToLocalStorage();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
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
    { href: "/settings", name: "Settings", icon: Settings },
  ];

  function RoleSwitcher({
    userRole,
    handleRoleSwitch,
  }: {
    userRole: string;
    handleRoleSwitch: (role: string) => void;
  }) {
    const [isOpen, setIsOpen] = useState(false);

    const roles = ["admin", "viewer"];

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 group relative
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
      overflow-hidden"
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
          {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="absolute mt-2 right-0 w-36 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/70 backdrop-blur-xl shadow-lg overflow-hidden z-50"
            >
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    handleRoleSwitch(role);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 rounded-tl-lg rounded-tr-lg ${
                    userRole === role
                      ? "font-semibold bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                      : "text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-950"
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div className="relative w-full">
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
            <NavItems items={navItems} className="text-black dark:text-white" />
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

              <LogOutIcon className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className="relative z-10 font-medium tracking-wide">
                {isLoggingOut ? "Signing out..." : "Logout"}
              </span>
            </button>
          </div>
        </NavBody>

        {/* Mobile Navbar */}
        <MobileNav className="border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-2xl shadow-lg">
          <MobileNavHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">FinSight</span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black shadow-2xl p-5"
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 py-3 text-black dark:text-white border-b border-black/5 dark:border-white/5 hover:opacity-70 transition-all duration-300"
                >
                  {Icon && <Icon size={18} />}
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-5 flex flex-col gap-3">
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
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
