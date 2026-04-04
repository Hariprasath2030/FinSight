"use client";

import { useState } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useStore } from "@/store";

export function Header() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showMoon, setShowMoon] = useState(true);
  const { setTheme } = useTheme();

  const userRole = useStore((state) => state.userRole);
  const setUserRole = useStore((state) => state.setUserRole);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);
  const logout = useStore((state) => state.logout);

  const handleThemeToggle = () => {
    setShowMoon(!showMoon);
    setTheme(showMoon ? "dark" : "light");
  };

  const handleRoleSwitch = () => {
    const newRole = userRole === "admin" ? "viewer" : "admin";
    setUserRole(newRole);
    setTimeout(() => saveToLocalStorage(), 0);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    logout();
    saveToLocalStorage();
    setIsLoggingOut(false);
    router.push("/");
  };

  return (
    <header className="fixed right-0 top-0 z-30 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-gray-200 bg-white px-8 dark:border-gray-800 dark:bg-black">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Finance Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Role:
          </span>
          <button
            onClick={handleRoleSwitch}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              userRole === "admin"
                ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400"
                : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
            }`}
          >
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="group relative overflow-hidden rounded-lg p-2 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-lg hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-xl"
          aria-label="Toggle theme"
        >
          <div className="relative z-10 transition-transform duration-300 ease-in-out group-hover:rotate-12">
            {showMoon ? <Moon size={20} /> : <Sun size={20} />}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="ml-2 rounded-lg px-3 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoggingOut ? "Signing out..." : "Logout"}
          <LogOut className="inline-block ml-2" size={16} />
        </button>
      </div>
    </header>
  );
}
