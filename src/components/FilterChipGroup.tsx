"use client";

type Chip = {
  value: string | null;
  label: string;
};

export function FilterChipGroup({
  label,
  chips,
  active,
  onChange,
}: {
  label: string;
  chips: Chip[];
  active: string | null;
  onChange: (value: string | null) => void;
}) {
  if (chips.length <= 1) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label={label}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
        {label}
      </span>
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={() => onChange(chip.value)}
          className={
            active === chip.value ? "chip chip-primary" : "chip chip-secondary"
          }
          aria-pressed={active === chip.value}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
