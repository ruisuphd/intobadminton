export const companyInfo = {
  siteName: "IntoBadminton",
  siteUrl: "https://intobadminton.com",
  operatorLegalName: "Intonation Labs Pte. Ltd.",
  operatorTradingName: "Intonation Labs",
  operatorWebsite: "https://intonationlabs.com",
  founderName: "Rui Su",
  founderWebsite: "https://ruisuphd.com",
  registrationJurisdiction: "Singapore",
  contactEmail: "info@intonationlabs.com",
  privacyEmail: "info@intonationlabs.com",
  supportEmail: "info@intonationlabs.com",
  securityEmail: "info@intonationlabs.com",
  businessDescription:
    "Intonation Labs designs and builds production-grade ML systems, GenAI solutions, and real-time inference pipelines.",
  founderDescription:
    "Rui Su is the founder and director of Intonation Labs and a PhD candidate at Maynooth University. He started badminton as a child in China, played for the Maynooth University team and across multiple Dublin clubs, and currently competes in Division 4 of the Irish Badminton league. He has trained under a former Malaysian national-team player and a former Chinese provincial-team player.",
  authorByline:
    "Rui Su · Founder, IntoBadminton · Div 4 Ireland · trained under former Malaysia national and China provincial-team coaches",
} as const;

/**
 * External author profiles surfaced as `Person.sameAs` proofs (E-E-A-T).
 *
 * The YouTube entry is a PLACEHOLDER channel handle — claim the handle on
 * youtube.com and replace before the link is followed by Google. A
 * profile-only channel (no videos required) is enough for the entity
 * benefit; the VideoObject rich-result work is gated on the separate
 * "do we want to commit to video" decision in IMPROVEMENT_PLAN §3.5 #30b.
 *
 * Linking to a not-yet-claimed handle returns a YouTube error page — leave
 * that entry commented out until the channel is created.
 */
export const founderSameAs: string[] = [
  companyInfo.founderWebsite,
  // TODO: claim and uncomment once the channel handle exists.
  // "https://www.youtube.com/@intobadminton",
  // "https://twitter.com/intobadminton",
  // "https://www.linkedin.com/company/intonationlabs",
  // "https://www.reddit.com/user/intobadminton",
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${companyInfo.operatorWebsite}/#organization`,
  name: companyInfo.operatorLegalName,
  alternateName: companyInfo.operatorTradingName,
  url: companyInfo.operatorWebsite,
  email: companyInfo.contactEmail,
  logo: {
    "@type": "ImageObject",
    url: `${companyInfo.siteUrl}/intobadminton-og.jpg`,
    width: 512,
    height: 512,
  },
  founder: {
    "@type": "Person",
    name: companyInfo.founderName,
    url: companyInfo.founderWebsite,
  },
  areaServed: "Global",
  foundingLocation: {
    "@type": "Place",
    name: companyInfo.registrationJurisdiction,
  },
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${companyInfo.siteUrl}/#website`,
  name: companyInfo.siteName,
  url: companyInfo.siteUrl,
  publisher: organizationJsonLd["@id"],
  inLanguage: "en",
  description:
    "Badminton equipment recommendations for rackets, strings, shoes, and bags.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${companyInfo.siteUrl}/search/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;
