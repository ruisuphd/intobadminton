# Web App Improvement Plan — Sprint 4 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-f8ee` (PR #105), `cursor/web-app-improvement-plan-ff21` (PR #110)  
**Baseline:** Sprint 3 on `main` (PRs #94–#98).

---

## 1. Competitive audit (June 2026)

| Competitor pattern | IntoBadminton (post–Sprint 3) | Sprint 4 response |
|--------------------|-------------------------------|-------------------|
| **Tennis Warehouse browse** | Finder + brand filter on `/results/` | `/catalog/` + spec facets on results (#105) |
| **Wirecutter price-band pages** | `/best/rackets-under-100/` (#98) | `/best/rackets-under-150/` (#105) |
| **Retailer notify-me** | Buttondown on `/saved/` when configured | Offline intent migration on deploy (#110) |
| **RacketGuide calculators** | Five `/tools/*` on `main` | Lighthouse audits key tool URLs (#105) |
| **Original photography** | Manufacturer images on some picks | Still editorial pipeline (deferred) |

**Moat unchanged:** transparent fit score, postbuild SEO gate, claims CI, static export.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Delivery |
|---|-----|----------|
| 1 | **No filter-first product catalog** | ✅ `/catalog/` + facets (#105) |
| 2 | **Results shortlist lacks spec facets** | ✅ price / weight / balance chips (#105) |
| 3 | **Offline notify-me never syncs to Buttondown** | ✅ `syncNotifyMeIntentsToButtondown()` (#110) |
| 4 | **Budget finder → editorial shortlist CTA** | ✅ `/best/rackets-under-100/` banner (#110) |
| 5 | **Lighthouse CI false failure on noindex `/saved/`** | ✅ removed from `lighthouserc.json` (#105/#110) |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` hero photography
- VideoObject + claimed YouTube `sameAs`
- GSC/CrUX baseline CSV capture
- zh locale content

---

## 3. Execution summary

**PR #105:** `product-filters.ts`, `/catalog/`, results spec chips, `/best/rackets-under-150/`, product search brand facet, `catalogProductHref`.

**PR #110:** `notify-me-sync.ts`, budget guide CTA on `/results/`, search e2e for budget guide.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 3 deferred list + audit | ✅ |
| 2 | Catalog links resolve to static routes | ✅ |
| 3 | Notify sync only when Buttondown configured | ✅ |
| 4 | Budget CTA only for racket + budget ≤ 100 | ✅ |
| 5 | `/saved/` stays noindex; not in Lighthouse | ✅ |
| 6 | Static export safe | ✅ |
| 7 | Unit tests (filters, notify sync, search) | ✅ |
| 8 | No homepage signup wall | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Notify-me opt-ins | `notify_me_synced` weekly |
| Lighthouse CI | Green on indexable URLs |
