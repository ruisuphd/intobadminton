export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "intobadminton.consent.v1";

export type ConsentMode = "global_strict" | "custom";
export type AdOperationalMode = "disabled" | "cmp_tcf";

export type ConsentPreferences = {
  version: number;
  necessary: true;
  analytics: boolean;
  ads: boolean;
  personalization: boolean;
  doNotSellShare: boolean;
  regionMode: ConsentMode;
  updatedAt: string;
};

export type ConsentDraft = Omit<
  ConsentPreferences,
  "version" | "necessary" | "regionMode" | "updatedAt"
>;

export function defaultConsent(gpc = false): ConsentPreferences {
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: false,
    ads: false,
    personalization: false,
    doNotSellShare: gpc,
    regionMode: "global_strict",
    updatedAt: new Date(0).toISOString(),
  };
}

export function normalizeConsent(
  value: Partial<ConsentPreferences> | null | undefined,
  gpc = false
): ConsentPreferences {
  const base = defaultConsent(gpc);
  if (!value || value.version !== CONSENT_VERSION) return base;

  return {
    ...base,
    ...value,
    necessary: true,
    personalization: value.doNotSellShare ? false : Boolean(value.personalization),
    ads: value.doNotSellShare ? false : Boolean(value.ads),
  };
}

export function makeConsent(draft: ConsentDraft): ConsentPreferences {
  const doNotSellShare = Boolean(draft.doNotSellShare);
  return {
    version: CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(draft.analytics),
    ads: doNotSellShare ? false : Boolean(draft.ads),
    personalization: doNotSellShare ? false : Boolean(draft.personalization),
    doNotSellShare,
    regionMode: "global_strict",
    updatedAt: new Date().toISOString(),
  };
}

export function makeConsentForMode(
  draft: ConsentDraft,
  mode: AdOperationalMode | string | undefined
): ConsentPreferences {
  if (mode !== "cmp_tcf") {
    return makeConsent({
      ...draft,
      ads: false,
      personalization: false,
    });
  }
  return makeConsent(draft);
}

export function consentModePayload(c: ConsentPreferences) {
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.ads ? "granted" : "denied",
    ad_user_data: c.ads && !c.doNotSellShare ? "granted" : "denied",
    ad_personalization:
      c.personalization && !c.doNotSellShare ? "granted" : "denied",
  };
}

export function adConsentOperational(
  c: Pick<ConsentPreferences, "ads" | "doNotSellShare">,
  mode: AdOperationalMode | string | undefined
) {
  return Boolean(c.ads && !c.doNotSellShare && mode === "cmp_tcf");
}

export function consentAuditSummary() {
  return [
    {
      category: "Necessary",
      defaultState: "on",
      legalBasis: "strictly necessary",
      storage:
        "localStorage for consent, theme, finder profile, compare list, history, and local review drafts",
      thirdParties: "none",
    },
    {
      category: "Analytics",
      defaultState: "off",
      legalBasis: "consent",
      storage: "GA4 cookies/storage after opt-in",
      thirdParties: "Google Analytics 4",
    },
    {
      category: "Advertising",
      defaultState: "off",
      legalBasis: "consent plus compliant AdSense operational mode",
      storage: "AdSense cookies/storage after opt-in and CMP/TCF deployment mode",
      thirdParties: "Google AdSense",
    },
    {
      category: "Personalization",
      defaultState: "off",
      legalBasis: "explicit consent where lawful",
      storage: "ad personalization signals only after compliant consent",
      thirdParties: "Google AdSense",
    },
  ] as const;
}
