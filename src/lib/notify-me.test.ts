import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  clearNotifyMeIntent,
  getNotifyMeEntry,
  saveNotifyMeIntent,
} from "./notify-me";

function mockLocalStorage() {
  const store = new Map<string, string>();
  const ls = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => {
      store.set(k, v);
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => store.clear(),
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: ls,
    configurable: true,
  });
}

describe("notify-me", () => {
  beforeEach(() => {
    mockLocalStorage();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("persists and retrieves an intent by product id", () => {
    saveNotifyMeIntent("yy-arcsaber-7-play", "Player@Example.com");
    const entry = getNotifyMeEntry("yy-arcsaber-7-play");
    expect(entry?.email).toBe("player@example.com");
    expect(entry?.productId).toBe("yy-arcsaber-7-play");
  });

  it("clears a stored intent", () => {
    saveNotifyMeIntent("vic-sonic-boom-pro", "a@b.co");
    clearNotifyMeIntent("vic-sonic-boom-pro");
    expect(getNotifyMeEntry("vic-sonic-boom-pro")).toBeNull();
  });
});
