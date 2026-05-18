import type { ScoredProduct } from "@/lib/types/product";

/**
 * Compact visual fit-score badge. Reuses the band thresholds already used in
 * ResultCard.fitScoreBand so the visible label and tone stay consistent
 * everywhere a score is rendered.
 */

type Band = {
  label: string;
  toneClass: string;
  ringColor: string;
};

function bandFor(fitScore: number): Band {
  const score = fitScore * 100;
  if (score >= 80) {
    return {
      label: "Strong match",
      toneClass: "text-emerald-700",
      ringColor: "var(--color-success)",
    };
  }
  if (score >= 65) {
    return {
      label: "Solid match",
      toneClass: "text-[var(--color-accent)]",
      ringColor: "var(--color-accent)",
    };
  }
  if (score >= 50) {
    return {
      label: "Moderate match",
      toneClass: "text-amber-700",
      ringColor: "var(--color-warning)",
    };
  }
  return {
    label: "Weak match",
    toneClass: "text-[var(--color-subtle)]",
    ringColor: "var(--color-muted)",
  };
}

export function FitScoreBadge({
  fitScore,
  size = 56,
  showLabel = true,
}: {
  /** Normalised score in [0, 1]. */
  fitScore: number;
  /** Ring diameter in pixels. */
  size?: number;
  /** Render the textual "Strong match" / "Solid match" etc. next to the ring. */
  showLabel?: boolean;
}) {
  const score = Math.round(fitScore * 100);
  const band = bandFor(fitScore);

  // Conic-gradient ring. Use the score as the fill percentage.
  const ringStyle: React.CSSProperties = {
    width: size,
    height: size,
    background: `conic-gradient(${band.ringColor} ${score}%, color-mix(in srgb, ${band.ringColor} 15%, transparent) 0)`,
  };

  return (
    <span
      className="inline-flex items-center gap-3"
      aria-label={`Fit score ${score} out of 100, ${band.label}`}
    >
      <span
        className="relative shrink-0 rounded-full"
        style={ringStyle}
        role="img"
      >
        <span
          className="absolute inset-[3px] flex items-center justify-center rounded-full bg-[var(--surface)]"
        >
          <span
            className={`text-sm font-semibold ${band.toneClass}`}
            style={{ fontSize: size * 0.32 }}
          >
            {score}
          </span>
        </span>
      </span>
      {showLabel && (
        <span className="flex flex-col">
          <span className={`text-sm font-semibold ${band.toneClass}`}>
            {band.label}
          </span>
          <span className="text-xs text-[var(--color-subtle)]">fit score</span>
        </span>
      )}
    </span>
  );
}

/**
 * Convenience wrapper that pulls the score directly off a ScoredProduct.
 * Use this in any result-list context to avoid re-typing the prop.
 */
export function ProductFitScoreBadge({
  product,
  size,
  showLabel,
}: {
  product: ScoredProduct;
  size?: number;
  showLabel?: boolean;
}) {
  return (
    <FitScoreBadge
      fitScore={product.fitScore}
      size={size}
      showLabel={showLabel}
    />
  );
}
