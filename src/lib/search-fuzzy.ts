/**
 * Lightweight fuzzy helpers for client-side site search.
 * Keeps static-export friendly — no server index required.
 */

/** Edit distance cap for typo-tolerant token matching. */
export const FUZZY_MAX_DISTANCE = 1;

/** Minimum query token length before fuzzy matching is attempted. */
export const FUZZY_MIN_TOKEN_LEN = 4;

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[] = new Array(rows * cols);

  for (let i = 0; i < rows; i++) matrix[i * cols] = i;
  for (let j = 0; j < cols; j++) matrix[j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const idx = i * cols + j;
      matrix[idx] = Math.min(
        matrix[(i - 1) * cols + j] + 1,
        matrix[i * cols + (j - 1)] + 1,
        matrix[(i - 1) * cols + (j - 1)] + cost
      );
    }
  }

  return matrix[(rows - 1) * cols + (cols - 1)];
}

/** True when `token` matches `candidate` exactly or within edit distance. */
export function fuzzyTokenMatch(token: string, candidate: string): boolean {
  if (!token || !candidate) return false;
  if (token === candidate) return true;
  if (token.length < FUZZY_MIN_TOKEN_LEN || candidate.length < FUZZY_MIN_TOKEN_LEN) {
    return false;
  }
  const lenDelta = Math.abs(token.length - candidate.length);
  if (lenDelta > FUZZY_MAX_DISTANCE) return false;
  return levenshtein(token, candidate) <= FUZZY_MAX_DISTANCE;
}

/** Split searchable blob into tokens for per-word fuzzy checks. */
export function blobWords(blob: string): string[] {
  return blob.split(/[^a-z0-9]+/).filter((w) => w.length >= 2);
}

export function tokenMatchesBlob(token: string, blob: string): boolean {
  if (blob.includes(token)) return true;
  if (token.length < FUZZY_MIN_TOKEN_LEN) return false;
  for (const word of blobWords(blob)) {
    if (fuzzyTokenMatch(token, word)) return true;
  }
  return false;
}
