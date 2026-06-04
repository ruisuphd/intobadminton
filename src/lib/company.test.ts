import { describe, expect, it } from "vitest";
import { companyInfo, organizationJsonLd, websiteJsonLd } from "@/lib/company";

describe("companyInfo", () => {
  it("uses launch-ready operator and domain facts", () => {
    expect(companyInfo.siteUrl).toBe("https://intobadminton.com");
    expect(companyInfo.operatorLegalName).toBe("Intonation Labs Pte. Ltd.");
    expect(companyInfo.contactEmail).toBe("info@intonationlabs.com");
    expect(companyInfo.registrationJurisdiction).toBe("Singapore");
  });

  it("generates SEO structured data for the live site", () => {
    expect(websiteJsonLd.url).toBe("https://intobadminton.com");
    expect(websiteJsonLd.publisher).toBe(organizationJsonLd["@id"]);
    expect(websiteJsonLd.potentialAction?.["@type"]).toBe("SearchAction");
    expect(organizationJsonLd.email).toBe("info@intonationlabs.com");
    expect(organizationJsonLd.founder.url).toBe("https://ruisuphd.com");
  });
});
