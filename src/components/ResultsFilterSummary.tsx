"use client";

import Link from "next/link";
import type { UserProfile } from "@/lib/taxonomy";

const LEVEL: Record<string, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

const DISC: Record<string, string> = {
  singles: "Singles",
  doubles: "Doubles",
  mixed: "Mixed",
};

const CAT: Record<string, string> = {
  racket: "Rackets",
  shoes: "Shoes",
  string: "Strings",
  grip: "Grips",
  bag: "Bags",
  shuttle: "Shuttles",
};

export function ResultsFilterSummary({ profile }: { profile: UserProfile }) {
  const chips: string[] = [];
  if (profile.level) chips.push(LEVEL[profile.level] ?? profile.level);
  if (profile.discipline) chips.push(DISC[profile.discipline] ?? profile.discipline);
  if (profile.category) chips.push(CAT[profile.category] ?? profile.category);
  if (profile.styles.length > 0) {
    chips.push(profile.styles.join(" · "));
  }
  if (profile.body.budgetMaxUsd != null) {
    chips.push(`≤ $${profile.body.budgetMaxUsd}`);
  }

  return (
    <div className="card flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium text-[var(--text)]">Active filters</span>
        {chips.map((c) => (
          <span key={c} className="chip chip-secondary text-xs">
            {c}
          </span>
        ))}
      </div>
      <Link
        href="/quiz/"
        className="text-[var(--color-accent)] underline"
      >
        Edit in finder
      </Link>
    </div>
  );
}
