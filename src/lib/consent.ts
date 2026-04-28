export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "intobadminton.consent.v1";

export type ConsentMode = "global_strict" | "custom";

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

export function consentModePayload(c: ConsentPreferences) {
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.ads ? "granted" : "denied",
    ad_user_data: c.ads && !c.doNotSellShare ? "granted" : "denied",
    ad_personalization:
      c.personalization && !c.doNotSellShare ? "granted" : "denied",
  };
}
