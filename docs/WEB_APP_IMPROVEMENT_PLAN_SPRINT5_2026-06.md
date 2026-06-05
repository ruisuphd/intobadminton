# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-df3b` (PR #123)  
**Baseline:** Sprint 4 on `main` (PR #113, #116, #117, #110).

---

## 1. Competitive audit

| Competitor | Strength | Response (this PR + main) |
|------------|----------|---------------------------|
| Tennis Warehouse | Filter-first catalogue | `/catalog/` + `HomeCatalogStrip` + `FinderQuickFilters` |
| Wirecutter / RTINGS | Helpful vote social proof | Optional `NEXT_PUBLIC_REACTIONS_URL` client hook |
| RacketGuide | Tool share + feedback | `ToolEngagement` on `/tools/*` |
| Long-tail SEO sites | Programmatic `/best/*` | ✅ PR #116 on main |
| Performance leaders | Lighthouse CI gate | Homepage perf slices (main); catalog pagination |

---

## 2. Top 5 gaps (Sprint 5b — PR #123)

| # | Gap | Status |
|---|-----|--------|
| 1 | Catalog browse not linked from homepage gear path | ✅ `HomeCatalogStrip` |
| 2 | Catalog deep links ignored | ✅ `parseCatalogFiltersFromSearchParams` |
| 3 | HelpfulReaction counts client-only | ✅ Optional reactions API |
| 4 | Toolkit pages lack engagement footer | ✅ `ToolEngagement` |
| 5 | Catalog Lighthouse perf (148-row DOM) | ✅ Paginate to 40 + show more |

### Already on main

- Programmatic `/best/lightweight-rackets-5u/`, `/best/rackets-for-shoulder-comfort/`
- Enhanced glossary autolink, homepage perf slices, guide ToC CLS anchor
- Lighthouse: CLS warn; `/saved/` excluded

### Deferred (Sprint 6+)

- Deploy Cloudflare Worker for reactions aggregates
- First-party product photography
- `Person.sameAs` after profile claims

---

## 3. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in competitive audit | ✅ |
| 2 | Catalog deep links validated | ✅ unit tests |
| 3 | Reactions threshold (≥5 votes) | ✅ unit tests |
| 4 | Static export safe | ✅ |
| 5 | ToolEngagement on all tools | ✅ |
| 6 | SW `ib-v3` precache | ✅ |
| 7 | `npm test` (218) | ✅ |
| 8 | `npm run lint` | ✅ |
| 9 | `npm run build` + SEO audit | ✅ |
| 10 | Lighthouse aligned with main config | ✅ |

---

## 4. Verification

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```
