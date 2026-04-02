"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useStore((state) => state.theme);
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);

  // Load from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const timer = setInterval(() => {
      saveToLocalStorage();
    }, 1000);

    return () => clearInterval(timer);
  }, [saveToLocalStorage]);

  const isLandingPage = pathname === "/";

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        {!isLandingPage && (
          <div className="flex">
            <Sidebar />
            <div className="flex w-full flex-col">
              <Header />
              <main className="ml-64 mt-16 flex-1 p-8">
                <div className="mx-auto max-w-7xl">{children}</div>
              </main>
            </div>
          </div>
        )}

        {isLandingPage && <main className="p-0">{children}</main>}
      </div>
    </div>
  );
}
