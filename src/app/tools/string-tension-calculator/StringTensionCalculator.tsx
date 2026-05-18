"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SkillLevel } from "@/lib/taxonomy";

/**
 * Heuristic string-tension recommender. The model is intentionally
 * transparent — it derives a base tension from skill level, adds a frame
 * adjustment from the racket's rated max, subtracts for arm-comfort
 * cautions, and reports the resulting ±2 lb window with rationale.
 *
 * It does NOT recommend going above the frame's rated max under any
 * circumstance. See the surrounding page copy for the conservative
 * defaults rationale.
 */

const LEVEL_BASE_LB: Record<SkillLevel, number> = {
  recreational: 22,
  club: 25,
  competitive: 27,
  pro_oriented: 28,
};

const LEVEL_LABEL: Record<SkillLevel, string> = {
  recreational: "Recreational",
  club: "Club",
  competitive: "Competitive",
  pro_oriented: "Pro-oriented",
};

const REC_HARD_CAP_LB = 30;

type Result = {
  centerLb: number;
  windowMinLb: number;
  windowMaxLb: number;
  rationale: string[];
  cappedByFrame: boolean;
  cappedByPolicy: boolean;
};

function compute({
  level,
  frameMaxLb,
  armCaution,
  stringDurability,
}: {
  level: SkillLevel;
  frameMaxLb: number;
  armCaution: "none" | "mild" | "strong";
  stringDurability: "fragile" | "balanced" | "durable";
}): Result {
  const rationale: string[] = [];
  let center = LEVEL_BASE_LB[level];
  rationale.push(`${LEVEL_LABEL[level]} base: ${center} lb.`);

  if (armCaution === "mild") {
    center -= 1;
    rationale.push("Mild arm caution: −1 lb.");
  } else if (armCaution === "strong") {
    center -= 2;
    rationale.push("Strong arm caution: −2 lb (sweet spot stays larger).");
  }

  if (stringDurability === "fragile") {
    center -= 1;
    rationale.push("Fragile string class: −1 lb to extend life.");
  } else if (stringDurability === "durable") {
    center += 1;
    rationale.push("Durable string class: +1 lb headroom.");
  }

  // Hard ceiling: never above the frame max, never above the policy cap for
  // recreational regardless of frame.
  const policyCap =
    level === "recreational" ? Math.min(frameMaxLb - 1, REC_HARD_CAP_LB) : frameMaxLb - 1;
  let cappedByFrame = false;
  let cappedByPolicy = false;
  if (center > policyCap) {
    if (level === "recreational" && policyCap === REC_HARD_CAP_LB) {
      cappedByPolicy = true;
      rationale.push(
        `Recreational policy cap (${REC_HARD_CAP_LB} lb) applied.`
      );
    } else {
      cappedByFrame = true;
      rationale.push(
        `Frame max −1 lb cap (${policyCap} lb) applied — never string at or above the rated maximum.`
      );
    }
    center = policyCap;
  }

  return {
    centerLb: center,
    windowMinLb: center - 2,
    windowMaxLb: center + 2,
    rationale,
    cappedByFrame,
    cappedByPolicy,
  };
}

export function StringTensionCalculator() {
  const [level, setLevel] = useState<SkillLevel>("club");
  const [frameMax, setFrameMax] = useState(28);
  const [armCaution, setArmCaution] = useState<"none" | "mild" | "strong">(
    "none"
  );
  const [stringDurability, setStringDurability] = useState<
    "fragile" | "balanced" | "durable"
  >("balanced");

  const result = useMemo(
    () => compute({ level, frameMaxLb: frameMax, armCaution, stringDurability }),
    [level, frameMax, armCaution, stringDurability]
  );

  return (
    <div className="space-y-6">
      <div className="card p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">Your setup</h2>
        <label className="block text-sm">
          <span className="text-[var(--color-muted)]">Skill level</span>
          <select
            className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2 text-[var(--text)]"
            value={level}
            onChange={(e) => setLevel(e.target.value as SkillLevel)}
          >
            {(Object.keys(LEVEL_LABEL) as SkillLevel[]).map((l) => (
              <option key={l} value={l}>
                {LEVEL_LABEL[l]}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-[var(--color-muted)]">
            Frame max tension (lb) — read from the racket throat
          </span>
          <input
            type="number"
            min={18}
            max={35}
            step={0.5}
            value={frameMax}
            onChange={(e) => setFrameMax(Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2 text-[var(--text)]"
          />
          <span className="mt-1 block text-xs text-[var(--color-subtle)]">
            Examples: Yonex Astrox 99 Pro 4U → 28 lb. Nanoflare 1000 Z 4U →
            28 lb. Always go by the marking on YOUR frame.
          </span>
        </label>

        <label className="block text-sm">
          <span className="text-[var(--color-muted)]">Arm comfort signals</span>
          <select
            className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2 text-[var(--text)]"
            value={armCaution}
            onChange={(e) =>
              setArmCaution(e.target.value as "none" | "mild" | "strong")
            }
          >
            <option value="none">No issues</option>
            <option value="mild">Occasional twinge / past elbow caution</option>
            <option value="strong">Active wrist or elbow injury</option>
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-[var(--color-muted)]">
            String class (e.g. BG65 = durable, Aerobite = fragile)
          </span>
          <select
            className="mt-1 w-full rounded-xl border border-[color:var(--line-strong)] bg-white px-3 py-2 text-[var(--text)]"
            value={stringDurability}
            onChange={(e) =>
              setStringDurability(
                e.target.value as "fragile" | "balanced" | "durable"
              )
            }
          >
            <option value="fragile">Fragile / thin gauge (≤ 0.66 mm)</option>
            <option value="balanced">Balanced (0.67 – 0.69 mm)</option>
            <option value="durable">Durable (≥ 0.70 mm)</option>
          </select>
        </label>
      </div>

      <div className="card p-6 bg-[color:var(--color-accent-soft)]">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Suggested starting tension
        </h2>
        <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--color-accent)]">
          {result.windowMinLb}–{result.windowMaxLb} lb
        </p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Centre around {result.centerLb} lb, ±2 lb window.
        </p>
        {(result.cappedByFrame || result.cappedByPolicy) && (
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            {result.cappedByFrame
              ? "Capped at frame max −1 lb for safety. Do not string at or above the rated maximum."
              : `Capped at ${REC_HARD_CAP_LB} lb (recreational policy cap).`}
          </p>
        )}

        <details className="mt-4 rounded-lg bg-white/70 p-3">
          <summary className="cursor-pointer text-sm font-medium text-[var(--text)]">
            How we arrived at this number
          </summary>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-[var(--color-muted)]">
            {result.rationale.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </details>
      </div>

      <p className="text-xs text-[var(--color-subtle)]">
        This calculator is informational, not medical or warranty advice.
        Always confirm with a qualified stringer who can inspect the frame
        and string condition. See our{" "}
        <Link
          href="/guides/string-tension/"
          className="text-[var(--color-accent)] underline"
        >
          string-tension guide
        </Link>{" "}
        for the why behind each adjustment.
      </p>
    </div>
  );
}
