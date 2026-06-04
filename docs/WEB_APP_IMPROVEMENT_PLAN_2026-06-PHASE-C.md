# Web App Improvement Plan — June 2026 (Phase C)

**Branch:** `cursor/web-app-improvement-plan-f404`  
**Baseline:** Phase A (#80), Phase B (#91 / bab1), cluster guides (#86)

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap addressed in Phase C |
|------------|----------|--------------------------------------|
| **Tennis Warehouse** | Filter-first PDPs, hero imagery, notify-me | Larger card images; notify-me shipped Phase B |
| **Wirecutter / RTINGS** | Article engagement + social proof on comparisons | Compare-guides now match `/best/*` chrome |
| **BadmintonCentral** | Deep archive + search | All 12 compare guides in site search index |
| **RacketGuide-style finders** | Return hooks | Guide layout deduped (single progress + reaction) |
| **YouTube reviewers** | Video evidence | Still gated on editorial video commitment |

**Moat:** transparent fit score, claims CI, static export, Product JSON-LD on mapped reviews, Buttondown notify-me.

---

## 2. Top 5 gaps (Phase C)

| # | Gap | Impact | Phase C |
|---|-----|--------|---------|
| 1 | **Compare-guides lack engagement + FTC chrome** | Parity with `/best/*` on high-intent URLs | ✅ `compare-guides/layout.tsx` |
| 2 | **Site search missing 10/12 compare guides** | Discovery / SearchAction usefulness | ✅ `compare-guides.ts` manifest |
| 3 | **Duplicate guide engagement** (2× progress + reaction) | UX noise, inflated analytics | ✅ Removed inline `GuideEngagement` |
| 4 | **Result cards use 96px thumbnails** | Visual maturity vs retailers | ✅ `ProductCardImage` at 128px |
| 5 | **~40% reviews unmapped to catalogue** | Product rich results coverage | ⏳ `audit-review-product-map.mjs` (report); expansion editorial |

**Deferred:** HelpfulReaction Workers/KV aggregates; original `public/products/` photography; GSC/CrUX CSV baselines.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Compare guide manifest | `src/lib/compare-guides.ts` |
| Compare layout chrome | `src/app/compare-guides/layout.tsx`, `CompareGuidePageChrome.tsx` |
| Search index completeness | `src/lib/site-search.ts` |
| Guide deduplication | `src/app/guides/*/page.tsx` (8 files), `GuidePageChrome.tsx` headlines |
| Larger catalogue images | `ProductCardImage.tsx`, `ResultCard.tsx` |
| Map coverage audit | `scripts/audit-review-product-map.mjs` |

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in June audit; no Phase A/B re-litigation | ✅ |
| 2 | Compare layout skips hub `/compare-guides/` | ✅ |
| 3 | Affiliate disclosure on compare articles (footer band) | ✅ |
| 4 | Search index includes all 12 compare slugs | ✅ |
| 5 | Guides: one ReadingProgress + one reaction footer | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: compare-guides + site-search | ✅ |
| 8 | `npm test` | ✅ (CI) |
| 9 | `npm run build` + postbuild SEO audit | ✅ (CI) |
| 10 | Lighthouse compare URL unchanged | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Compare-guide engagement events | Baseline +20% post-chrome |
| Search hits on compare queries | Measurable in GA4 `site_search` |
