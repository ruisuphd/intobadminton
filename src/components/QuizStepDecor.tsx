/** Decorative step icons for the finder funnel (aria-hidden). */

export function QuizStepHint({ children }: { children: string }) {
  return (
    <p className="mb-4 rounded-xl bg-[color:var(--surface-muted)] px-4 py-3 text-xs leading-relaxed text-[var(--color-muted)]">
      <span className="font-medium text-[var(--text)]">Why this matters: </span>
      {children}
    </p>
  );
}

export function QuizOptionGlyph({
  kind,
}: {
  kind: "level" | "singles" | "doubles" | "mixed" | "style" | "racket" | "shoes" | "string" | "grip" | "bag" | "shuttle" | "body";
}) {
  const common = "h-8 w-8 shrink-0 text-[var(--color-accent)]";
  switch (kind) {
    case "level":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <path fill="currentColor" d="M6 24h20v2H6zm2-8 4-6 4 4 6-8 6 10H8z" />
        </svg>
      );
    case "singles":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="8" r="3" fill="currentColor" />
          <path fill="currentColor" d="M10 28c0-6 2.7-9 6-9s6 3 6 9H10z" />
        </svg>
      );
    case "doubles":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <circle cx="11" cy="9" r="2.5" fill="currentColor" />
          <circle cx="21" cy="9" r="2.5" fill="currentColor" />
          <path fill="currentColor" d="M6 26c0-4 2-6 5-6s5 2 5 6H6zm10 0c0-4 2-6 5-6s5 2 5 6H16z" />
        </svg>
      );
    case "mixed":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <circle cx="12" cy="9" r="2.5" fill="currentColor" />
          <circle cx="20" cy="9" r="2.5" fill="currentColor" opacity="0.65" />
          <path fill="currentColor" d="M7 26c0-4 2.2-6 5-6 2.2 0 4 1.4 5 4H7zm8 0c0-3 1.8-5 4.5-5H23c1.5 0 2.5 1.2 2.5 3v2H15z" />
        </svg>
      );
    case "style":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <path fill="currentColor" d="M6 20 16 6l10 14H6zm5 2h10l-2 4H13l-2-4z" />
        </svg>
      );
    case "racket":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <ellipse cx="22" cy="10" rx="6" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <path fill="currentColor" d="M4 28 18 12l2 2L6 28H4z" />
        </svg>
      );
    case "shoes":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <path fill="currentColor" d="M4 20c4-2 8-2 12 0 4 2 8 2 12 0v4H4v-4z" />
        </svg>
      );
    case "string":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <path fill="none" stroke="currentColor" strokeWidth="2" d="M8 8c8 8 8 16 16 16" />
        </svg>
      );
    case "grip":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <rect x="12" y="6" width="8" height="20" rx="3" fill="currentColor" />
        </svg>
      );
    case "bag":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <path fill="currentColor" d="M10 12h12l2 14H8l2-14zm4-4h4l1 4h-6l1-4z" />
        </svg>
      );
    case "shuttle":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <path fill="currentColor" d="M16 4 22 14H10L16 4zm0 18c-4 0-7 2-7 6h14c0-4-3-6-7-6z" />
        </svg>
      );
    case "body":
      return (
        <svg className={common} viewBox="0 0 32 32" aria-hidden>
          <circle cx="16" cy="9" r="3" fill="currentColor" />
          <path fill="currentColor" d="M10 28c0-5 2.7-8 6-8s6 3 6 8H10z" />
        </svg>
      );
    default:
      return null;
  }
}
