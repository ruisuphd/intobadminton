import { describe, expect, it } from "vitest";
import { config as under150 } from "@/app/best/rackets-under-150/page";
import { config as under200 } from "@/app/best/rackets-under-200/page";

describe("hand-written price-band best-ofs", () => {
  it("keeps six unique under-$150 picks with original why copy", () => {
    expect(under150.picks).toHaveLength(6);
    expect(under150.picks.every((pick) => pick.priceUsd <= 150)).toBe(true);
    expect(new Set(under150.picks.map((pick) => pick.productId)).size).toBe(6);
    expect(under150.picks.every((pick) => pick.why.length > 80)).toBe(true);
    expect(under150.essays?.length).toBeGreaterThan(0);
  });

  it("keeps six unique under-$200 picks and does not share a template tradeoff", () => {
    expect(under200.picks).toHaveLength(6);
    expect(under200.picks.every((pick) => pick.priceUsd <= 200)).toBe(true);
    const tradeoffs = under200.picks.map((pick) => pick.tradeoff);
    expect(new Set(tradeoffs).size).toBe(tradeoffs.length);
    expect(under200.essays?.length).toBeGreaterThan(0);
  });
});
