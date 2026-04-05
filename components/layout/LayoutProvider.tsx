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

          <main
            className="
              flex-1
              w-full
              px-6
              sm:px-6
              md:px-8
              lg:px-12
              xl:px-20
              py-6
              sm:py-8
              md:py-10
              mt-20
              sm:mt-24
            "
          >
            {children}
          </main>

          <footer
            className="
              border-t border-black/5 dark:border-white/10
              bg-white/60 dark:bg-white/[0.03]
              backdrop-blur-2xl
              py-4 sm:py-5
              px-4
              text-center
              text-xs sm:text-sm
              font-medium
              tracking-wide
              text-gray-500 dark:text-gray-400
            "
          >
            © 2026 FinSight. All rights reserved.
          </footer>
        </>
      ) : (
        <main className="flex-1 w-full">{children}</main>
      )}
    </div>
  );
}
