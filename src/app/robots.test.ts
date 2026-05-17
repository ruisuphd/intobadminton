import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots metadata", () => {
  it("explicitly allows Google crawlers used for search and AdSense review", () => {
    const config = robots();

    expect(config.sitemap).toBe("https://intobadminton.com/sitemap.xml");
    expect(config).not.toHaveProperty("host");
    expect(config.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userAgent: "Mediapartners-Google",
          allow: "/",
        }),
        expect.objectContaining({
          userAgent: "Google-Display-Ads-Bot",
          allow: "/",
        }),
        expect.objectContaining({
          userAgent: "AdsBot-Google",
          allow: "/",
        }),
        expect.objectContaining({
          userAgent: "AdsBot-Google-Mobile",
          allow: "/",
        }),
        expect.objectContaining({
          userAgent: "Googlebot",
          allow: "/",
        }),
      ])
    );
  });
});
