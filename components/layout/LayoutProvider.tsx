"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const timer = setInterval(() => {
      saveToLocalStorage();
    }, 1000);

    return () => clearInterval(timer);
  }, [saveToLocalStorage]);

  const isLandingPage = pathname === "/";

  return (
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
  );
}
