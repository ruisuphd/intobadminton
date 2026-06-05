"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CATEGORIES,
  defaultUserProfile,
  DISCIPLINES,
  SKILL_LEVELS,
  type Discipline,
  type EquipmentCategory,
  type SkillLevel,
} from "@/lib/taxonomy";
import { profileToSearchParams } from "@/lib/profile-url";

const LEVEL_LABEL: Record<SkillLevel, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

const DISC_LABEL: Record<Discipline, string> = {
  singles: "Singles",
  doubles: "Doubles",
  mixed: "Mixed",
};

const CAT_LABEL: Record<EquipmentCategory, string> = {
  racket: "Rackets",
  shoes: "Shoes",
  string: "Strings",
  grip: "Grips",
  bag: "Bags",
  shuttle: "Shuttles",
  accessory: "Accessories",
};

export function FinderQuickFilters({
  className = "",
}: {
  className?: string;
}) {
  const router = useRouter();
  const [level, setLevel] = useState<SkillLevel | "">("");
  const [discipline, setDiscipline] = useState<Discipline | "">("");
  const [category, setCategory] = useState<EquipmentCategory>("racket");

  const canSubmit = level !== "" && discipline !== "";

  const goToResults = () => {
    if (!canSubmit) return;
    const profile = {
      ...defaultUserProfile(),
      level,
      discipline,
      category,
    };
    const params = profileToSearchParams(profile).toString();
    router.push(`/results/?${params}`);
  };

  return (
    <section
      className={`card p-5 sm:p-6 ${className}`}
      aria-labelledby="quick-filters-heading"
    >
      <h2
        id="quick-filters-heading"
        className="text-sm font-semibold text-[var(--text)]"
      >
        Skip the quiz — filter the catalogue
      </h2>
      <p className="mt-1 text-xs text-[var(--color-muted)]">
        Pick level and discipline, then jump straight to a ranked shortlist. Add
        style and budget in the{" "}
        <Link href="/quiz/" className="text-[var(--color-accent)] underline">
          full finder
        </Link>{" "}
        for finer tuning.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <fieldset className="min-w-0 flex-1">
          <legend className="sr-only">Skill level</legend>
          <div className="flex flex-wrap gap-1.5">
            {SKILL_LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  level === l
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[color:var(--line-strong)] text-[var(--color-muted)] hover:border-[var(--text)]"
                }`}
              >
                {LEVEL_LABEL[l]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <fieldset className="min-w-0 flex-1">
          <legend className="sr-only">Discipline</legend>
          <div className="flex flex-wrap gap-1.5">
            {DISCIPLINES.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={discipline === d}
                onClick={() => setDiscipline(d)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  discipline === d
                    ? "bg-[var(--color-accent)] text-white"
                    : "border border-[color:var(--line-strong)] text-[var(--color-muted)] hover:border-[var(--text)]"
                }`}
              >
                {DISC_LABEL[d]}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="text-xs text-[var(--color-muted)]">
          Category
          <select
            className="mt-1 block w-full min-w-[8rem] rounded-xl border border-[color:var(--line-strong)] bg-transparent px-3 py-2 text-sm text-[var(--text)]"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as EquipmentCategory)
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CAT_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={!canSubmit}
          onClick={goToResults}
          className="btn-primary h-10 px-5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          View ranked results
        </button>
      </div>
    </section>
  );
}
