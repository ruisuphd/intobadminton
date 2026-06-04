export type SearchRecord = {
  id: string;
  title: string;
  href: string;
  kind: string;
  excerpt: string;
  tokens: string;
};

export type SearchIndex = {
  generatedAt: string;
  records: SearchRecord[];
};

export type SearchHit = SearchRecord & { score: number };

function normQuery(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

/**
 * Lightweight client-side search over the prebuilt index. Title-prefix and
 * token overlap scoring — good enough for ~200 rows without a WASM index.
 */
export function searchRecords(
  records: SearchRecord[],
  query: string,
  limit = 20
): SearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const terms = normQuery(trimmed);
  if (terms.length === 0) return [];

  const qNorm = terms.join(" ");

  const scored: SearchHit[] = [];
  for (const record of records) {
    let score = 0;
    const title = record.title.toLowerCase();

    if (title.startsWith(qNorm)) score += 12;
    else if (title.includes(qNorm)) score += 8;

    for (const term of terms) {
      if (title.includes(term)) score += 4;
      if (record.tokens.includes(term)) score += 2;
    }

    if (score > 0) scored.push({ ...record, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
