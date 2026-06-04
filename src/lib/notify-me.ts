const STORAGE_KEY = "intobadminton.notify-me.v1";

export type NotifyMeEntry = {
  productId: string;
  email: string;
  createdAt: string;
};

type Store = Record<string, NotifyMeEntry>;

const TTL_MS = 30 * 24 * 60 * 60 * 1000;

function hasStorage(): boolean {
  return typeof localStorage !== "undefined";
}

function readStore(): Store {
  if (!hasStorage()) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Store;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Quota or privacy mode — caller still fires analytics.
  }
}

function prune(store: Store): Store {
  const cutoff = Date.now() - TTL_MS;
  const next: Store = {};
  for (const [id, entry] of Object.entries(store)) {
    if (new Date(entry.createdAt).getTime() >= cutoff) next[id] = entry;
  }
  return next;
}

export function getNotifyMeEntry(productId: string): NotifyMeEntry | null {
  const store = prune(readStore());
  return store[productId] ?? null;
}

export function saveNotifyMeIntent(productId: string, email: string): NotifyMeEntry {
  const store = prune(readStore());
  const entry: NotifyMeEntry = {
    productId,
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };
  store[productId] = entry;
  writeStore(store);
  return entry;
}

export function clearNotifyMeIntent(productId: string): void {
  const store = prune(readStore());
  delete store[productId];
  writeStore(store);
}
