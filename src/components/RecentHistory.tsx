"use client";

import { useProfile } from "@/context/ProfileContext";
import { byId } from "@/lib/scoring";

export function RecentHistory() {
  const { history } = useProfile();
  if (history.length === 0) return null;

  return (
    <section className="mt-12 border-t border-[color:var(--line)] pt-10">
      <h2 className="text-lg font-semibold text-[var(--text)]">
        Recent shortlists
      </h2>
      <p className="text-sm text-[var(--color-muted)]">
        Stored on this device only. Clear your browser to reset.
      </p>
      <ul className="mt-4 space-y-3">
        {history.slice(0, 5).map((h) => {
          const names = h.topIds
            .map((id) => byId(id)?.name ?? id)
            .join(" · ");
          return (
            <li
              key={h.at + names}
              className="rounded-2xl border border-[color:var(--line)] bg-[var(--surface)] px-4 py-3 text-sm"
            >
              <p className="text-xs text-[var(--color-muted)]">
                {new Date(h.at).toLocaleString()}
              </p>
              <p className="text-[var(--text)]">{names}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
