# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3a42`  
**Baseline:** Sprint 3 on `main` ([`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md)); Q2 toolkit items in [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md) §6.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response |
|------------|----------|------------------------|
| **Tennis Warehouse / Wirecutter** | Buy CTAs on every pick | `ProductBuyLink` on results, reviews, best-of |
| **RacketGuide / TW** | Interactive calculators | Five `/tools/*` pages + guide ↔ tool cross-links |
| **Wirecutter / RTINGS** | Social + FTC on money pages | `editorialPageMetadata()` OG/Twitter; compare template parity |
| **BadmintonCentral** | RSS / return visits | `/feed.xml` postbuild + footer link |
| **YouTube reviewers** | Video proof | Deferred (`VideoObject` gated) |

**Moat:** static export, postbuild SEO gate, signed reviews, transparent fit scoring.

---

## 2. Top 5 gaps (closed this sprint)

| # | Gap | Status |
|---|-----|--------|
| 1 | Affiliate buy links built but unused | ✅ `ProductBuyLink` + `product-retail.ts` |
| 2 | Duplicate guide engagement (layout + per-page) | ✅ Removed per-page `GuideEngagement` |
| 3 | Legacy compare guides missing FTC / engagement | ✅ `CompareConceptChrome` + 77 vs 88S → `CompareGuidePage` |
| 4 | `/best/*` and `/guides/*` missing OG/Twitter | ✅ `editorialPageMetadata()` |
| 5 | No RSS for reviews | ✅ `scripts/generate-feed.mjs` → `out/feed.xml` |

**Also shipped on `main` (merged):** guide ↔ tool cross-links, `GuideInPageToc`, cluster pillar headlines, Lighthouse `/tools/` URL.

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV public counts
- Faceted catalog browse (weight, balance, price)
- Original `public/products/` photography
- `Person.sameAs` after profile claims
- GSC/CrUX CSV in `docs/baselines/`

---

## 3. Execution summary

1. `src/lib/product-retail.ts` + `ProductBuyLink` on `ResultCard`, `ReviewProductPanel`, `BestPicksPage`.
2. Removed duplicate `GuideEngagement` from eight guides; extended `GUIDE_HEADLINES`.
3. `CompareConceptChrome` on three concept compares; migrated `astrox-77-pro-vs-88s-pro` to `CompareGuidePage`.
4. `articleSocialMetadata()` + `editorialPageMetadata()` on guides and best-of leaves.
5. RSS feed in postbuild; footer link to `/feed.xml`.
6. Merged `main`: guide tool links, in-page ToC, additional search index tests.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in competitive audit + Q2 plan | ✅ |
| 2 | Buy links use official URLs when catalog has them | ✅ |
| 3 | Sponsored `rel` + export-audit disclosure markers | ✅ |
| 4 | Single guide engagement footer (layout only) | ✅ |
| 5 | Legacy compares have disclosure + engagement | ✅ |
| 6 | Best-of + guides include OG + Twitter images | ✅ |
| 7 | RSS absolute URLs + `feed.xml` in `out/` | ✅ |
| 8 | `npm test` (190+) | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | PR mergeable with `main` | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Affiliate CTR | GA4 `affiliate_click` on commercial pages |
| Tool → finder CTR | GA4 tool / quiz outbound events |
| Social referral CTR | Lift on best-of / guides after OG fix |
