import type { ScoredProduct } from "@/lib/types/product";

/**
 * Five-axis radar chart for a ScoredProduct's fit subscores
 * (style / discipline / level / budget / body). Pure SVG, zero deps, ~120 LOC.
 *
 * Each subscore comes in [0, 1] from the scoring engine. The chart plots them
 * on a unit pentagon and overlays a filled polygon. Used in the per-product
 * review pages and in result detail panels.
 */

const AXES = [
  { key: "style", label: "Style" },
  { key: "discipline", label: "Discipline" },
  { key: "level", label: "Level" },
  { key: "budget", label: "Budget" },
  { key: "body", label: "Body" },
] as const;

type AxisKey = (typeof AXES)[number]["key"];

type Subscores = Record<AxisKey, number>;

function polarToCartesian(angle: number, radius: number) {
  // Angle 0 points up; rotate clockwise.
  const rad = angle - Math.PI / 2;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export function FitScoreRadar({
  subscores,
  size = 220,
}: {
  subscores: Subscores;
  /** Outer SVG width/height in pixels. */
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.36;
  const labelRadius = size * 0.45;
  const ringLevels = [0.25, 0.5, 0.75, 1];

  const points = AXES.map((axis, i) => {
    const angle = (i / AXES.length) * Math.PI * 2;
    const value = Math.max(0, Math.min(1, subscores[axis.key] ?? 0));
    return polarToCartesian(angle, maxRadius * value);
  });

  const polygonPoints = points
    .map((p) => `${(cx + p.x).toFixed(1)},${(cy + p.y).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label={`Fit-score breakdown: ${AXES.map(
        (a) => `${a.label} ${Math.round((subscores[a.key] ?? 0) * 100)}`
      ).join(", ")}`}
      className="block"
    >
      {/* Grid rings */}
      {ringLevels.map((level) => {
        const ringPoints = AXES.map((_, i) => {
          const angle = (i / AXES.length) * Math.PI * 2;
          const p = polarToCartesian(angle, maxRadius * level);
          return `${(cx + p.x).toFixed(1)},${(cy + p.y).toFixed(1)}`;
        }).join(" ");
        return (
          <polygon
            key={level}
            points={ringPoints}
            fill="none"
            stroke="var(--line)"
            strokeWidth={1}
          />
        );
      })}

      {/* Axis spokes */}
      {AXES.map((_, i) => {
        const angle = (i / AXES.length) * Math.PI * 2;
        const p = polarToCartesian(angle, maxRadius);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + p.x}
            y2={cy + p.y}
            stroke="var(--line)"
            strokeWidth={1}
          />
        );
      })}

      {/* Score polygon */}
      <polygon
        points={polygonPoints}
        fill="var(--color-accent-soft)"
        stroke="var(--color-accent)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Vertex dots */}
      {points.map((p, i) => (
        <circle
          key={`dot-${i}`}
          cx={cx + p.x}
          cy={cy + p.y}
          r={3}
          fill="var(--color-accent)"
        />
      ))}

      {/* Labels */}
      {AXES.map((axis, i) => {
        const angle = (i / AXES.length) * Math.PI * 2;
        const p = polarToCartesian(angle, labelRadius);
        const x = cx + p.x;
        const y = cy + p.y;
        const value = Math.round((subscores[axis.key] ?? 0) * 100);
        return (
          <text
            key={axis.key}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="var(--color-muted)"
            fontWeight={500}
          >
            <tspan>{axis.label}</tspan>
            <tspan
              x={x}
              dy={12}
              fill="var(--text)"
              fontWeight={600}
            >
              {value}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}

export function ProductFitScoreRadar({
  product,
  size,
}: {
  product: ScoredProduct;
  size?: number;
}) {
  return <FitScoreRadar subscores={product.subscores} size={size} />;
}
