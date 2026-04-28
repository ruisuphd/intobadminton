import { describe, expect, it } from "vitest";
import {
  adConsentOperational,
  consentAuditSummary,
  consentModePayload,
  defaultConsent,
  makeConsent,
  makeConsentForMode,
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

  it("keeps AdSense operationally disabled until a compliant mode is configured", () => {
    const c = makeConsent({
      analytics: true,
      ads: true,
      personalization: false,
      doNotSellShare: false,
    });

    expect(adConsentOperational(c, "disabled")).toBe(false);
    expect(adConsentOperational(c, "cmp_tcf")).toBe(true);
    expect(adConsentOperational({ ...c, ads: false }, "cmp_tcf")).toBe(false);
  });

  it("forces stored ad consent off when deployment mode is disabled", () => {
    const c = makeConsentForMode(
      {
        analytics: true,
        ads: true,
        personalization: true,
        doNotSellShare: false,
      },
      "disabled"
    );

    expect(c.analytics).toBe(true);
    expect(c.ads).toBe(false);
    expect(c.personalization).toBe(false);
  });

  it("summarizes storage categories for policy and cookie settings", () => {
    const summary = consentAuditSummary();

    expect(summary).toContainEqual(
      expect.objectContaining({
        category: "Necessary",
        legalBasis: "strictly necessary",
      })
    );
    expect(summary).toContainEqual(
      expect.objectContaining({
        category: "Advertising",
        defaultState: "off",
      })
    );
  });
});
