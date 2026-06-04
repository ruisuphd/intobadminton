import { describe, expect, it } from "vitest";
import { buildPriceBandRacketsConfig } from "@/lib/price-band-best";

describe("buildPriceBandRacketsConfig", () => {
  it("builds picks from catalogue under max price", () => {
    const { config } = buildPriceBandRacketsConfig("rackets-under-100", 100, {
      title: "Test",
      description: "Test desc",
      breadcrumbLabel: "Under $100",
      pageTitle: "Under $100",
      dek: "Test dek",
    });
    expect(config.slug).toBe("rackets-under-100");
    expect(config.picks.length).toBeGreaterThan(0);
    expect(config.picks.every((p) => p.priceUsd <= 100)).toBe(true);
  });
});
