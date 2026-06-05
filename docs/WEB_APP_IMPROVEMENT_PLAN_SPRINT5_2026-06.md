# Web App Improvement Plan — Sprint 5 (June 2026)

**Branches:** `cursor/web-app-improvement-plan-dfd2` (PR #92 — homepage perf); `cursor/web-app-improvement-plan-b963` (PR #122 — catalog URL + under-$200)  
**Baseline:** Sprint 3–4 on `main`.

---

## Top 5 gaps addressed

| # | Gap | Status |
|---|-----|--------|
| 1 | **Budget SEO cluster incomplete** — no $200 landing page | ✅ `/best/rackets-under-200/` (PR #122) |
| 2 | **Catalog filters not shareable** | ✅ URL query params + sort (PR #122) |
| 3 | **Homepage full JSON imports hurt Lighthouse** | ✅ Prebuild slices + `HomeContinueReading` (PR #92) |
| 4 | **Lighthouse CI coverage gaps** | ✅ catalog + price-band URLs; CLS warn (PR #122) |
| 5 | **Catalog → finder funnel uninstrumented** | ✅ GA4 events (PR #122) |

### Deferred (Sprint 6+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` hero photography
- VideoObject + claimed YouTube `sameAs`
- GSC/CrUX baseline CSV capture

---

## Homepage perf (PR #92)

- `home-featured-reviews.json`, `catalog-stats.json`, `product-display-names.json`
- Dynamic `ContinueReading`; lightweight `productDisplayName` for shortlists

---

## Catalog maturity (PR #122)

1. `src/lib/catalog-url.ts` — parse/serialize catalog filter + sort state
2. `src/app/catalog/CatalogClient.tsx` — URL sync, sort, GA4 events
3. `src/lib/price-band-best.ts` — `/best/rackets-under-200/`
4. `lighthouserc.json` — merged commercial URLs; drop noindex `/saved/`; CLS warn

---

## Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 4 deferred list + competitive audit | ✅ |
| 2 | Price-band page uses BestPicks schema via shared builder | ✅ |
| 3 | Catalog URL params round-trip without invalid enum leakage | ✅ |
| 4 | Sort preserves filter set; only order changes | ✅ |
| 5 | Static export safe (client-only URL state) | ✅ |
| 6 | Sitemap auto-discovers new `/best/rackets-under-200/` route | ✅ |
| 7 | `catalog-url.test.ts` + `price-band-best.test.ts` | ✅ |
| 8 | Lighthouse URLs include new commercial routes | ✅ |
| 9 | `npm test && npm run lint && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## Verification

```bash
npm test && npm run build && npm run lint:lighthouse
```

---

## Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Catalog → quiz conversion | GA4 `catalog_finder_cta` event |
