"use client";

import { useState } from "react";

/**
 * Scale: 1 metre = 30 SVG units. Real BWF dimensions:
 *   length 13.40 m → 402 units
 *   doubles width 6.10 m → 183 units
 * Padding 20 units on each side gives a 442 × 223 viewBox.
 *
 * Court drawn as if seen from above, doubles serve and back lines fully
 * rendered. Singles tramlines are inset 0.46 m (13.8 units) from each long
 * side. Service line is 1.98 m (59.4 units) from the net.
 */
const LEN = 13.4 * 30; // 402
const WIDTH = 6.1 * 30; // 183
const TRAM = 0.46 * 30; // 13.8
const SHORT_SERVICE = 1.98 * 30; // 59.4
const LONG_SERVICE_DOUBLES = 0.76 * 30; // 22.8

const PAD = 20;
const VB_W = LEN + PAD * 2;
const VB_H = WIDTH + PAD * 2;

const HOTSPOTS = [
  {
    id: "back-tramline",
    label: "Doubles back tramline (0.76 m from back boundary)",
    detail:
      "Doubles serves must land in front of this line. Singles ignore it.",
    x: PAD,
    y: PAD,
    w: LEN,
    h: TRAM,
  },
  {
    id: "side-tramline",
    label: "Doubles side tramline (0.46 m wide)",
    detail:
      "Doubles courts include this strip; singles courts end at the inside line.",
    x: PAD,
    y: PAD,
    w: LEN,
    h: TRAM,
  },
  {
    id: "service-court",
    label: "Service court — front half between net and short service line",
    detail:
      "Short serves and net play happen here. Short service line is 1.98 m from the net on both sides.",
    x: PAD + LEN / 2 - SHORT_SERVICE,
    y: PAD,
    w: SHORT_SERVICE,
    h: WIDTH,
  },
];

export function CourtDiagram() {
  const [hover, setHover] = useState<string | null>(null);
  const active = HOTSPOTS.find((h) => h.id === hover);

  return (
    <div className="card p-6 space-y-4">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        role="img"
        aria-label="Badminton court diagram, to BWF Laws of Badminton dimensions"
        className="block w-full h-auto bg-emerald-700/80 rounded-xl"
      >
        {/* Outer doubles court fill */}
        <rect
          x={PAD}
          y={PAD}
          width={LEN}
          height={WIDTH}
          fill="rgb(4 120 87 / 0.85)"
          stroke="white"
          strokeWidth={2}
        />

        {/* Singles inside line (tramline inner edge) */}
        <line
          x1={PAD}
          y1={PAD + TRAM}
          x2={PAD + LEN}
          y2={PAD + TRAM}
          stroke="white"
          strokeWidth={1.5}
        />
        <line
          x1={PAD}
          y1={PAD + WIDTH - TRAM}
          x2={PAD + LEN}
          y2={PAD + WIDTH - TRAM}
          stroke="white"
          strokeWidth={1.5}
        />

        {/* Doubles long service line — 0.76 m in from each back boundary */}
        <line
          x1={PAD + LONG_SERVICE_DOUBLES}
          y1={PAD}
          x2={PAD + LONG_SERVICE_DOUBLES}
          y2={PAD + WIDTH}
          stroke="white"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <line
          x1={PAD + LEN - LONG_SERVICE_DOUBLES}
          y1={PAD}
          x2={PAD + LEN - LONG_SERVICE_DOUBLES}
          y2={PAD + WIDTH}
          stroke="white"
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />

        {/* Short service line — 1.98 m on each side of the net */}
        <line
          x1={PAD + LEN / 2 - SHORT_SERVICE}
          y1={PAD}
          x2={PAD + LEN / 2 - SHORT_SERVICE}
          y2={PAD + WIDTH}
          stroke="white"
          strokeWidth={1.5}
        />
        <line
          x1={PAD + LEN / 2 + SHORT_SERVICE}
          y1={PAD}
          x2={PAD + LEN / 2 + SHORT_SERVICE}
          y2={PAD + WIDTH}
          stroke="white"
          strokeWidth={1.5}
        />

        {/* Centre service line — only between net and short service line */}
        <line
          x1={PAD + LEN / 2 - SHORT_SERVICE}
          y1={PAD + WIDTH / 2}
          x2={PAD + LEN / 2 + SHORT_SERVICE}
          y2={PAD + WIDTH / 2}
          stroke="white"
          strokeWidth={1.5}
        />

        {/* Net */}
        <line
          x1={PAD + LEN / 2}
          y1={PAD - 5}
          x2={PAD + LEN / 2}
          y2={PAD + WIDTH + 5}
          stroke="rgba(0,0,0,0.7)"
          strokeWidth={3}
        />
        <text
          x={PAD + LEN / 2}
          y={PAD + WIDTH + 14}
          textAnchor="middle"
          fontSize={9}
          fill="white"
          fontWeight={600}
        >
          NET — 1.524 m centre / 1.55 m posts
        </text>

        {/* Length / width labels */}
        <text x={PAD + LEN / 2} y={PAD - 6} textAnchor="middle" fontSize={9} fill="white">
          13.40 m
        </text>
        <text
          x={PAD + LEN + 4}
          y={PAD + WIDTH / 2}
          fontSize={9}
          fill="white"
          textAnchor="start"
          dominantBaseline="middle"
        >
          6.10 m doubles · 5.18 m singles
        </text>

        {/* Hotspots — transparent overlays */}
        {HOTSPOTS.map((h) => (
          <rect
            key={h.id}
            x={h.x}
            y={h.y}
            width={h.w}
            height={h.h}
            fill={hover === h.id ? "rgba(255,255,255,0.18)" : "transparent"}
            stroke={hover === h.id ? "white" : "transparent"}
            strokeDasharray="2 2"
            onMouseEnter={() => setHover(h.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(h.id)}
            onBlur={() => setHover(null)}
            tabIndex={0}
            role="button"
            aria-label={h.label}
            className="cursor-pointer"
          />
        ))}
      </svg>

      <p
        className="min-h-[3rem] text-sm leading-relaxed text-[var(--color-muted)]"
        aria-live="polite"
      >
        {active ? (
          <>
            <span className="font-medium text-[var(--text)]">
              {active.label}.
            </span>{" "}
            {active.detail}
          </>
        ) : (
          <>Hover or focus a region to see what it means.</>
        )}
      </p>
    </div>
  );
}
