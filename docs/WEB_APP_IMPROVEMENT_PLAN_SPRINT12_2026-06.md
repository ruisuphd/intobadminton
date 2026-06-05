# Web App Improvement Plan — Sprint 12 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-4f36` (merged with PR #154 guides/offline work on `main`)  
**Baseline:** Sprint 11 — PWA `ib-v5`, review map ~91%, compare share init, reactions Pages secret.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 12 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Related picks + offline buying guides | ✅ `PATH_CLUSTER` on commercial `/best/*`; PWA precaches `/guides/` |
| **Wirecutter / RTINGS** | Methodology in freshness feed + offline trust | ✅ `/methodology/` in updates feed; PWA precaches `/data/` |
| **RacketGuide** | Clear offline recovery | ✅ `/offline/` page + `/guides/` shortcut (PR #154) |
| **BadmintonCentral** | Helpful counts on threads | ✅ API-off editorial prompt (no empty shell) |
| **Google Search Console** | Regression gates on moat routes | ✅ Lighthouse: compare, methodology, offline, guides |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 12 — combined)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Best-of pages lack “Keep reading” shelf** | Internal linking on high-intent landings | ✅ Extended `PATH_CLUSTER` |
| 2 | **`/methodology/` missing from updates feed** | Trust anchor invisible in freshness story | ✅ `editorial-meta.ts` + `PATH_LABELS` |
| 3 | **HelpfulReaction empty shell when API off** | Poor UX on every editorial page | ✅ `helpful-reaction-ui.ts` |
| 4 | **PWA omits guides + claims shells** | Offline users miss key flows | ✅ `ib-v7` precaches `/guides/`, `/data/`, `/methodology/`, `/offline/` |
| 5 | **No e2e for moat pages + PWA drift** | Regressions undetected | ✅ `data-updates-smoke`, `review-shelf-smoke`, `pwa-offline-smoke` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Related reading clusters | `src/lib/related-content.ts`, `related-content.test.ts` |
| Updates feed completeness | `src/lib/editorial-meta.ts`, `editorial-updates.ts` |
| HelpfulReaction API-off UX | `src/lib/helpful-reaction-ui.ts`, `HelpfulReaction.tsx` |
| PWA offline expansion | `public/sw.js` (`ib-v7`), `manifest.webmanifest`, `src/app/offline/` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/data-updates-smoke.spec.ts`, `review-shelf-smoke.spec.ts`, `pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 11 deferred list + competitive audit | ✅ |
| 2 | Related clusters only link to existing static routes | ✅ |
| 3 | `/methodology/` freshness aligns with `/data/` sweep date | ✅ |
| 4 | HelpfulReaction shrinks shell when API off and no vote | ✅ |
| 5 | Static export — no new dynamic routes beyond `/offline/` | ✅ |
| 6 | PWA cache version bumped (`ib-v7`) when URLs change | ✅ |
| 7 | Unit tests: related-content, editorial-updates, helpful-reaction-ui, pwa-precache | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set includes compare, methodology, offline, guides | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npm run lint
npx playwright test e2e/data-updates-smoke.spec.ts e2e/review-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 13+)

- Owner: deploy reactions worker + set `REACTIONS_API_URL` repository secret
- Owner: fill `docs/baselines/crux-template.csv` from PageSpeed Insights
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Remaining explainer slugs without single catalogue SKU (intentional ~9%)
