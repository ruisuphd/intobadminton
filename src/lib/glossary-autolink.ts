/**
 * Turn plain-text article bodies into glossary-linked prose.
 * Only terms declared in `section.glossaryLinks` are linked — matches the
 * CI gate in `scripts/check-glossary-links.mjs`.
 */

export type GlossaryLink = { term: string; id: string };

export type GlossaryTextSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string; termId: string };

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Split `body` into alternating plain-text and glossary-link segments.
 * Each glossary id is linked at most once (first word-boundary match).
 */
export function segmentGlossaryLinks(
  body: string,
  glossaryLinks: GlossaryLink[] | undefined
): GlossaryTextSegment[] {
  if (!glossaryLinks?.length || !body) {
    return [{ type: "text", value: body }];
  }

  const linkedIds = new Set<string>();
  const segments: GlossaryTextSegment[] = [];
  let remaining = body;

  while (remaining.length > 0) {
    let best: {
      index: number;
      length: number;
      text: string;
      link: GlossaryLink;
    } | null = null;

    for (const link of glossaryLinks) {
      if (linkedIds.has(link.id)) continue;
      const re = new RegExp(`\\b${escapeRegex(link.term)}\\b`, "i");
      const match = re.exec(remaining);
      if (!match) continue;
      if (
        !best ||
        match.index < best.index ||
        (match.index === best.index && match[0].length > best.length)
      ) {
        best = {
          index: match.index,
          length: match[0].length,
          text: match[0],
          link,
        };
      }
    }

    if (!best) {
      segments.push({ type: "text", value: remaining });
      break;
    }

    if (best.index > 0) {
      segments.push({ type: "text", value: remaining.slice(0, best.index) });
    }

    segments.push({
      type: "link",
      value: best.text,
      href: `/guides/glossary/#${best.link.id}`,
      termId: best.link.id,
    });
    linkedIds.add(best.link.id);
    remaining = remaining.slice(best.index + best.length);
  }

  return segments;
}
