import { describe, expect, it } from "vitest";
import { catalogProductById } from "@/lib/catalog-products";
import {
  parseYoutubeWatchId,
  youtubeEvidenceForProduct,
} from "@/lib/youtube-evidence";

describe("youtube evidence", () => {
  it("parses standard watch URLs", () => {
    expect(
      parseYoutubeWatchId("https://www.youtube.com/watch?v=c-q1ppdC-AU")
    ).toBe("c-q1ppdC-AU");
    expect(parseYoutubeWatchId("https://example.com/watch?v=abc")).toBeNull();
  });

  it("prefers review-evidence rows for Astrox 88D Pro", () => {
    const product = catalogProductById("yy-astrox-88d-pro-2024");
    expect(product).toBeTruthy();
    const ref = youtubeEvidenceForProduct(product!);
    expect(ref?.videoId).toBe("c-q1ppdC-AU");
    expect(ref?.sourceName).toContain("YouTube");
  });

  it("prefers review-evidence rows for EXBOLT 63", () => {
    const product = catalogProductById("yy-exbolt-63");
    expect(product).toBeTruthy();
    const ref = youtubeEvidenceForProduct(product!);
    expect(ref?.videoId).toBe("DbQyBZt3FWs");
    expect(ref?.sourceName).toContain("YouTube");
    expect(ref?.description).toContain("EXBOLT 63");
  });
});
