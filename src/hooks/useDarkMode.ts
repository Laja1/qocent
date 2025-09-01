// src/hooks/useDarkMode.ts
import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";

export function useDarkMode(defaultTheme: Theme = "system") {
  // Initialize state based on saved preference or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    
    const saved = localStorage.getItem("theme") as Theme;
    return saved || defaultTheme;
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return false;
    if (saved === "light") return true;
    
    // Default to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Listen to system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Apply theme changes to DOM
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  // Save theme preference (but not for system-derived changes)
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemDark);
    } else {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  const setLightTheme = useCallback(() => setTheme("light"), []);
  const setDarkTheme = useCallback(() => setTheme("dark"), []);
  const setSystemTheme = useCallback(() => setTheme("system"), []);
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      // If currently system, toggle to opposite of current appearance
      if (prev === "system") {
        return isDark ? "light" : "dark";
      }
      // If explicitly set, toggle between light and dark
      return prev === "dark" ? "light" : "dark";
    });
  }, [isDark]);

  return {
    theme,
    isDark,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    toggleTheme,
    // Legacy support
    toggle: toggleTheme
  };
}