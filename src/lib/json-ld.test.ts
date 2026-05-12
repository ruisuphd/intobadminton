import { describe, expect, it } from "vitest";
import { serialiseJsonLd } from "@/lib/json-ld";

describe("serialiseJsonLd", () => {
  it("escapes opening angle brackets before embedding JSON-LD in HTML", () => {
    const json = serialiseJsonLd({
      "@context": "https://schema.org",
      "@type": "Thing",
      name: "<script>alert('xss')</script>",
    });

    expect(json).toContain("\\u003cscript>");
    expect(json).not.toContain("<script>");
  });
});
