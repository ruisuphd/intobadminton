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

  it("builds under-200 band with higher cap", () => {
    const { config } = buildPriceBandRacketsConfig("rackets-under-200", 200, {
      title: "Test",
      description: "Test desc",
      breadcrumbLabel: "Under $200",
      pageTitle: "Under $200",
      dek: "Test dek",
    });
    expect(config.picks.every((p) => p.priceUsd <= 200)).toBe(true);
    expect(config.picks.length).toBeGreaterThan(0);
  });
});
