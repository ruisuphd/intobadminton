export type EvidenceLevel = "owned" | "tested" | "specs";

const COPY: Record<
  EvidenceLevel,
  { label: string; title: string; toneClass: string }
> = {
  owned: {
    label: "Owned by author",
    title:
      "Rui Su currently owns and plays this piece of equipment in competition.",
    toneClass:
      "bg-[var(--color-accent-soft)] text-[var(--color-accent-strong,var(--color-accent))]",
  },
  tested: {
    label: "Tested on court",
    title:
      "Rui Su has played sessions with this equipment, but does not currently own it.",
    toneClass: "bg-[var(--color-accent-soft)] text-[var(--text)]",
  },
  specs: {
    label: "Sourced from specs",
    title:
      "Recommendation is built from manufacturer specifications and community evidence, not first-hand testing.",
    toneClass:
      "bg-[color:var(--surface-muted,var(--color-accent-soft))] text-[var(--color-muted)]",
  },
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const meta = COPY[level];
  return (
    <span
      title={meta.title}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${meta.toneClass}`}
    >
      {meta.label}
    </span>
  );
}
