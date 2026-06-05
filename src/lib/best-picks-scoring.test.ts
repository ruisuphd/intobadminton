import { describe, expect, it } from "vitest";
import { illustrativeFitForProductId } from "@/lib/best-picks-scoring";

describe("illustrativeFitForProductId", () => {
  it("returns a scored row for a known catalog id", () => {
    const scored = illustrativeFitForProductId("yy-arcsaber-7-pro");
    expect(scored).not.toBeNull();
    expect(scored!.fitScore).toBeGreaterThan(0);
    expect(scored!.fitScore).toBeLessThanOrEqual(1);
  });

  it("returns null when productId is missing or unknown", () => {
    expect(illustrativeFitForProductId(undefined)).toBeNull();
    expect(illustrativeFitForProductId("not-a-real-id")).toBeNull();
  });
});
