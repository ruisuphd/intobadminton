import { getEditorialMeta } from "@/lib/editorial-meta";
import { companyInfo } from "@/lib/company";

type EditorialMetaProps = {
  /** Route path with trailing slash, e.g. "/best/beginner-rackets/". */
  path: string;
  /** Optional override when a page knows its byline already. */
  byline?: string;
  /** Visual variant — "subhead" sits under H1, "footer" reads as a fine print. */
  variant?: "subhead" | "footer";
};

function formatDate(iso: string) {
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts.map((part) => Number.parseInt(part, 10));
  if (!year || !month || !day) return iso;
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(new Date(Date.UTC(year, month - 1, day)));
}

export function EditorialMeta({
  path,
  byline,
  variant = "subhead",
}: EditorialMetaProps) {
  const meta = getEditorialMeta(path);
  if (!meta) return null;

  const author = byline ?? companyInfo.authorByline;

  const className =
    variant === "subhead"
      ? "text-sm leading-relaxed text-[var(--color-muted)]"
      : "text-xs text-[var(--color-subtle)]";

  return (
    <p className={className}>
      <span>By {author}</span>
      <span aria-hidden="true" className="px-1.5">
        ·
      </span>
      <span>
        Updated{" "}
        <time dateTime={meta.lastReviewedAt}>
          {formatDate(meta.lastReviewedAt)}
        </time>
      </span>
    </p>
  );
}
