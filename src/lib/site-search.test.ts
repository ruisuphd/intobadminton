import { describe, expect, it } from "vitest";
import { searchRecords, type SearchRecord } from "@/lib/site-search";

const FIXTURE: SearchRecord[] = [
  {
    id: "review:yonex-astrox-99-pro",
    title: "Yonex Astrox 99 Pro review",
    href: "/review/yonex-astrox-99-pro/",
    kind: "Review",
    excerpt: "Head-heavy smash frame",
    tokens: "yonex astrox 99 pro review head-heavy smash frame",
  },
  {
    id: "product:yonex-nf1000z",
    title: "Yonex Nanoflare 1000 Z",
    href: "/review/yonex-nf1000z/",
    kind: "Product",
    excerpt: "Speed doubles frame",
    tokens: "yonex nanoflare 1000 z speed doubles",
  },
];

describe("searchRecords", () => {
  it("returns empty for blank query", () => {
    expect(searchRecords(FIXTURE, "")).toEqual([]);
    expect(searchRecords(FIXTURE, "  ")).toEqual([]);
  });

  it("ranks title matches above body-only matches", () => {
    const hits = searchRecords(FIXTURE, "yonex astrox");
    expect(hits[0]?.id).toBe("review:yonex-astrox-99-pro");
  });

  it("respects limit", () => {
    const hits = searchRecords(FIXTURE, "yonex", 1);
    expect(hits).toHaveLength(1);
  });
});
