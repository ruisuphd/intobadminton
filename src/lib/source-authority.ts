import type { ProductRecord } from "@/lib/types/product";

export type SourceAuthorityLevel =
  | "official_product_page"
  | "official_brand_page"
  | "third_party"
  | "invalid_url";

export type SourceAuthority = {
  level: SourceAuthorityLevel;
  label: string;
  canVerifySpecs: boolean;
  host?: string;
};

const OFFICIAL_HOSTS_BY_BRAND: Record<string, readonly string[]> = {
  Yonex: ["yonex.com"],
  Victor: ["victorsport.com"],
  "Li-Ning": ["lining.com", "li-ning.com", "li-ning.com.cn"],
  Mizuno: ["mizuno.com", "mizunoshop.net"],
  ASICS: ["asics.com"],
};

const GENERIC_OFFICIAL_PATHS = new Set([
  "",
  "/",
  "/badminton",
  "/products",
  "/mobile/instructions.html",
  "/other/instructions.html",
  "/product-usage-instructions",
  "/index.html",
]);

function hostMatches(hostname: string, allowedBaseHost: string): boolean {
  return hostname === allowedBaseHost || hostname.endsWith(`.${allowedBaseHost}`);
}

function sourceUrl(product: ProductRecord): URL | null {
  try {
    return new URL(product.officialSourceUrl);
  } catch {
    return null;
  }
}

export function sourceAuthorityForProduct(product: ProductRecord): SourceAuthority {
  const url = sourceUrl(product);
  if (!url) {
    return {
      level: "invalid_url",
      label: "Invalid source URL",
      canVerifySpecs: false,
    };
  }

  const allowedHosts = OFFICIAL_HOSTS_BY_BRAND[product.brand] ?? [];
  const hostIsOfficial = allowedHosts.some((host) =>
    hostMatches(url.hostname, host)
  );

  if (!hostIsOfficial) {
    return {
      level: "third_party",
      label: "Third-party source",
      canVerifySpecs: false,
      host: url.hostname,
    };
  }

  const path = url.pathname.replace(/\/+$/, "") || "/";
  if (GENERIC_OFFICIAL_PATHS.has(path)) {
    return {
      level: "official_brand_page",
      label: "Official brand page, not product-specific",
      canVerifySpecs: false,
      host: url.hostname,
    };
  }

  return {
    level: "official_product_page",
    label: "Official product page",
    canVerifySpecs: true,
    host: url.hostname,
  };
}
