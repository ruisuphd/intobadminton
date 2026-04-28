"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/components/Analytics";
import {
  DISCIPLINES,
  FOOT_WIDTH,
  INJURY_FLAGS,
  PLAY_STYLES,
  SKILL_LEVELS,
  type Discipline,
  type EquipmentCategory,
  type PlayStyle,
  type SkillLevel,
} from "@/lib/taxonomy";
import { useProfile } from "@/context/ProfileContext";
import { buildLocalizedPath, type SiteLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

const STEPS = 5;

const levelLabel: Record<SkillLevel, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

const levelLabelZh: Record<SkillLevel, string> = {
  recreational: "休闲 / 新手",
  club: "俱乐部",
  competitive: "比赛型",
  pro_oriented: "专业取向",
};

const discLabel: Record<Discipline, string> = {
  singles: "Singles",
  doubles: "Doubles",
  mixed: "Mixed",
};

const discLabelZh: Record<Discipline, string> = {
  singles: "单打",
  doubles: "双打",
  mixed: "混双",
};

const styleLabel: Record<PlayStyle, string> = {
  offensive: "Offensive",
  balanced: "Balanced",
  defensive: "Defensive",
  front_court: "Front court",
  smash_heavy: "Smash-heavy",
};

const styleLabelZh: Record<PlayStyle, string> = {
  offensive: "进攻",
  balanced: "均衡",
  defensive: "防守",
  front_court: "网前",
  smash_heavy: "重杀",
};

export function QuizFunnel({ locale = "en" }: { locale?: SiteLocale }) {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const copy = t(locale).quiz;
  const levels = locale === "zh" ? levelLabelZh : levelLabel;
  const disciplines = locale === "zh" ? discLabelZh : discLabel;
  const styles = locale === "zh" ? styleLabelZh : styleLabel;

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS) * 100),
    [step]
  );

  useEffect(() => {
    if (step === 0) trackEvent("quiz_start", { category: "racket" });
  }, [step]);

  const next = () => {
    trackEvent("quiz_step_complete", { step: step + 1 });
    if (step < STEPS - 1) setStep((s) => s + 1);
    else {
      trackEvent("quiz_complete", {
        level: profile.level ?? "unknown",
        discipline: profile.discipline ?? "unknown",
        category: profile.category ?? "unknown",
      });
      router.push(buildLocalizedPath(locale, "/results/"));
    }
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <div className="mx-auto max-w-lg">
      <div
        className="mb-8 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-[var(--color-muted)]">
        {locale === "zh"
          ? `${copy.step} ${step + 1} ${copy.of} ${STEPS}`
          : `${copy.step} ${step + 1} ${copy.of} ${STEPS}`}
      </p>

      {step === 0 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.levelTitle}
          </h1>
          <p className="text-[var(--color-muted)]">
            {copy.levelHelp}
          </p>
          <div className="flex flex-col gap-2">
            {SKILL_LEVELS.map((lv) => (
              <button
                type="button"
                key={lv}
                onClick={() => {
                  setProfile((p) => ({ ...p, level: lv }));
                  next();
                }}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  profile.level === lv
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "border-zinc-200 dark:border-zinc-600"
                }`}
              >
                {levels[lv]}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 1 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.disciplineTitle}
          </h1>
          <div className="flex flex-col gap-2">
            {DISCIPLINES.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => {
                  setProfile((p) => ({ ...p, discipline: d }));
                  next();
                }}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  profile.discipline === d
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "border-zinc-200 dark:border-zinc-600"
                }`}
              >
                {disciplines[d]}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.styleTitle}
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {copy.styleHelp}
          </p>
          <div className="flex flex-wrap gap-2">
            {PLAY_STYLES.map((s) => {
              const on = profile.styles.includes(s);
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => {
                    setProfile((p) => {
                      const has = p.styles.includes(s);
                      if (has) {
                        return {
                          ...p,
                          styles: p.styles.filter((x) => x !== s),
                        };
                      }
                      if (p.styles.length >= 2) {
                        return { ...p, styles: [...p.styles.slice(1), s] };
                      }
                      return { ...p, styles: [...p.styles, s] };
                    });
                  }}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    on
                      ? "bg-[var(--color-accent)] text-white"
                      : "border border-zinc-300 dark:border-zinc-600"
                  }`}
                >
                  {styles[s]}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={next}
            className="mt-4 w-full rounded-2xl bg-[var(--color-accent)] py-3 text-sm font-medium text-white"
          >
            {copy.continue}
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.categoryTitle}
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {copy.categoryHelp}
          </p>
          {(
            [
              ["racket", locale === "zh" ? "球拍" : "Racket"],
              ["shoes", locale === "zh" ? "球鞋（即将推出）" : "Shoes (soon)"],
              ["string", locale === "zh" ? "球线（即将推出）" : "String (soon)"],
              ["grip", locale === "zh" ? "手胶（即将推出）" : "Grip (soon)"],
              ["bag", locale === "zh" ? "球包（即将推出）" : "Bag (soon)"],
            ] as [EquipmentCategory, string][]
          ).map(([id, label]) => (
            <button
              type="button"
              key={id}
              disabled={id !== "racket"}
              onClick={() => {
                setProfile((p) => ({ ...p, category: id }));
                next();
              }}
              className={`flex w-full rounded-2xl border px-4 py-3 text-left text-sm ${
                id === "racket"
                  ? "border-zinc-200 dark:border-zinc-600"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              {label}
            </button>
          ))}
        </section>
      )}

      {step === 4 && (
        <section className="mt-6 space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            {copy.bodyTitle}
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            {copy.bodyHelp}
          </p>
          <label className="block text-sm">
            <span className="text-[var(--color-muted)]">Budget max (USD)</span>
            <input
              type="number"
              min={0}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-600"
              value={profile.body.budgetMaxUsd ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setProfile((p) => ({
                  ...p,
                  body: {
                    ...p.body,
                    budgetMaxUsd: v === "" ? undefined : Number(v),
                  },
                }));
              }}
            />
          </label>
          <label className="block text-sm">
            <span className="text-[var(--color-muted)]">Weight (kg)</span>
            <input
              type="number"
              min={30}
              max={150}
              className="mt-1 w-full rounded-xl border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-600"
              value={profile.body.weightKg ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setProfile((p) => ({
                  ...p,
                  body: {
                    ...p.body,
                    weightKg: v === "" ? undefined : Number(v),
                  },
                }));
              }}
            />
          </label>
          <div>
            <p className="text-sm text-[var(--color-muted)]">Foot width</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {FOOT_WIDTH.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      body: { ...p.body, footWidth: f },
                    }))
                  }
                  className={`rounded-full px-3 py-1 text-xs ${
                    profile.body.footWidth === f
                      ? "bg-[var(--color-accent)] text-white"
                      : "border border-zinc-300 dark:border-zinc-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-[var(--color-muted)]">
              Joint comfort flags
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {INJURY_FLAGS.map((f) => {
                const has = profile.body.injuryFlags.includes(f);
                return (
                  <button
                    type="button"
                    key={f}
                    onClick={() => {
                      setProfile((p) => {
                        let next = [...p.body.injuryFlags];
                        if (f === "none") {
                          next = ["none"];
                        } else {
                          next = next.filter((x) => x !== "none");
                          if (has) next = next.filter((x) => x !== f);
                          else next.push(f);
                          if (next.length === 0) next = ["none"];
                        }
                        return {
                          ...p,
                          body: { ...p.body, injuryFlags: next },
                        };
                      });
                    }}
                    className={`rounded-full px-3 py-1 text-xs ${
                      has
                        ? "bg-[var(--color-accent)] text-white"
                        : "border border-zinc-300 dark:border-zinc-600"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={next}
            className="w-full rounded-2xl bg-[var(--color-accent)] py-3 text-sm font-medium text-white"
          >
            {copy.see}
          </button>
        </section>
      )}

      {step > 0 && step < 4 && (
        <button
          type="button"
          onClick={back}
          className="mt-8 text-sm text-[var(--color-muted)] hover:text-[var(--text)]"
        >
          ← {copy.back}
        </button>
      )}
    </div>
  );
}
