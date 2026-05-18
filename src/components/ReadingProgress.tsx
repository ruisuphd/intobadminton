"use client";

import { useEffect, useState } from "react";

/**
 * Slim reading-progress bar fixed to the top of the viewport.
 *
 * Driven by document scroll rather than per-heading IntersectionObserver — a
 * scroll-fraction model gives smoother feedback for long-form prose, and the
 * implementation stays under 30 lines with zero dependencies. Respects
 * `prefers-reduced-motion` (no transition on the inner bar).
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      setProgress(pct);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent"
    >
      <div
        className="h-full bg-[var(--color-accent)] motion-safe:transition-[width] motion-safe:duration-150"
        style={{ width: `${(progress * 100).toFixed(2)}%` }}
      />
    </div>
  );
}
