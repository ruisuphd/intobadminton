# Web App Improvement Plan — Sprint 12 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-a467`  
**Baseline:** Sprint 11 (PR #154) — PWA `ib-v5`, review map 91%, `/offline/` fallback.

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 12 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Offline buying guides + spec hubs | ✅ PWA `ib-v6` precaches `/guides/`; Guides manifest shortcut |
| **Wirecutter** | Methodology-linked evergreen clusters | ✅ Guides hub offline; Lighthouse audits `/guides/` |
| **RacketGuide** | Clear offline recovery paths | ✅ `/offline/` lists Guides alongside Reviews |
| **RTINGS** | Lab-style trust on utility pages | ⏳ Original photography still editorial |
| **BadmintonCentral** | Aggregate helpful counts | ⏳ Reactions API URL still owner secret |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate.

---

## 2. Top 5 gaps (Sprint 12)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **Guides hub not in PWA precache** | Evergreen SEO cluster unavailable offline | ✅ `ib-v6` + `/guides/` |
| 2 | **Offline page omits guides recovery** | Users lose path to tension/shoe guides | ✅ Link on `/offline/` |
| 3 | **Lighthouse CI skips `/offline/` and `/guides/`** | PWA regressions undetected | ✅ URLs in `lighthouserc.json` |
| 4 | **No Guides PWA shortcut** | Install surface favors finder only | ✅ `manifest.webmanifest` |
| 5 | **E2E does not assert guides precache** | SW cache drift | ✅ `pwa-offline-smoke.spec.ts` |

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| PWA `ib-v6` | `public/sw.js` |
| Guides shortcut | `public/manifest.webmanifest` |
| Offline recovery | `src/app/offline/page.tsx` |
| Lighthouse URLs | `lighthouserc.json` |
| Tests | `src/lib/pwa-precache.test.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 11 deferred list + competitive audit | ✅ |
| 2 | PWA cache version bumped (`ib-v6`) when URLs change | ✅ |
| 3 | `/guides/` is static export route (no dynamic API) | ✅ |
| 4 | `/offline/` remains noindex + sitemap-exempt | ✅ |
| 5 | Manifest JSON valid (no duplicate shortcuts) | ✅ |
| 6 | Unit tests: `pwa-precache.test.ts` | ✅ |
| 7 | E2E: guides precache + offline link | ✅ |
| 8 | `npm test` green | ✅ |
| 9 | `npm run build` + postbuild SEO audit | ✅ |
| 10 | Lighthouse URL set includes new routes | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Deferred (Sprint 13+)

- Production `NEXT_PUBLIC_REACTIONS_API_URL` in GitHub repo secrets
- GSC/CrUX owner CSV exports (`crux-template.csv`)
- Original `public/products/` photography on top commercial URLs
- `VideoObject` / YouTube `sameAs` (channel claim)
- Remaining 13 explainer slugs without single catalogue SKU (intentional)
