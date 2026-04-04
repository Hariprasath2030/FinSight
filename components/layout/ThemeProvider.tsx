"use client";

import { useEffect } from "react";
import { useStore } from "@/store";
import { LayoutProvider } from "./LayoutProvider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStore((state) => state.theme);
  const loadFromLocalStorage = useStore((state) => state.loadFromLocalStorage);

  // Load theme from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Apply theme class to html element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return <LayoutProvider>{children}</LayoutProvider>;
}
