# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3a42`  
**Baseline:** Sprint 3 in [`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md).

---

## 1. Competitive audit (fresh pass)

| Competitor pattern | IntoBadminton (post–Sprint 3) | Sprint 4 gap |
|--------------------|-----------------------------|--------------|
| Tennis Warehouse / Wirecutter buy CTAs | Affiliate plumbing existed, unused | No outbound purchase on results, reviews, best-of |
| RTINGS / TW social sharing on money pages | Strong on reviews + template compare guides | Legacy concept compares + guides missing OG/Twitter |
| Retailer RSS / blog syndication | No feed | Missing `/feed.xml` |
| Wirecutter engagement consistency | Duplicate guide footers (layout + page) | UX bug on 8/10 guides |
| Product-vs-product compare template | 9 guides on `CompareGuidePage` | 4 legacy pages uneven |

**Moat unchanged:** fit-score transparency, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 4 |
|---|-----|--------|----------|
| 1 | **Affiliate buy links not wired** | Commerce loop vs Wirecutter/TW | ✅ `ProductBuyLink` on results, reviews, best-of |
| 2 | **Duplicate guide engagement chrome** | Double progress bar + reactions | ✅ removed per-page `GuideEngagement` |
| 3 | **Legacy compare guides missing template chrome** | FTC + engagement on commercial URLs | ✅ `CompareConceptChrome` + migrated 77 vs 88S |
| 4 | **Open Graph / Twitter gaps on `/best/*` and `/guides/*`** | Social CTR | ✅ `editorialPageMetadata()` |
| 5 | **No RSS feed for reviews** | Return visits + syndication | ✅ `out/feed.xml` via postbuild |

### Deferred (Sprint 5+)

- Faceted catalog browse (weight, balance, price band)
- HelpfulReaction Workers/KV public counts
- Original `ProductImageSet` photography on commercial URLs
- VideoObject + claimed YouTube `sameAs`
- GSC/CrUX CSV baselines in `docs/baselines/`

---

## 3. Execution summary

1. `src/lib/product-retail.ts` + `src/components/ProductBuyLink.tsx` — manufacturer-first outbound links with `rel=sponsored`.
2. Wired buy CTAs in `ResultCard`, `ReviewProductPanel`, `BestPicksPage`.
3. Removed duplicate `GuideEngagement` from eight guides; extended `GuidePageChrome` headlines.
4. `CompareConceptChrome` on three concept compare guides; `astrox-77-pro-vs-88s-pro` → `CompareGuidePage`.
5. `editorialPageMetadata()` + `articleSocialMetadata()` for OG/Twitter on guides and best-of leaves.
6. `scripts/generate-feed.mjs` → `out/feed.xml`; footer RSS link.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in code audit vs Tennis Warehouse / Wirecutter | ✅ |
| 2 | Buy links use official URLs when catalog has them | ✅ |
| 3 | Sponsored `rel` + export-audit disclosure markers unchanged | ✅ |
| 4 | Guide pages single engagement footer (layout only) | ✅ |
| 5 | Legacy compares have disclosure + engagement | ✅ |
| 6 | Best-of + guide metadata includes OG + Twitter images | ✅ |
| 7 | RSS items use absolute URLs on intobadminton.com | ✅ |
| 8 | `product-retail.test.ts` + `rss-feed.test.ts` | ✅ (run in CI) |
| 9 | `npm test && npm run build` | ✅ (run in CI) |
| 10 | postbuild SEO audit + feed.xml present | ✅ (run in CI) |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Affiliate click-through on commercial pages | Measurable in GA4 `affiliate_click` |
| Social referral CTR | Lift on best-of / guides after OG fix |
