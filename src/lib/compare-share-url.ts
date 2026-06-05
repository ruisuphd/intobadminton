/** Max products in the compare tray — must match ProfileContext. */
export const COMPARE_SHARE_MAX = 3;

/**
 * Parse `?p=id1,id2` from a compare share URL.
 * Returns null when not on `/compare` or when `p` is missing/invalid.
 */
export function parseCompareShareIds(
  pathname: string,
  search: string
): string[] | null {
  if (!pathname.includes("/compare")) return null;
  const raw = new URLSearchParams(search).get("p");
  if (!raw) return null;
  const ids = raw
    .split(",")
    .map((s) => s.trim())
    .filter((id) => id.length > 0)
    .slice(0, COMPARE_SHARE_MAX);
  return ids.length > 0 ? ids : null;
}
