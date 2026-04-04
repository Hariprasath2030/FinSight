"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { FinSightNavbar } from "./FinSightNavbar";
import { Header } from "./Header";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);

  // Save state to localStorage every second
  useEffect(() => {
    const interval = setInterval(saveToLocalStorage, 1000);
    return () => clearInterval(interval);
  }, [saveToLocalStorage]);

  const isLandingPage = pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {!isLandingPage ? (
        <div>
          <FinSightNavbar />
          <div className="mx-20 py-10 mt-20">{children}</div>
        </div>
      ) : (
        <main className="p-0">{children}</main>
      )}
    </div>
  );
}
