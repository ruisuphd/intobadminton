# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-df3b`  
**Baseline:** Sprint 4 on `main` after PR #113; PR #116 (programmatic best pages + glossary autolink).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response |
|------------|----------|------------------------|
| **Tennis Warehouse / retailer finders** | Filter-first catalogue browse + deep category URLs | `/catalog/` on main (#105); **HomeCatalogStrip** + deep links |
| **RacketGuide / affiliate roundups** | Long-tail landings (`5U`, shoulder comfort) | ✅ PR #116 programmatic `/best/*` |
| **BadmintonCentral / authority blogs** | Inline concept links to glossary | ✅ PR #116 `segmentArticleGlossary` |
| **Wirecutter / RTINGS** | Social proof on helpful votes | **Optional `NEXT_PUBLIC_REACTIONS_URL` hook** |
| **RacketGuide-style tool sites** | Share + feedback on calculators | **ToolEngagement** on `/tools/*` |

**Moat:** static export, postbuild SEO gate, transparent fit scoring, 148-product catalogue.

---

## 2. Top 5 gaps (Sprint 5 — this PR)

| # | Gap | Status |
|---|-----|--------|
| 1 | Catalog not discoverable from homepage | ✅ `HomeCatalogStrip` |
| 2 | Catalog deep links (`?cat=racket`) ignored | ✅ `parseCatalogFiltersFromSearchParams` |
| 3 | HelpfulReaction counts client-only | ✅ Optional reactions API client |
| 4 | Toolkit pages lack share/helpful stripe | ✅ `ToolEngagement` layout |
| 5 | Lighthouse CLS on guides + noindex `/saved/` in gate | ✅ Fixed sidebar ToC; omit `/saved/` |

### Already on main (PR #116)

- `/best/lightweight-rackets-5u/`, `/best/rackets-for-shoulder-comfort/`
- Enhanced glossary autolink (`segmentArticleGlossary`)

### Deferred (Sprint 6+)

- Deploy Cloudflare Worker for reactions aggregates
- First-party `public/products/` photography
- `Person.sameAs` after profile claims
- GSC/CrUX CSV in `docs/baselines/`

---

## 3. Execution summary

1. Merge `origin/main` (PR #116 programmatic pages)
2. `HomeCatalogStrip` + catalog engagement footer
3. Catalog URL param parsing (Suspense-wrapped)
4. `HelpfulReaction` optional `NEXT_PUBLIC_REACTIONS_URL`
5. `ToolEngagement` on `/tools/*`
6. SW `ib-v3` precache `/catalog/` + `/tools/`
7. Guide ToC fixed sidebar (CLS); Lighthouse `/catalog/`; no `/saved/`

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 5+ + competitive audit | ✅ |
| 2 | Catalog deep links parse only known enum values | ✅ |
| 3 | HelpfulReaction hides counts below 5-vote threshold | ✅ |
| 4 | Static export safe | ✅ |
| 5 | ToolEngagement covers all five tools + hub | ✅ |
| 6 | SW version bumped (`ib-v3`) | ✅ |
| 7 | `npm test` | ✅ |
| 8 | `npm run lint` | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse CLS + no noindex URLs in gate | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Catalog → finder CTR | Track in GA4 |
