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
  authorBylineEn:
    "Rui Su · Founder, IntoBadminton · Div 4 Ireland · trained under former Malaysia national and China provincial-team coaches",
  authorBylineZh:
    "Rui Su · IntoBadminton 创始人 · 爱尔兰 Div 4 联赛球员 · 师从前马来西亚国手与前中国省队教练",
} as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${companyInfo.operatorWebsite}/#organization`,
  name: companyInfo.operatorLegalName,
  alternateName: companyInfo.operatorTradingName,
  url: companyInfo.operatorWebsite,
  email: companyInfo.contactEmail,
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
    target: `${companyInfo.siteUrl}/research/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
} as const;
