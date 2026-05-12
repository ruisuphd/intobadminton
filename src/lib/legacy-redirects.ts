import legacyDestinationData from "@/data/legacy-redirect-destinations.json";

export type LegacyLocale = "en" | "zh";

export type LegacyRedirect = {
  source: string;
  destination: string;
};

const LEGACY_LOCALES: LegacyLocale[] = ["en", "zh"];

function normalisePath(path: string) {
  const cleanPath = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
}

export const legacyRedirectDestinations = legacyDestinationData.map((path) =>
  normalisePath(path)
);

export const legacyRedirects: LegacyRedirect[] = LEGACY_LOCALES.flatMap(
  (locale) =>
    legacyRedirectDestinations.map((destination) => ({
      source:
        destination === "/" ? `/${locale}/` : `/${locale}${destination}`,
      destination,
    }))
);

export const legacyRedirectSources = legacyRedirects.map(
  (entry) => entry.source
);

const legacyRedirectMap = new Map(
  legacyRedirects.map((entry) => [entry.source, entry.destination])
);

export function redirectForLegacyPath(path: string) {
  return legacyRedirectMap.get(normalisePath(path));
}
