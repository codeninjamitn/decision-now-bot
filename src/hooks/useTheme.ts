import { useState, useEffect } from "react";

export type ThemeMode = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredMode(): ThemeMode {
  const stored = localStorage.getItem("zr-theme");
  if (stored === "dark" || stored === "light" || stored === "system") return stored;
  return "system";
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);

  useEffect(() => {
    const apply = (m: ThemeMode) => {
      const resolved = m === "system" ? getSystemTheme() : m;
      document.documentElement.classList.toggle("dark", resolved === "dark");
    };
    apply(mode);
    localStorage.setItem("zr-theme", mode);

    if (mode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => apply("system");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [mode]);

  return { mode, setMode };
}
