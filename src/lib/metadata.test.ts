import { describe, expect, it } from "vitest";
import { pageAlternates } from "@/lib/metadata";

describe("pageAlternates", () => {
  it("emits en and x-default hreflang for English-only routes", () => {
    const alt = pageAlternates("/review/yy-as-50/");
    expect(alt.canonical).toBe("/review/yy-as-50/");
    expect(alt.languages?.en).toBe(
      "https://intobadminton.com/review/yy-as-50/"
    );
    expect(alt.languages?.["x-default"]).toBe(
      "https://intobadminton.com/review/yy-as-50/"
    );
  });
});
