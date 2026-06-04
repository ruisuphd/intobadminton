import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  clearNotifyMeIntent,
  getNotifyMeIntent,
  setNotifyMeIntent,
} from "./notify-me";

function installLocalStorageMock() {
  const store = new Map<string, string>();
  const mock = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
  };
  vi.stubGlobal("localStorage", mock);
}

describe("notify-me", () => {
  beforeAll(() => {
    installLocalStorageMock();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("stores and retrieves intent per product", () => {
    setNotifyMeIntent("yonex-arcsaber-11-pro", "Player@Example.com");
    const row = getNotifyMeIntent("yonex-arcsaber-11-pro");
    expect(row?.email).toBe("player@example.com");
    expect(row?.productId).toBe("yonex-arcsaber-11-pro");
  });

  it("clears intent", () => {
    setNotifyMeIntent("victor-aurora", "a@b.co");
    clearNotifyMeIntent("victor-aurora");
    expect(getNotifyMeIntent("victor-aurora")).toBeNull();
  });
});
