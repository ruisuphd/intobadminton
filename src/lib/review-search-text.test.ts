import { describe, expect, it } from "vitest";
import type { BlogArticle } from "@/lib/blog";
import { reviewSearchTokens } from "./review-search-text";

const sample: BlogArticle = {
  slug: "li-ning-l69-string-review",
  updatedAt: "2026-05-01",
  title: "Li-Ning L69 string review",
  dek: "A thin repulsion string for advanced players.",
  verdict: "Best for players who want crisp repulsion at high tension.",
  sections: [
    {
      heading: "On-court feel",
      body: "The L69 plays stiffer than BG80 at the same tension with a sharper launch on flat drives.",
    },
  ],
  cta: "Run the string finder.",
};

describe("reviewSearchTokens", () => {
  it("includes verdict, dek, headings, and body excerpt", () => {
    const tokens = reviewSearchTokens(sample);
    expect(tokens.join(" ")).toMatch(/repulsion/i);
    expect(tokens.join(" ")).toMatch(/BG80/i);
    expect(tokens.join(" ")).toMatch(/On-court feel/i);
  });
});
