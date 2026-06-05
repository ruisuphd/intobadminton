# Web App Improvement Plan — Sprint 8 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-00c0` (PR #141)  
**Baseline:** Sprint 7 + Phase D on `main` (PDP-lite, `/data/` claims registry, product map ~80%, PWA in client component).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Gap / Sprint 8 response |
|------------|---------------------------|------------------------|
| **Wirecutter / RTINGS** | Product + Review schema on commercial URLs | ✅ Map coverage 80% → **86%** (126/146) |
| **RacketGuide / affiliate hubs** | “Balanced” keyword landings | ✅ Search keywords on all-round hub (no duplicate URL) |
| **Retailer finders** | Green CI on every PR | ✅ (Sprint 7) PWA in client component — layout build fixed on 00c0 |
| **Mature review sites** | Valid structured-data wiring | ✅ Audit script validates catalogue ids + `--min-coverage` |
| **Editorial ops** | Coverage gates in repo | ✅ Vitest asserts ≥85% map + valid ids |

**Moat (unchanged):** transparent fit score, postbuild SEO gate, static export, claims CI, PDP-lite pages (Phase D).

**Deferred to Sprint 9+:** first-party `public/products/` photography, GSC/CrUX CSV capture, claimed YouTube `Person.sameAs`, `VideoObject`, web push, comments.

---

## 2. Top 5 gaps (closed Sprint 8)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | **Product map below 85%** | Rich results / E-E-A-T | ✅ +9 mappings → 86% |
| 2 | **Canonical slug drift** when multiple articles map to one product | Wrong `/review/` primary URL | ✅ Rank flagship `-review` over `-play-` / `-vs-` |
| 3 | **“Balanced rackets” discovery** | Long-tail search | ✅ Keywords → `/best/all-round-rackets/` |
| 4 | **Map audit lacks catalogue validation** | Bad mappings slip through | ✅ Id check + `--min-coverage=85` |
| 5 | **No coverage regression test** | Silent map drift | ✅ Vitest ≥85% gate |

---

## 3. Execution summary

| Item | Files |
|------|-------|
| Product map +9 | `blog-review-product-map.json` |
| Canonical ranking | `review-pages.ts`, `content-links.ts` |
| Search “balanced” alias | `site-search.ts` |
| Audit hardening | `audit-review-product-map.mjs` |
| Tests | `review-article-enrichment.test.ts`, `editorial-product-schema.test.ts`, `content-links.test.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 7 deferrals + map audit | ✅ |
| 2 | New map entries reference existing catalogue IDs only | ✅ |
| 3 | Concept/how-to articles remain unmapped | ✅ |
| 4 | No duplicate `/best/balanced-rackets/` URL | ✅ |
| 5 | PWA unchanged (client component import in layout) | ✅ |
| 6 | Enrichment tests cover new racket/shoe slugs | ✅ |
| 7 | 1000Z Play comparison secondary to flagship review | ✅ |
| 8 | `npm test` + `npm run lint` + `npm run build` | ✅ |
| 9 | `node scripts/audit-review-product-map.mjs --min-coverage=85` | ✅ |
| 10 | Static export safe | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
node scripts/audit-review-product-map.mjs --min-coverage=85
```

---

## 6. Metrics (Q2)

| Goal | Target |
|------|--------|
| Review product map coverage | ≥85% (achieved 86%) |
| CI lint-and-build | Green |
| Pages per session | 2.5+ |
| GSC clicks | 4× baseline |

---

## Note: parallel Sprint 8 on `main`

Claims transparency (`/data/` registry from `content/claims.json`) shipped on `main` in a separate automation branch. This PR focuses on product-map coverage and canonical review URLs.
