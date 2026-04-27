import { describe, expect, it } from "vitest";
import {
  consentModePayload,
  defaultConsent,
  makeConsent,
  normalizeConsent,
} from "@/lib/consent";

describe("consent", () => {
  it("defaults to privacy-by-default", () => {
    const c = defaultConsent();
    expect(c.analytics).toBe(false);
    expect(c.ads).toBe(false);
    expect(c.personalization).toBe(false);
  });

  it("honors Global Privacy Control by default", () => {
    const c = defaultConsent(true);
    expect(c.doNotSellShare).toBe(true);
    expect(c.ads).toBe(false);
    expect(c.personalization).toBe(false);
  });

  it("forces ads and personalization off when do-not-sell/share is enabled", () => {
    const c = makeConsent({
      analytics: true,
      ads: true,
      personalization: true,
      doNotSellShare: true,
    });

    expect(c.analytics).toBe(true);
    expect(c.ads).toBe(false);
    expect(c.personalization).toBe(false);
  });

  it("maps consent to Google Consent Mode v2 payload", () => {
    expect(
      consentModePayload(
        makeConsent({
          analytics: true,
          ads: true,
          personalization: false,
          doNotSellShare: false,
        })
      )
    ).toEqual({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "denied",
    });
  });

  it("rejects incompatible stored versions", () => {
    expect(normalizeConsent({ version: 999 }, false)).toEqual(defaultConsent());
  });
});
