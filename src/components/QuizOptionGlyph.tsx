type GlyphKind =
  | "singles"
  | "doubles"
  | "mixed"
  | "offensive"
  | "balanced"
  | "defensive"
  | "front_court"
  | "smash_heavy"
  | "racket"
  | "shoes"
  | "string"
  | "grip"
  | "bag"
  | "shuttle"
  | "accessory";

export function QuizOptionGlyph({
  kind,
  className = "",
}: {
  kind: GlyphKind;
  className?: string;
}) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      aria-hidden
      className={`shrink-0 text-[var(--color-accent)] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "singles" && (
        <>
          <rect x="4" y="6" width="20" height="16" rx="2" />
          <line x1="14" y1="6" x2="14" y2="22" />
        </>
      )}
      {kind === "doubles" && (
        <>
          <rect x="4" y="6" width="20" height="16" rx="2" />
          <line x1="14" y1="6" x2="14" y2="22" />
          <line x1="4" y1="14" x2="24" y2="14" />
        </>
      )}
      {kind === "mixed" && (
        <>
          <circle cx="10" cy="14" r="3" />
          <circle cx="18" cy="14" r="3" />
          <path d="M7 20 h14" />
        </>
      )}
      {(kind === "offensive" || kind === "smash_heavy") && (
        <path d="M8 20 L14 8 L20 20 M12 16 h4" />
      )}
      {kind === "balanced" && (
        <>
          <circle cx="14" cy="14" r="8" />
          <line x1="14" y1="6" x2="14" y2="22" />
          <line x1="6" y1="14" x2="22" y2="14" />
        </>
      )}
      {kind === "defensive" && (
        <path d="M6 18 Q14 6 22 18" />
      )}
      {kind === "front_court" && (
        <path d="M8 20 L14 10 L20 20 M10 16 h8" />
      )}
      {kind === "racket" && (
        <>
          <ellipse cx="14" cy="8" rx="5" ry="4" />
          <line x1="14" y1="12" x2="14" y2="24" />
        </>
      )}
      {kind === "shoes" && (
        <path d="M6 18 L10 12 h8 l4 6 H6z" />
      )}
      {kind === "string" && (
        <path d="M8 8 v12 M12 6 v16 M16 8 v12 M20 6 v16" />
      )}
      {kind === "grip" && (
        <>
          <rect x="11" y="6" width="6" height="16" rx="2" />
          <line x1="8" y1="10" x2="20" y2="10" />
          <line x1="8" y1="14" x2="20" y2="14" />
        </>
      )}
      {kind === "bag" && (
        <>
          <rect x="7" y="9" width="14" height="12" rx="2" />
          <path d="M10 9 V7 h8 v2" />
        </>
      )}
      {kind === "shuttle" && (
        <>
          <path d="M14 6 L10 14 h8 z" />
          <path d="M12 14 v6 M16 14 v6" />
        </>
      )}
      {kind === "accessory" && (
        <>
          <circle cx="14" cy="14" r="6" />
          <path d="M14 10 v8 M10 14 h8" />
        </>
      )}
    </svg>
  );
}
