import Link from "next/link";
import { segmentGlossaryAutolinks } from "@/lib/glossary-autolink";

export function AutolinkedText({
  text,
  skipTermIds,
  className,
}: {
  text: string;
  skipTermIds?: ReadonlySet<string>;
  className?: string;
}) {
  const segments = segmentGlossaryAutolinks(text, { skipIds: skipTermIds });

  return (
    <p className={className}>
      {segments.map((segment, index) =>
        segment.type === "text" ? (
          <span key={index}>{segment.value}</span>
        ) : (
          <Link
            key={index}
            href={segment.href}
            className="text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-2 hover:decoration-[var(--color-accent)]"
          >
            {segment.value}
          </Link>
        )
      )}
    </p>
  );
}
