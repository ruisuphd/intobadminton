# Web App Improvement Plan — Sprint 128 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-1814`  
**Baseline:** Sprint 127 — product-funnel CrUX completion (PR #277).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 128 response |
|------------|---------------------------|---------------------|
| **Badminton Insight / Spinrider** | YouTube creator reviews surfaced as first-class product evidence | ✅ `VideoObject` JSON-LD on PDPs with cited YouTube evidence |
| **RTINGS** | Side-by-side compare tray works offline on repeat visits | ✅ product-funnel PWA offline navigation e2e (`/results/`, `/compare/`, `/saved/`) |
| **Tennis Warehouse** | Post-quiz shortlist shell recoverable on flaky club Wi‑Fi | ✅ `/results/` offline shell guarded in Playwright |
| **Wirecutter** | Return-visit saved lists persist across sessions | ✅ `/saved/` offline shell guarded in Playwright |
| **RacketGuide-style finders** | Compare tray share links reopen offline | ✅ `/compare/` offline shell guarded in Playwright |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v33, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards, 13 compare-guides e2e guards, 3/3 product-funnel CrUX paths.

---

## 2. Top 5 gaps (Sprint 128)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **`VideoObject` schema missing on PDPs** | YouTube-first reviewers expose video rich results; IntoBadminton cites creator evidence but had zero `VideoObject` nodes | ✅ `subjectOf` VideoObject on PDPs with YouTube evidence (`yy-astrox-88d-pro-2024`, `yy-exbolt-63`) |
| 2 | **YouTube evidence not centralized** | `sourceUrls` and `review-evidence.json` duplicated watch links without a single builder | ✅ `src/lib/youtube-evidence.ts` with review-evidence preference + unit tests |
| 3 | **Product-funnel offline shells unguarded** | `/results/`, `/compare/`, `/saved/` precached since Sprint 127 but offline nav had no Playwright guard | ✅ dedicated PWA offline e2e block for three funnel shells |
| 4 | **PDP VideoObject not CI-guarded** | Schema could drift from catalogue evidence without baseline enforcement | ✅ `expectVideoObjectJsonLd` on two golden PDP profiles in `pdp-queries.json` |
| 5 | **Product JSON-LD duplicated in component** | `ProductDetailPage` inlined schema separate from `buildPdpProductJsonLd` baseline helper | ✅ PDP route uses shared `buildPdpProductJsonLd` (includes VideoObject when cited) |

**Deferred (Sprint 129+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs` (channel claim); fill CrUX CSV cells (owner runs `capture:crux-psi`); HelpfulReaction production wiring; RSL shuttle verified images.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| YouTube evidence helper | `src/lib/youtube-evidence.ts`, `src/lib/youtube-evidence.test.ts` |
| VideoObject JSON-LD | `src/lib/structured-data.ts`, `src/lib/pdp-baseline.ts`, `src/components/ProductDetailPage.tsx` |
| PDP baseline guards | `docs/baselines/pdp-queries.json` |
| Product-funnel PWA offline e2e | `e2e/pwa-offline-smoke.spec.ts` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 127 deferred items + competitive audit | ✅ |
| 2 | Only products with verified YouTube citations get VideoObject | ✅ 2/2 catalogue rows |
| 3 | review-evidence preferred over raw `sourceUrls` for watch URL | ✅ Astrox 88D Pro uses evidence row |
| 4 | `expectVideoObjectJsonLd` on both YouTube-backed PDP golden profiles | ✅ |
| 5 | Product-funnel CrUX paths unchanged (88 non-home) | ✅ unchanged |
| 6 | PWA precache paths unchanged (`ib-v33`) | ✅ unchanged |
| 7 | No YouTube `sameAs` uncommented (channel still unclaimed) | ✅ deferred |
| 8 | HelpfulReaction / string articles / tier-4 images assessed — deferred | ✅ deferred |
| 9 | Product-funnel offline e2e covers `/results/`, `/compare/`, `/saved/` | ✅ |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run lint:product-funnel-baselines
npm run build
npx playwright test e2e/pwa-offline-smoke.spec.ts e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| PDP e2e golden profiles | 82 (unchanged) |
| PDP VideoObject golden profiles | 2 (new) |
| Product-funnel pages in CrUX | 3/3 (unchanged) |
| Product-funnel offline e2e shells | 3/3 (new) |
| PWA cache version | ib-v33 (unchanged) |
| Trust-path e2e golden profiles | 24 (unchanged) |
