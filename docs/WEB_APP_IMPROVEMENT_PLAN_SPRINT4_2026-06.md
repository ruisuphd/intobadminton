# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f5af` → PR #113  
**Baseline:** Sprint 3 on `main` (PRs #94–#98, #105 catalog/facets).

---

## 1. Competitive audit (June 2026)

| Competitor pattern | IntoBadminton response |
|--------------------|------------------------|
| **Tennis Warehouse browse** | `/catalog/` + spec facets on `/results/` (PR #105 on `main`) |
| **Tennis Warehouse saved lists** | `profileToResultsPath` + linked shortlist cards (PR #113) |
| **Wirecutter price-band pages** | `/best/rackets-under-100/`, `/best/rackets-under-150/` |
| **RacketGuide calculators** | Five `/tools/*` + guide cross-links (PR #97) |
| **YouTube reviewers** | `VideoObject` deferred |

**Moat:** transparent fit score, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (Sprint 4, combined)

| # | Gap | Status |
|---|-----|--------|
| 1 | No filter-first product catalog | ✅ `/catalog/` (main, PR #105) |
| 2 | Recent shortlists not reopenable | ✅ `profileToResultsPath` (PR #113) |
| 3 | Offline notify-me stranded at Buttondown cutover | ✅ migrate CTA (PR #113) |
| 4 | Lighthouse blind to cluster guides + tools | ✅ `lighthouserc.json` (PR #113) |
| 5 | HelpfulReaction aggregate counts | ⏳ Sprint 5 |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV
- First-party `public/products/` photography
- VideoObject + YouTube `sameAs`
- GSC/CrUX baseline CSV

---

## 3. Execution summary

**On `main` (PRs #97, #105):** catalog, results facets, `/best/rackets-under-150/`, guide ↔ tool links.

**PR #113:**

1. `profileToResultsPath()` + linked `HomeRecentShortlists` / `RecentHistory`
2. Buttondown migrate for device-only notify-me on `/saved/`
3. Lighthouse URLs for cluster guides, tools, `/saved/`

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in audit + Sprint 3 deferred list | ✅ |
| 2 | Results deep links match quiz param shape | ✅ |
| 3 | Catalog + shortlist flows static-export safe | ✅ |
| 4 | Migrate clears local intent after Buttondown OK | ✅ |
| 5 | No homepage signup wall | ✅ |
| 6 | Lighthouse URLs in `out/` after build | ✅ |
| 7 | Unit tests (`profile-url`, `product-filters`, search) | ✅ |
| 8 | `npm test && npm run lint && npm run build` | ✅ |
| 9 | postbuild SEO audit | ✅ |
| 10 | Mergeable with latest `main` | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
