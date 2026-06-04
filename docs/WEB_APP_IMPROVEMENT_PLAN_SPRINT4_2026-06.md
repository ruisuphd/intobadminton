# Web App Improvement Plan — Sprint 4 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-f5af` (rebased on `main` after PR #97 / #99)  
**Baseline:** Sprint 3 on `main`; toolkit pages per [`IMPROVEMENT_PLAN_2026Q2.md`](IMPROVEMENT_PLAN_2026Q2.md) §6 Sprint 4.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength | IntoBadminton response |
|------------|----------|------------------------|
| **Tennis Warehouse** | Saved lists reopen to filtered grids | `profileToResultsPath` + linked shortlist cards |
| **RacketGuide / Tennis Warehouse** | Interactive calculators | Five `/tools/*` pages + guide ↔ tool cross-links |
| **Wirecutter / RTINGS** | Return-visit modules + topic clusters | Homepage shortlist reopen; cluster pillar guides |
| **BadmintonCentral** | Forum search density | Site search + glossary autolinks (Sprint 3) |
| **YouTube reviewers** | Video proof | Deferred (`VideoObject` gated) |

**Moat:** static export, postbuild SEO gate, signed reviews, transparent fit scoring, no signup on finder.

---

## 2. Top 5 gaps (Sprint 4)

| # | Gap | Status |
|---|-----|--------|
| 1 | Toolkit pages not linked from matching guides | ✅ Guide ↔ tool cross-links (PR #97) |
| 2 | Recent shortlists not reopenable to `/results/` | ✅ `profileToResultsPath` + linked cards (this PR) |
| 3 | Offline notify-me intents stranded at Buttondown cutover | ✅ One-tap migrate on `/saved/` (this PR) |
| 4 | Lighthouse blind to cluster guides + flagship tools | ✅ Extended `lighthouserc.json` (this PR) |
| 5 | HelpfulReaction aggregate counts (Workers/KV) | ⏳ Sprint 5 |

### Deferred (Sprint 5+)

- HelpfulReaction Workers/KV aggregates
- First-party `public/products/` photography
- `Person.sameAs` after social profile claims
- PWA web push
- GSC/CrUX CSV in `docs/baselines/`

---

## 3. Execution summary

**On `main` (prior Sprint 4 PRs):**

- Guide ↔ tool cross-links; duplicate `GuideEngagement` removed from articles
- `/best/rackets-under-100/`; homepage hero search; catalog search

**This PR:**

1. `profileToResultsPath()` — serialise stored profiles to `/results/?…`
2. `HomeRecentShortlists` + `RecentHistory` — cards link to reopened rankings
3. `SavedListClient` — migrate device-only notify-me when Buttondown is configured
4. Lighthouse: cluster guides, string-tension calculator, authenticity checker, `/saved/`

---

## 4. Ten-pass verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Q2 Sprint 4 + competitive audit | ✅ |
| 2 | Results deep links match quiz → results param shape | ✅ |
| 3 | No PII leaves device except explicit Buttondown POST | ✅ |
| 4 | Migrate clears local intent only after successful subscribe | ✅ |
| 5 | No homepage signup wall | ✅ |
| 6 | Lighthouse URLs exist in static `out/` after build | ✅ |
| 7 | `profile-url.test.ts` covers `profileToResultsPath` | ✅ |
| 8 | Static export safe | ✅ |
| 9 | `npm test && npm run build` | ✅ |
| 10 | postbuild SEO audit clean | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint
npm run build
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Pages per session | 2.5+ |
| 7-day return rate | 15%+ |
| Tool → finder CTR | Track in GA4 |
| Shortlist reopen | Navigation to `/results/?…` from homepage |
