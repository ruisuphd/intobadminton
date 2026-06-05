import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import * as buttondown from "@/lib/buttondown";
import { setNotifyMeIntent, getNotifyMeIntent } from "@/lib/notify-me";
import { syncNotifyMeIntentsToButtondown } from "@/lib/notify-me-sync";

function installLocalStorageMock() {
  const store = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
  });
}

describe("syncNotifyMeIntentsToButtondown", () => {
  beforeAll(() => {
    installLocalStorageMock();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns zeros when nothing pending", async () => {
    const result = await syncNotifyMeIntentsToButtondown();
    expect(result).toEqual({ attempted: 0, synced: 0, failed: 0 });
  });

  it("clears local intent after successful Buttondown subscribe", async () => {
    setNotifyMeIntent("yy-arcsaber-11-pro", "player@example.com");
    vi.spyOn(buttondown, "subscribeViaButtondown").mockResolvedValue({ ok: true });

    const result = await syncNotifyMeIntentsToButtondown();

    expect(result).toEqual({ attempted: 1, synced: 1, failed: 0 });
    expect(getNotifyMeIntent("yy-arcsaber-11-pro")).toBeNull();
    expect(buttondown.subscribeViaButtondown).toHaveBeenCalledWith({
      email: "player@example.com",
      tag: "product:yy-arcsaber-11-pro",
    });
  });

  it("keeps local intent when Buttondown subscribe fails", async () => {
    setNotifyMeIntent("vic-aurora", "a@b.co");
    vi.spyOn(buttondown, "subscribeViaButtondown").mockResolvedValue({
      ok: false,
      message: "nope",
    });

    const result = await syncNotifyMeIntentsToButtondown();

    expect(result).toEqual({ attempted: 1, synced: 0, failed: 1 });
    expect(getNotifyMeIntent("vic-aurora")?.email).toBe("a@b.co");
  });
});
