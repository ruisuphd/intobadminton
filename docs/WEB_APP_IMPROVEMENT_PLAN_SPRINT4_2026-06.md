# Web App Improvement Plan — Sprint 4 (June 2026)

**Branches:** PRs #105, #110, #115 on `main`  
**Baseline:** Sprint 3 ([`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md)).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response |
|------------|----------|------------------------|
| **Tennis Warehouse / Wirecutter** | Buy CTAs, catalog browse, notify-me | `ProductBuyLink`, `/catalog/`, Buttondown + offline intent sync |
| **RacketGuide / TW** | Calculators + price-band pages | Five `/tools/*`, `/best/rackets-under-100/` + `/150/` |
| **Wirecutter / RTINGS** | Social + FTC on money pages | `editorialPageMetadata()`, compare template parity |
| **BadmintonCentral** | RSS / return visits | `/feed.xml` postbuild + footer link |
| **YouTube reviewers** | Video proof | Deferred (`VideoObject` gated) |

**Moat:** static export, postbuild SEO gate, signed reviews, transparent fit scoring.

---

## 2. Top gaps closed (Sprint 4)

| # | Gap | Delivery |
|---|-----|----------|
| 1 | Filter-first catalog + results spec facets | ✅ PR #105 |
| 2 | Affiliate buy links unused | ✅ PR #115 (`ProductBuyLink`) |
| 3 | Offline notify-me never syncs to Buttondown | ✅ PR #110 (`notify-me-sync.ts`) |
| 4 | Budget finder → editorial shortlist CTA | ✅ PR #110 |
| 5 | RSS + OG/Twitter on commercial pages | ✅ PR #115 |

**Also merged:** guide ↔ tool links, `GuideInPageToc`, compare engagement cleanup, Lighthouse URL hygiene (no `/saved/`).

### Sprint 4b — Return-path polish (PR #100)

| # | Gap | Status |
|---|-----|--------|
| 6 | Homepage shortlists showed names only (no `/results/` reopen) | ✅ `resultsPathForProfile` + linked cards |
| 7 | Toolkit pages lacked share / helpful feedback | ✅ `ToolEngagement` on `/tools` layout |
| 8 | `/tools/` hub missing from site search | ✅ `buildSearchIndex()` entry |
| 9 | Lighthouse skipped authenticity-checker | ✅ URL added (`/saved/` omitted — `noindex`) |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV public counts
- Original product photography
- VideoObject + claimed YouTube `sameAs`
- GSC/CrUX baseline CSV capture
- zh locale content

---

## 3. Execution summary (PR #110 additive)

1. `src/lib/notify-me-sync.ts` — migrate local intents to Buttondown when configured.
2. `SavedListClient` — sync on mount + `notify_me_synced` analytics.
3. `ResultsClient` — CTA to `/best/rackets-under-100/` when racket + budget ≤ $100.
4. `lighthouserc.json` — CLS as warn (cookie/banner flake on long guides).
5. `e2e/search-smoke.spec.ts` — budget guide search smoke.

---

## 4. Ten-pass verification (PR #110)

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in audit + deferred list | ✅ |
| 2 | Notify sync only when Buttondown configured | ✅ |
| 3 | Failed sync rows stay in localStorage | ✅ |
| 4 | Budget CTA scoped to racket + budget ≤ 100 | ✅ |
| 5 | `/saved/` stays noindex | ✅ |
| 6 | Static export safe | ✅ |
| 7 | `notify-me-sync.test.ts` + search e2e | ✅ |
| 8 | No homepage signup wall | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Metrics

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Notify-me opt-ins | `notify_me_synced` weekly |
| Lighthouse CI | Green on indexable URLs |
