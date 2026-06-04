/**
 * Per-product notify-me intent (client-only until Buttondown wiring).
 * Stores hashed email + product id locally; never sent to a server in this phase.
 */

const STORAGE_KEY = "intobadminton.notify-me.v1";

export type NotifyMeIntent = {
  productId: string;
  /** Lowercased email the user opted in with. */
  email: string;
  /** ISO timestamp when the intent was recorded. */
  at: string;
};

function hasStorage(): boolean {
  return typeof localStorage !== "undefined";
}

function loadAll(): NotifyMeIntent[] {
  if (!hasStorage()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is NotifyMeIntent =>
        row != null &&
        typeof row === "object" &&
        typeof (row as NotifyMeIntent).productId === "string" &&
        typeof (row as NotifyMeIntent).email === "string" &&
        typeof (row as NotifyMeIntent).at === "string"
    );
  } catch {
    return [];
  }
}

function saveAll(rows: NotifyMeIntent[]) {
  if (!hasStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    /* quota / private mode — caller still shows thanks */
  }
}

export function getNotifyMeIntent(productId: string): NotifyMeIntent | null {
  const email = loadAll().find((r) => r.productId === productId);
  return email ?? null;
}

export function setNotifyMeIntent(productId: string, email: string): NotifyMeIntent {
  const normalized = email.trim().toLowerCase();
  const next: NotifyMeIntent = {
    productId,
    email: normalized,
    at: new Date().toISOString(),
  };
  const rest = loadAll().filter((r) => r.productId !== productId);
  saveAll([next, ...rest]);
  return next;
}

export function clearNotifyMeIntent(productId: string) {
  saveAll(loadAll().filter((r) => r.productId !== productId));
}
