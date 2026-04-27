/** Subtle arc suggesting shuttle trajectory — used sparingly (plan §2.3.1). */
export function ShuttleMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 70 Q 100 -10 190 60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-[var(--color-accent)] opacity-40"
      />
    </svg>
  );
}
