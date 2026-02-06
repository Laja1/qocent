// src/hooks/useDarkMode.ts
import { useEffect } from "react";

export function useDarkMode() {
  // Always enforce light mode
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  return {
    theme: "light" as const,
    isDark: false,
    setLightTheme: () => {},
    setDarkTheme: () => {},
    setSystemTheme: () => {},
    toggleTheme: () => {},
    toggle: () => {}
  };
}