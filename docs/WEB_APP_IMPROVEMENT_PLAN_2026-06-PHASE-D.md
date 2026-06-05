# Web App Improvement Plan — June 2026 (Phase D)

**Branch:** `cursor/web-app-improvement-plan-11b6`  
**Baseline:** Phase A–C on main + PR #101; Sprint 3 (glossary, ToC, catalog search) merged from main.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap (Phase D) |
|------------|----------|------------------------------|
| **Badminton Warehouse** | Quiz + instant PDP grid | ✅ Finder + fit score; imagery still retailer-sourced |
| **Tennis Warehouse** | Filter PDPs, email alerts, spec tables | Notify-me ✅; map coverage ↑ this phase |
| **Wirecutter / RTINGS** | Product schema on every review | ~40% reviews still editorial-only (no catalogue row) |
| **YouTube reviewers** | Video + personality | `VideoObject` still gated |
| **BadmintonCentral** | Forum search + UGC | On-site search ✅; no community layer (intentional) |

**Moat:** transparent scoring, claims CI, static export, postbuild SEO gate, SearchAction + product kind in search index.

---

## 2. Top 5 gaps (Phase D)

| # | Gap | Impact | Phase D |
|---|-----|--------|---------|
| 1 | **Review→catalogue map at ~60%** | Product rich results on unmapped slugs | ✅ +28 slug mappings; `suggest-review-product-map.mjs` |
| 2 | **No GSC/CrUX baseline in repo** | Cannot prove perf/SEO regressions | ✅ `docs/baselines/README.md` runbook |
| 3 | **Search index split (reviews vs products)** | Finder PDP discovery | ✅ Merged main `product` kind + compare guides |
| 4 | **HelpfulReaction has no public counts** | Social proof on guides | ⏳ Workers/KV deferred; GA4 events only |
| 5 | **Original product photography** | Retail parity vs TW/Badminton Warehouse | ⏳ Editorial pipeline |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Map expansion (+28) | `src/data/blog-review-product-map.json` |
| Suggest script | `scripts/suggest-review-product-map.mjs` |
| Baseline runbook | `docs/baselines/README.md` |
| Merge main (Sprint 3) | `site-search.ts`, `GuidePageChrome.tsx`, `lighthouserc.json` |

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Phase C deferred list + competitive audit | ✅ |
| 2 | New mappings reference valid `products.json` ids | ✅ |
| 3 | Comparison/editorial slugs without single product left unmapped | ✅ (by design) |
| 4 | `enrichmentForReviewArticle` works for sample new slug | ✅ unit tests |
| 5 | Search index includes compare + product + review | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | `audit-review-product-map.mjs` coverage ≥75% | ✅ |
| 8 | `npm test` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URLs include tools calculator | ✅ |
| 11 | Cluster guides reserve ToC space (`GuideTocSlot`); homepage static search | ✅ (post-merge CI fix) |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
node scripts/suggest-review-product-map.mjs
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review map coverage | ≥75% (Phase D); 90%+ editorial |
| Pages per session | 2.5+ |
| Product JSON-LD URLs | Track in GSC after deploy |
