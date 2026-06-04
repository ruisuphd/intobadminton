import Link from "next/link";
import {
  segmentGlossaryLinks,
  type GlossaryLink,
} from "@/lib/glossary-autolink";

export function GlossaryLinkedText({
  body,
  glossaryLinks,
}: {
  body: string;
  glossaryLinks?: GlossaryLink[];
}) {
  const segments = segmentGlossaryLinks(body, glossaryLinks);

  return (
    <>
      {segments.map((segment, index) =>
        segment.type === "text" ? (
          <span key={`t-${index}`}>{segment.value}</span>
        ) : (
          <Link
            key={`l-${segment.termId}-${index}`}
            href={segment.href}
            className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent)]/30 underline-offset-2 hover:decoration-[var(--color-accent)]"
          >
            {segment.value}
          </Link>
        )
      )}
    </>
  );
}
