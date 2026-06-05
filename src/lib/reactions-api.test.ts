import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  fetchReactionCounts,
  reactionsApiEnabled,
  reactionsApiUrl,
  submitReaction,
  totalHelpful,
} from "@/lib/reactions-api";

describe("reactionsApiUrl", () => {
  const env = process.env;

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_REACTIONS_API_URL", "");
  });

  afterEach(() => {
    process.env = env;
    vi.unstubAllEnvs();
  });

  it("returns null when unset", () => {
    expect(reactionsApiUrl()).toBeNull();
    expect(reactionsApiEnabled()).toBe(false);
  });

  it("returns trimmed URL when set", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_REACTIONS_API_URL",
      " https://reactions.example.com/ "
    );
    expect(reactionsApiUrl()).toBe("https://reactions.example.com/");
    expect(reactionsApiEnabled()).toBe(true);
  });
});

describe("fetchReactionCounts", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns null when API URL is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_REACTIONS_API_URL", "");
    await expect(fetchReactionCounts("guide:test")).resolves.toBeNull();
  });

  it("parses counts from GET response", async () => {
    vi.stubEnv("NEXT_PUBLIC_REACTIONS_API_URL", "https://reactions.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ up: 5, down: 1, more: 2 }),
      })
    );
    const counts = await fetchReactionCounts("guide:test");
    expect(counts).toEqual({ up: 5, down: 1, more: 2 });
    expect(totalHelpful(counts!)).toBe(8);
  });
});

describe("submitReaction", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("POSTs vote and returns updated counts", async () => {
    vi.stubEnv("NEXT_PUBLIC_REACTIONS_API_URL", "https://reactions.example.com");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ up: 6, down: 1, more: 2 }),
      })
    );
    const counts = await submitReaction("guide:test", "up");
    expect(counts?.up).toBe(6);
    expect(fetch).toHaveBeenCalledWith(
      "https://reactions.example.com",
      expect.objectContaining({ method: "POST" })
    );
  });
});
