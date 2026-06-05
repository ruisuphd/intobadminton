import { describe, expect, it, vi, afterEach } from "vitest";
import { getBlogArticle } from "@/lib/blog";
import { enrichmentForReviewArticle } from "@/lib/review-article-enrichment";
import {
  buttondownConfigured,
  notifyTagForProduct,
  subscribeViaButtondown,
} from "@/lib/buttondown";

describe("enrichmentForReviewArticle", () => {
  it("returns Product schema for a mapped review slug", () => {
    const article = getBlogArticle("en", "yonex-arcsaber-7-pro-review");
    expect(article).toBeTruthy();

    const enrichment = enrichmentForReviewArticle(
      "yonex-arcsaber-7-pro-review",
      article!
    );

    expect(enrichment).not.toBeNull();
    expect(enrichment!.productSchema["@type"]).toBe("Product");
    expect(enrichment!.product.id).toBeTruthy();
  });

  it("returns Product schema for a (newly mapped) li-ning-axforce-80-review", () => {
    const article = getBlogArticle("en", "li-ning-axforce-80-review");
    expect(article).toBeTruthy();

    const enrichment = enrichmentForReviewArticle(
      "li-ning-axforce-80-review",
      article!
    );

    expect(enrichment).not.toBeNull();
    expect(enrichment!.product.id).toBe("ln-axforce-80");
  });

  it("returns Product schema for Sprint 8 mapped slugs", () => {
    const cases: [string, string][] = [
      ["yonex-nanoflare-700-review", "yy-nanoflare-700-pro-2024"],
      ["li-ning-aerus-iii-pro-shoes-review", "ln-saga-iii-pro"],
      ["victor-thruster-falcon-review", "vic-thruster-falcon-enhanced"],
    ];
    for (const [slug, productId] of cases) {
      const article = getBlogArticle("en", slug);
      expect(article).toBeTruthy();
      const enrichment = enrichmentForReviewArticle(slug, article!);
      expect(enrichment?.product.id).toBe(productId);
    }
  });

  it("returns null when slug has no product map", () => {
    const article = getBlogArticle("en", "how-to-read-badminton-reviews");
    expect(article).toBeTruthy();

    expect(
      enrichmentForReviewArticle("how-to-read-badminton-reviews", article!)
    ).toBeNull();
  });
});

describe("buttondown", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("formats product notify tags", () => {
    expect(notifyTagForProduct("yy-as-50")).toBe("product:yy-as-50");
  });

  it("reports unconfigured when username is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_BUTTONDOWN_USERNAME", "");
    expect(buttondownConfigured()).toBe(false);

    return subscribeViaButtondown({
      email: "test@example.com",
      tag: "product:yy-as-50",
    }).then((result) => {
      expect(result.ok).toBe(false);
    });
  });

  it("posts to Buttondown embed endpoint when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_BUTTONDOWN_USERNAME", "testuser");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const result = await subscribeViaButtondown({
      email: "reader@example.com",
      tag: "product:yy-as-50",
    });

    expect(result.ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://buttondown.com/api/emails/embed-subscribe/testuser",
      expect.objectContaining({ method: "POST" })
    );
  });
});
