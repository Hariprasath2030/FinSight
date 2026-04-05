"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { FinSightNavbar } from "./FinSightNavbar";
import { Toast } from "@/components/common/Toast";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const saveToLocalStorage = useStore((state) => state.saveToLocalStorage);

  useEffect(() => {
    const interval = setInterval(saveToLocalStorage, 1000);
    return () => clearInterval(interval);
  }, [saveToLocalStorage]);

  const isLandingPage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      <Toast />

      {!isLandingPage ? (
        <>
          <FinSightNavbar />

          <main className="flex-1 mx-20 py-10 mt-20">{children}</main>

          <footer
            className="
    border-t border-black/5 dark:border-white/10
    bg-white/60 dark:bg-white/[0.03]
    backdrop-blur-2xl
    py-5
    text-center
    text-sm
    font-medium
    tracking-wide
    text-gray-500 dark:text-gray-400
  "
          >
            © 2026 FinSight. All rights reserved.
          </footer>
        </>
      ) : (
        <main className="p-0 flex-1">{children}</main>
      )}
    </div>
  );
}
