/**
 * Affiliate link plumbing for outbound product links.
 *
 * Tags are read from public env vars so editors can deploy with or without
 * a live partner program. Links that resolve without a tag fall back to a
 * standard outbound link — the `rel="sponsored ..."` is still attached so
 * the relationship is disclosed honestly even before tags are wired in.
 */

export type AffiliateStore =
  | "amazon"
  | "amazon-uk"
  | "yonex-direct"
  | "victor-direct"
  | "li-ning-direct";

export type AffiliateLinkInput = {
  /** Partner store identifier. */
  store: AffiliateStore;
  /** Full destination URL (https://...). */
  url: string;
  /**
   * Optional SKU or partner identifier. Logged to analytics; not appended
   * to the URL unless the store-specific shaper uses it.
   */
  sku?: string;
};

export type AffiliateLinkOutput = {
  href: string;
  rel: string;
  target: "_blank";
  store: AffiliateStore;
  sku?: string;
  /** True when a partner tag was successfully appended. */
  tagged: boolean;
};

const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

/**
 * NEXT_PUBLIC env vars must be read via static property access, not a
 * dynamic key lookup, so Next.js's build-time inliner replaces them in
 * the client bundle. A `process.env[name]` lookup with a runtime string
 * resolves to `undefined` in the browser and would silently drop our
 * affiliate tags from every link.
 */
function amazonUsTag(): string | undefined {
  const value = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG;
  return value && value.length > 0 ? value : undefined;
}

function amazonUkTag(): string | undefined {
  const value = process.env.NEXT_PUBLIC_AMAZON_UK_ASSOCIATES_TAG;
  return value && value.length > 0 ? value : undefined;
}

function withQueryParam(
  inputUrl: string,
  key: string,
  value: string
): { url: string; ok: boolean } {
  try {
    const parsed = new URL(inputUrl);
    parsed.searchParams.set(key, value);
    return { url: parsed.toString(), ok: true };
  } catch {
    return { url: inputUrl, ok: false };
  }
}

export function buildAffiliateLink(
  input: AffiliateLinkInput
): AffiliateLinkOutput {
  let href = input.url;
  let tagged = false;

  switch (input.store) {
    case "amazon": {
      const tag = amazonUsTag();
      if (tag) {
        const result = withQueryParam(input.url, "tag", tag);
        href = result.url;
        tagged = result.ok;
      }
      break;
    }
    case "amazon-uk": {
      const tag = amazonUkTag();
      if (tag) {
        const result = withQueryParam(input.url, "tag", tag);
        href = result.url;
        tagged = result.ok;
      }
      break;
    }
    case "yonex-direct":
    case "victor-direct":
    case "li-ning-direct":
      // Brand-direct partner programs don't use a URL query tag yet.
      // Keep the link clean and rely on `rel="sponsored"` plus the
      // GA4 click event for attribution.
      break;
  }

  return {
    href,
    rel: AFFILIATE_REL,
    target: "_blank",
    store: input.store,
    sku: input.sku,
    tagged,
  };
}

export const AFFILIATE_REL_VALUE = AFFILIATE_REL;
