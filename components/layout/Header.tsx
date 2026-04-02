"use client";

import { useState } from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";

export function Header() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const userRole = useStore((state) => state.userRole);
  const setUserRole = useStore((state) => state.setUserRole);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);
  const logout = useStore((state) => state.logout);

  const handleThemeToggle = () => {
    toggleTheme();
    setTimeout(() => saveToLocalStorage(), 0);
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
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
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
