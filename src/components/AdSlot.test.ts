import { describe, expect, it } from "vitest";
import { canRenderAdSlot } from "@/components/AdSlot";

describe("canRenderAdSlot", () => {
  it("requires an AdSense client, slot id, and ads consent", () => {
    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: "1234567890",
        adsConsent: true,
      })
    ).toBe(true);

    expect(
      canRenderAdSlot({
        client: undefined,
        slot: "1234567890",
        adsConsent: true,
      })
    ).toBe(false);

    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: undefined,
        adsConsent: true,
      })
    ).toBe(false);

    expect(
      canRenderAdSlot({
        client: "ca-pub-1234567890123456",
        slot: "1234567890",
        adsConsent: false,
      })
    ).toBe(false);
  });
});
