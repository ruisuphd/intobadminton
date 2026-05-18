"use client";

import { useMemo, useState } from "react";

type Band = {
  label: string;
  min: number;
  max: number;
  description: string;
  examples: string[];
  suitsStyle: string;
};

const BANDS: Band[] = [
  {
    label: "Strongly head-light",
    min: 270,
    max: 285,
    description:
      "Mass concentrated toward the handle. Whip-fast swing, instant defensive recovery. Pays for it on rear-court attack — the head is too light to load a heavy smash.",
    examples: [
      "Yonex Nanoflare 700 (∼285 mm)",
      "Victor Auraspeed 90K II",
    ],
    suitsStyle: "Front-court doubles, defensive specialists.",
  },
  {
    label: "Head-light",
    min: 286,
    max: 294,
    description:
      "Quick but with enough head mass to clear a court. The most-forgiving band for new doubles players and anyone reset-heavy.",
    examples: [
      "Yonex Nanoflare 800 Pro",
      "Yonex Astrox Nextage",
    ],
    suitsStyle: "Balanced doubles, defenders who attack sometimes.",
  },
  {
    label: "Even",
    min: 295,
    max: 300,
    description:
      "Neutral — the racket disappears in the hand and the result reflects your technique more than the frame. The control line.",
    examples: [
      "Yonex Arcsaber 11 Pro",
      "Victor DriveX 12",
    ],
    suitsStyle: "All-court singles, mixed doubles control players.",
  },
  {
    label: "Head-heavy",
    min: 301,
    max: 308,
    description:
      "Notable smash mass. Slower to recover and harder on the shoulder under sustained drives, but it teaches rear-court attack mechanics.",
    examples: [
      "Yonex Astrox 88D Pro",
      "Yonex Astrox 99 Pro",
      "Li-Ning AxForce 90 New",
    ],
    suitsStyle: "Rear-court doubles attackers, singles smashers with technique.",
  },
  {
    label: "Strongly head-heavy",
    min: 309,
    max: 325,
    description:
      "Pure attack tool. Demanding to time, punishing to time poorly. Reserve for competitive players with stable shoulders and clean overhead form.",
    examples: [
      "Yonex Astrox 100ZZ",
      "Li-Ning AxForce 100 Gen 2",
    ],
    suitsStyle: "Pro-oriented attackers; not a first racket.",
  },
];

function bandFor(mm: number): Band {
  for (const b of BANDS) {
    if (mm >= b.min && mm <= b.max) return b;
  }
  // Fallback — clamp to nearest band.
  if (mm < BANDS[0].min) return BANDS[0];
  return BANDS[BANDS.length - 1];
}

export function RacketBalanceExplainer() {
  const [mm, setMm] = useState(295);
  const band = useMemo(() => bandFor(mm), [mm]);

  // Marker position on the 270-325 span.
  const min = 270;
  const max = 325;
  const pct = ((mm - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Drag to a balance point (mm from butt cap)
        </h2>

        {/* Slider */}
        <div className="mt-6">
          <label htmlFor="bal" className="sr-only">
            Balance point in millimetres
          </label>
          <input
            id="bal"
            type="range"
            min={min}
            max={max}
            step={1}
            value={mm}
            onChange={(e) => setMm(Number(e.target.value))}
            className="w-full accent-[var(--color-accent)]"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={mm}
          />
          <div className="mt-2 flex justify-between text-xs text-[var(--color-subtle)] tabular-nums">
            <span>{min} mm</span>
            <span>{max} mm</span>
          </div>
        </div>

        {/* Visual band track */}
        <div
          className="relative mt-6 h-5 overflow-hidden rounded-full bg-[color:var(--surface-muted)]"
          aria-hidden
        >
          {BANDS.map((b) => {
            const left = ((b.min - min) / (max - min)) * 100;
            const width = ((b.max - b.min) / (max - min)) * 100;
            return (
              <div
                key={b.label}
                className="absolute top-0 h-full border-r border-white/40"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  background:
                    b.label === band.label
                      ? "var(--color-accent)"
                      : "color-mix(in srgb, var(--color-accent) 18%, transparent)",
                }}
                title={b.label}
              />
            );
          })}
          <div
            className="absolute top-0 h-full w-[3px] bg-[var(--text)]"
            style={{ left: `calc(${pct}% - 1.5px)` }}
          />
        </div>

        <p className="mt-6 text-3xl font-semibold tabular-nums text-[var(--text)]">
          {mm} mm
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
          {band.label}
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          What this band feels like on court
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">
          {band.description}
        </p>
        <p className="mt-4 text-sm">
          <span className="font-semibold text-[var(--text)]">Suits: </span>
          <span className="text-[var(--color-muted)]">{band.suitsStyle}</span>
        </p>
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-subtle)]">
            Example frames in this band
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-secondary)]">
            {band.examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
