import { describe, expect, it } from "vitest";
import { canRenderAdSlot } from "@/components/AdSlot";

describe("canRenderAdSlot", () => {
  it("requires an AdSense client, slot id, and ads consent", () => {
    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: "1234567890",
        adsConsent: true,
        operationalMode: "cmp_tcf",
      })
    ).toBe(true);

    expect(
      canRenderAdSlot({
        client: undefined,
        slot: "1234567890",
        adsConsent: true,
        operationalMode: "cmp_tcf",
      })
    ).toBe(false);

    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: undefined,
        adsConsent: true,
        operationalMode: "cmp_tcf",
      })
    ).toBe(false);

    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: "1234567890",
        adsConsent: false,
        operationalMode: "cmp_tcf",
      })
    ).toBe(false);
  });

  it("does not render ads in the default disabled operational mode", () => {
    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: "1234567890",
        adsConsent: true,
        operationalMode: "disabled",
      })
    ).toBe(false);
  });
});
