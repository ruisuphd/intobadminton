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
    url: `${companyInfo.siteUrl}/intobadminton-og.png`,
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

// `potentialAction.SearchAction` is intentionally omitted: until `/research/`
// is a functional search results page (not the current static placeholder),
// declaring the SearchAction tells Google we have a site search that does
// nothing — Google can demote rich-result eligibility for broken claims. See
// the audit plan P5 note; restore once a real search lands.
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
} as const;
