import { describe, expect, it } from "vitest";
import { listEditorialUpdates } from "@/lib/editorial-updates";

describe("listEditorialUpdates", () => {
  it("returns rows sorted by lastReviewedAt descending", () => {
    const rows = listEditorialUpdates(20);
    expect(rows.length).toBeGreaterThan(0);
    for (let i = 1; i < rows.length; i++) {
      expect(rows[i - 1].lastReviewedAt >= rows[i].lastReviewedAt).toBe(true);
    }
  });

  it("includes the claims registry and string feel guide when registered", () => {
    const rows = listEditorialUpdates(200);
    expect(rows.some((r) => r.path === "/data/")).toBe(true);
  });

  it("includes review articles", () => {
    const rows = listEditorialUpdates(200);
    expect(rows.some((r) => r.kind === "review")).toBe(true);
  });

  it("does not list hub index routes", () => {
    const rows = listEditorialUpdates(200);
    expect(rows.some((r) => r.path === "/best/")).toBe(false);
    expect(rows.some((r) => r.path === "/guides/")).toBe(false);
  });
});
