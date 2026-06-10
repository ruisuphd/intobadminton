import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { EvidenceCards } from "@/components/EvidenceCards";

describe("EvidenceCards", () => {
  it("renders creator-video card for Astrox 88D Pro PDP evidence", () => {
    const html = renderToStaticMarkup(
      <EvidenceCards productId="yy-astrox-88d-pro-2024" />
    );
    expect(html).toContain("Creator video");
    expect(html).toContain("Watch on YouTube");
    expect(html).toContain("i.ytimg.com/vi/c-q1ppdC-AU");
  });

  it("renders creator-video from sourceUrls for EXBOLT 63", () => {
    const html = renderToStaticMarkup(
      <EvidenceCards productId="yy-exbolt-63" />
    );
    expect(html).toContain("Creator video");
    expect(html).toContain("i.ytimg.com/vi/DbQyBZt3FWs");
    expect(html).toContain("Reddit string discussion");
  });
});
