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

  /*
   * Ad regions now exist on the review and product templates, which carry the
   * bulk of the site's traffic. That makes "disabled means nothing renders" a
   * much more load-bearing guarantee than it was when slots only sat on a
   * handful of hub pages — a regression here would put live ad units on every
   * review page while AdSense is still reviewing the site.
   */
  it("stays off on high-traffic templates regardless of consent or GPC", () => {
    for (const adsConsent of [true, false]) {
      for (const doNotSellShare of [true, false]) {
        expect(
          canRenderAdSlot({
            client: "ca-pub-9641207581771694",
            slot: "1234567890",
            adsConsent,
            doNotSellShare,
            operationalMode: "disabled",
          })
        ).toBe(false);
      }
    }
  });

  it("honours Global Privacy Control even once ads are enabled", () => {
    expect(
      canRenderAdSlot({
        client: "ca-pub-9641207581771694",
        slot: "1234567890",
        adsConsent: true,
        doNotSellShare: true,
        operationalMode: "cmp_tcf",
      })
    ).toBe(false);
  });

  it("renders nothing when inventory is blocked, even when enabled", () => {
    expect(
      canRenderAdSlot({
        client: "ca-pub-9641207581771694",
        slot: "1234567890",
        adsConsent: true,
        operationalMode: "cmp_tcf",
        inventoryAllowed: false,
      })
    ).toBe(false);
  });

  it("renders nothing when no slot id is configured, even when enabled", () => {
    // Slot regions ship before slot ids exist. Until each is given one in
    // NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT they must stay invisible rather than
    // emitting an empty <ins> that AdSense flags as a policy issue.
    expect(
      canRenderAdSlot({
        client: "ca-pub-9641207581771694",
        slot: undefined,
        adsConsent: true,
        operationalMode: "cmp_tcf",
      })
    ).toBe(false);
  });
});
