import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  AFFILIATE_REL_VALUE,
  buildAffiliateLink,
} from "@/lib/affiliate";

describe("buildAffiliateLink", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG;
    delete process.env.NEXT_PUBLIC_AMAZON_UK_ASSOCIATES_TAG;
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("always returns the sponsored rel attribute", () => {
    const link = buildAffiliateLink({
      store: "amazon",
      url: "https://www.amazon.com/dp/B0XXXX/",
    });
    expect(link.rel).toBe(AFFILIATE_REL_VALUE);
    expect(link.target).toBe("_blank");
  });

  it("appends the Amazon Associates tag when configured", () => {
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG = "intobad-20";
    const link = buildAffiliateLink({
      store: "amazon",
      url: "https://www.amazon.com/dp/B0XXXX/",
    });
    expect(link.href).toContain("tag=intobad-20");
    expect(link.tagged).toBe(true);
  });

  it("leaves the URL unchanged when no tag is configured", () => {
    const link = buildAffiliateLink({
      store: "amazon",
      url: "https://www.amazon.com/dp/B0XXXX/",
    });
    expect(link.href).toBe("https://www.amazon.com/dp/B0XXXX/");
    expect(link.tagged).toBe(false);
  });

  it("keeps brand-direct links clean (no query tag)", () => {
    const link = buildAffiliateLink({
      store: "yonex-direct",
      url: "https://us.yonex.com/products/example",
    });
    expect(link.href).toBe("https://us.yonex.com/products/example");
    expect(link.tagged).toBe(false);
    expect(link.rel).toBe(AFFILIATE_REL_VALUE);
  });

  it("supports a separate UK Amazon tag", () => {
    process.env.NEXT_PUBLIC_AMAZON_UK_ASSOCIATES_TAG = "intobaduk-21";
    const link = buildAffiliateLink({
      store: "amazon-uk",
      url: "https://www.amazon.co.uk/dp/B0YYYY/",
    });
    expect(link.href).toContain("tag=intobaduk-21");
    expect(link.tagged).toBe(true);
  });

  it("does not crash on a malformed URL", () => {
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG = "intobad-20";
    const link = buildAffiliateLink({
      store: "amazon",
      url: "not a url",
    });
    expect(link.href).toBe("not a url");
    expect(link.tagged).toBe(false);
  });
});
