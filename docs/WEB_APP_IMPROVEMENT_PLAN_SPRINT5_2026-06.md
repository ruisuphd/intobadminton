# Web App Improvement Plan — Sprint 5 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-df3b`  
**Baseline:** Sprint 4 on `main` after PR #113 (catalog, shortlist reopen, notify-me migrate).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap (Sprint 5) |
|------------|----------|------------------------------|
| **Tennis Warehouse / retailer finders** | Filter-first catalogue browse + deep category URLs | Catalog shipped on `main`; homepage did not surface it — **HomeCatalogStrip** |
| **Wirecutter / RTINGS** | Social proof on helpful votes | HelpfulReaction local-only — **optional Workers/KV hook** |
| **RacketGuide-style tool sites** | Share + feedback on every calculator | Tools lacked engagement footer on `main` — **ToolEngagement layout** |
| **PWA-first review apps** | Offline catalogue + tools | SW precached homepage/quiz only — **expand to `/catalog/` + `/tools/`** |
| **Performance CI leaders** | Lighthouse on all commercial surfaces | `/catalog/` missing from gate — **Lighthouse URL** |

**Moat unchanged:** static export, postbuild SEO gate, transparent fit scoring, 148-product catalogue with spec filters.

---

## 2. Top 5 gaps (Sprint 5)

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | Catalog not discoverable from homepage hero path | Discovery, pages/session | ✅ `HomeCatalogStrip` |
| 2 | Catalog deep links (`?cat=racket`) not applied | Retailer-style UX | ✅ `parseCatalogFiltersFromSearchParams` |
| 3 | HelpfulReaction counts client-only (no KV) | Social proof | ✅ Optional `NEXT_PUBLIC_REACTIONS_URL` client hook |
| 4 | Toolkit pages lack share/helpful stripe on `main` | Engagement | ✅ `ToolEngagement` + tools layout |
| 5 | Lighthouse + offline shell skip catalog/tools | CWV guardrail + PWA | ✅ `lighthouserc.json` + SW `ib-v3` |

### Deferred (Sprint 6+)

- Deploy Cloudflare Worker for `NEXT_PUBLIC_REACTIONS_URL`
- First-party `public/products/` photography
- `Person.sameAs` after social profile claims
- GSC/CrUX CSV in `docs/baselines/` (owner session)
- PWA web push for saved-product updates

---

## 3. Execution summary

1. Merge `origin/main` (PR #113 catalog + Sprint 4 reopen paths)
2. `HomeCatalogStrip` on homepage with deep links to `/catalog/?cat=…`
3. Catalog URL param parsing in `CatalogClient` (Suspense-wrapped)
4. `ArticleEngagementFooter` on `/catalog/`
5. `HelpfulReaction` — fetch/submit via optional reactions API
6. `ToolEngagement` on `/tools/*` layout (from Sprint 4b branch)
7. Lighthouse: `/catalog/index.html`; SW precache `/catalog/`, `/tools/`

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 5+ + competitive audit | ✅ |
| 2 | Catalog deep links parse only known enum values | ✅ unit tests |
| 3 | HelpfulReaction hides counts below 5-vote threshold | ✅ unit tests |
| 4 | Static export safe — no Route Handlers added | ✅ |
| 5 | ToolEngagement covers all five tools + hub | ✅ |
| 6 | SW version bumped (`ib-v3`) for cache bust | ✅ |
| 7 | `npm test` | ⏳ CI |
| 8 | `npm run lint` | ⏳ CI |
| 9 | `npm run build` + postbuild SEO audit | ⏳ CI |
| 10 | PR mergeable with `main` | ⏳ after push |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Catalog → finder CTR | Track `catalog_open` / quiz clicks in GA4 |
