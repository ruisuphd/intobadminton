const BRAND_COLORS: Record<string, string> = {
  Yonex: "#004990",
  Victor: "#0054a6",
  "Li-Ning": "#c8102e",
  Mizuno: "#003087",
  Kawasaki: "#e31937",
  Kumpoo: "#1a1a1a",
  Bonny: "#2d5016",
};

function brandColor(brand: string): string {
  return BRAND_COLORS[brand] ?? "#334155";
}

function brandInitial(brand: string): string {
  const trimmed = brand.trim();
  return trimmed.charAt(0).toUpperCase() || "?";
}

/**
 * Branded SVG placeholder when no verified product image is available.
 * Keeps best-of and result rows visually balanced until first-party photos land.
 */
export function ProductImagePlaceholder({
  brand,
  name,
  size = 88,
  className = "",
}: {
  brand: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const color = brandColor(brand);
  const initial = brandInitial(brand);
  const shortName =
    name.length > 22 ? `${name.slice(0, 20).trim()}…` : name;

  return (
    <figure
      className={`shrink-0 ${className}`}
      aria-label={`${brand} ${name} — image pending`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 88 88"
        role="img"
        aria-hidden
        className="rounded-xl"
      >
        <rect width="88" height="88" rx="12" fill="var(--surface-muted, #f1f5f9)" />
        <rect x="8" y="8" width="72" height="52" rx="8" fill={color} opacity="0.12" />
        <text
          x="44"
          y="38"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill={color}
          fontFamily="system-ui, sans-serif"
        >
          {initial}
        </text>
        <text
          x="44"
          y="72"
          textAnchor="middle"
          fontSize="7"
          fill="#64748b"
          fontFamily="system-ui, sans-serif"
        >
          {shortName}
        </text>
      </svg>
    </figure>
  );
}
