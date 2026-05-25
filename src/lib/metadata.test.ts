import { describe, expect, it } from "vitest";
import { pageAlternates } from "@/lib/metadata";

describe("pageAlternates", () => {
  it("emits en and x-default hreflang for English-only routes", () => {
    const alt = pageAlternates("/review/yonex-aerosensa-50-shuttle-review/");
    expect(alt.canonical).toBe("/review/yonex-aerosensa-50-shuttle-review/");
    expect(alt.languages?.en).toBe(
      "https://intobadminton.com/review/yonex-aerosensa-50-shuttle-review/"
    );
    expect(alt.languages?.["x-default"]).toBe(
      "https://intobadminton.com/review/yonex-aerosensa-50-shuttle-review/"
    );
  });
});
