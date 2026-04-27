"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

type C = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "light" | "dark";
};

const ThemeContext = createContext<C | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time localStorage read */
    const s = localStorage.getItem("intobadminton.theme") as Theme | null;
    if (s === "light" || s === "dark" || s === "system") setThemeState(s);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const run = () => {
      const d =
        theme === "system" ? (m.matches ? "dark" : "light") : theme;
      setResolved(d);
      document.documentElement.classList.toggle("dark", d === "dark");
    };
    run();
    m.addEventListener("change", run);
    return () => m.removeEventListener("change", run);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("intobadminton.theme", t);
  }, []);

  const v = useMemo(
    () => ({ theme, setTheme, resolved }),
    [theme, setTheme, resolved]
  );

  return (
    <ThemeContext.Provider value={v}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme outside ThemeProvider");
  return c;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const cycle = () => {
    const o: Theme[] = ["light", "dark", "system"];
    const i = (o.indexOf(theme) + 1) % 3;
    setTheme(o[i]!);
  };
  return (
    <button
      type="button"
      onClick={cycle}
      className="rounded-2xl border border-zinc-300 bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] transition-colors hover:border-[var(--color-accent)] dark:border-zinc-600"
      aria-label={`Color theme: ${theme}`}
    >
      {theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"}
    </button>
  );
}
