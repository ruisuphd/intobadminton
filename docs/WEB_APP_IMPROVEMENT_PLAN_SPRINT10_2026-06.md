# Web App Improvement Plan — Sprint 10 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-0d45`  
**Baseline:** Sprint 9 on `main` (Finder fit on `/best/*`, PWA `ib-v3`, `editorialReviewHref` guard).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 10 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Saved lists + account-less compare | ✅ PWA precaches `/saved/`; manifest shortcut |
| **Wirecutter / RTINGS** | HowTo rich results on procedural guides | ✅ HowTo JSON-LD on 4 pillar guides |
| **RacketGuide** | Offline search shell | ✅ PWA `ib-v4` precaches `/search/` |
| **BadmintonCentral** | Thread helpful counts | ⏳ Reactions worker deploy workflow (owner secrets) |
| **Google Search Console** | Field CWV regression tracking | ✅ `crux-template.csv` + existing Lighthouse baseline |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 10)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **PWA shell omits search + saved** | Return visits; parity with manifest shortcuts | ✅ `ib-v4` + `/search/`, `/saved/` in `PRECACHE_URLS` |
| 2 | **Review→product map stuck at 80%** | PDP links + `editorialReviewHref` coverage | ✅ Heuristic script + mappings → **86%** (126/146) on rebased `main` |
| 3 | **Procedural guides lack HowTo schema** | HowTo rich-result eligibility | ✅ Steps on 4 guides in Lighthouse URL set |
| 4 | **HelpfulReaction counts not deployable from CI** | Social proof blocked on env | ✅ `deploy-reactions-worker.yml` (workflow_dispatch) |
| 5 | **No CrUX baseline artifact for agents** | Regression comparison | ✅ `docs/baselines/crux-template.csv` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PWA offline expansion | `public/sw.js` (`ib-v4`), `public/manifest.webmanifest` |
| Review map ≥81% | `src/data/blog-review-product-map.json`, `scripts/suggest-review-product-map.mjs` |
| HowTo on guides | `src/app/guides/{doubles-positioning,season-refresh,shoes-footwork,wide-feet}-*/page.tsx` |
| Reactions deploy | `.github/workflows/deploy-reactions-worker.yml`, `workers/reactions/README.md` |
| CrUX template | `docs/baselines/crux-template.csv`, `docs/baselines/README.md` |
| Regression tests | `src/lib/pwa-precache.test.ts`, `scripts/suggest-review-product-map.test.mjs` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 9 deferred list + competitive audit | ✅ |
| 2 | PWA cache version bumped (`ib-v4`) when URLs change | ✅ |
| 3 | Review map additions are catalogue-backed product ids only | ✅ |
| 4 | HowTo steps match visible H2 procedural content | ✅ |
| 5 | Static export — no new dynamic routes | ✅ |
| 6 | Reactions workflow uses secrets; no keys in repo | ✅ |
| 7 | Unit tests: pwa-precache, suggest script | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set unchanged (guides already listed) | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
node scripts/audit-review-product-map.mjs
npx playwright test e2e/best-fit-smoke.spec.ts
```

---

## 6. Deferred (Sprint 11+)

- Production `NEXT_PUBLIC_REACTIONS_API_URL` on GitHub Pages env
- GSC/CrUX owner CSV exports (fill `crux-template.csv` from PageSpeed Insights)
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Review→product map beyond ~85% (explainer + comparison slugs need editorial pairing)
