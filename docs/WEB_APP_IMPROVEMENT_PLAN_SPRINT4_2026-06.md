# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-3a42` → PR #115  
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

**Also on `main` (merged):** guide ↔ tool links, `GuideInPageToc`, programmatic `/best/rackets-under-100/`, search index expansions.

### Sprint 4b — Return-path polish (PR #100)

| # | Gap | Status |
|---|-----|--------|
| 6 | Homepage shortlists showed names only (no `/results/` reopen) | ✅ `resultsPathForProfile` + linked cards |
| 7 | Toolkit pages lacked share / helpful feedback | ✅ `ToolEngagement` on `/tools` layout |
| 8 | `/tools/` hub missing from site search | ✅ `buildSearchIndex()` entry |
| 9 | Lighthouse skipped authenticity-checker | ✅ URL added (`/saved/` omitted — `noindex`) |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV public counts
- Faceted catalog browse
- Original product photography
- `Person.sameAs` after profile claims

---

## 3. Execution summary

1. `src/lib/product-retail.ts` + `ProductBuyLink` on commercial surfaces.
2. Removed duplicate `GuideEngagement`; extended `GUIDE_HEADLINES`.
3. `CompareConceptChrome` + `CompareGuidePage` migration for 77 vs 88S.
4. `editorialPageMetadata()` for guides and best-of.
5. RSS feed postbuild + footer link.
6. Merged latest `main` (tools, ToC, runlog).

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in competitive audit + Q2 plan | ✅ |
| 2 | Buy links use official URLs when available | ✅ |
| 3 | Export-audit disclosure markers intact | ✅ |
| 4 | Single guide engagement footer | ✅ |
| 5 | Legacy compares have FTC + engagement | ✅ |
| 6 | OG + Twitter on guides and best-of | ✅ |
| 7 | `feed.xml` in `out/` after build | ✅ |
| 8 | `npm test` (198 tests) | ✅ |
| 9 | `npm run build` + SEO audit | ✅ |
| 10 | Mergeable with `main` | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Affiliate CTR | GA4 `affiliate_click` |
| Tool → finder CTR | GA4 tool / quiz events |
| Social referral CTR | Lift after OG metadata |
