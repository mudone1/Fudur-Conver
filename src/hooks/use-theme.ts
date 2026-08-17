"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Minimal theme toggle backed by localStorage + the .dark class on
 * <html>. Paired with the inline script in app/layout.tsx that sets
 * the class before hydration to avoid a flash of the wrong theme.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setThemeState(isDark ? "dark" : "light");
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme just
      // won't persist across reloads, which is an acceptable fallback.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
