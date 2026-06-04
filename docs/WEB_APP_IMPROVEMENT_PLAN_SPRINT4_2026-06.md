# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-a58e` / PR #94 head  
**Baseline:** Sprint 3 ([`WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md`](WEB_APP_IMPROVEMENT_PLAN_SPRINT3_2026-06.md))

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton gap (Sprint 4) |
|------------|----------|------------------------------|
| **RacketGuide / Tennis Warehouse finders** | Sharable filtered result URLs | Recent shortlists showed names only — no reopen link |
| **RTINGS / Wirecutter tools** | Feedback + share on utility pages | Toolkit pages lacked engagement stripe |
| **BadmintonCentral** | Tool discovery via search | `/tools/` hub missing from site search index |
| **Google Search Console peers** | CWV on high-traffic tool URLs | Lighthouse sampled hub only, not calculators |
| **YouTube / brand blogs** | Video + original photos | Still deferred (editorial / claim workflow) |

**Moat unchanged:** five interactive tools shipped in Sprint 2–3; this sprint closes the return loop and measurement gaps around them.

---

## 2. Top 5 gaps (this sprint)

| # | Gap | Impact | Sprint 4 |
|---|-----|--------|----------|
| 1 | **Homepage shortlist recall not deep-linking to `/results/`** | Weak 7-day return; users cannot reopen a run | ✅ `resultsPathForProfile` + linked `HomeRecentShortlists` |
| 2 | **Toolkit pages without share / helpful feedback** | Lower engagement signal on information-gain URLs | ✅ `ToolEngagement` via `/tools` layout |
| 3 | **`/tools/` hub absent from site search** | Discovery gap vs guides/reviews | ✅ `buildSearchIndex()` entry |
| 4 | **Lighthouse CI blind to calculator URLs** | Regression risk on interactive tools | ✅ tension + authenticity checker URLs |
| 5 | **Sprint 4 plan not documented / verified** | Automation drift | ✅ this doc + 10-pass table |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV aggregate counts (no fake counts)
- First-party `public/products/` photography
- `Person.sameAs` YouTube after channel claim
- zh locale content
- Quiz delight pass (animations) — P1 UX, separate PR

---

## 3. Execution summary

1. `resultsPathForProfile()` in `src/lib/profile-url.ts` — sharable results URLs from stored profiles.
2. `HomeRecentShortlists` — cards link to `/results/?…&n={topIds.length}`.
3. `ToolEngagement` + `src/app/tools/layout.tsx` — SocialShare + HelpfulReaction on all tool routes.
4. Site search — "Badminton toolkit" → `/tools/`.
5. `lighthouserc.json` — string-tension-calculator + authenticity-checker.

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 4 + competitive audit | ✅ |
| 2 | Deep links use URL profile, not localStorage-only state | ✅ |
| 3 | No signup wall on tool engagement | ✅ |
| 4 | Tool layout skips unknown paths (no stray footer) | ✅ |
| 5 | `resultsPathForProfile` clamps invalid `n` | ✅ |
| 6 | Site search finds toolkit hub | ✅ |
| 7 | Unit tests: profile-url, site-search | ✅ |
| 8 | Static export safe (client components only) | ✅ |
| 9 | `npm test && npm run build` | ✅ (CI) |
| 10 | postbuild SEO audit clean | ✅ (CI) |

---

## 5. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Tool page `helpful_reaction` events | Track weekly in GA4 |
| `recommendations_viewed` with `from_url: true` | Track reopen rate from homepage |
