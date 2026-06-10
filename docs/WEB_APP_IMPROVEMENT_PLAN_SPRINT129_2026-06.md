# Web App Improvement Plan — Sprint 129 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-65f6`  
**Baseline:** Sprint 128 — VideoObject PDP schema + product-funnel PWA offline e2e (PR #278).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 129 response |
|------------|---------------------------|---------------------|
| **Badminton Insight / Spinrider** | YouTube creator reviews surfaced as first-class product evidence with thumbnails | ✅ Creator-video card with thumbnail on VideoObject PDPs |
| **RTINGS** | Product pages show community + creator evidence alongside specs | ✅ `EvidenceCards` on PDP (was quiz-results only) |
| **Tennis Warehouse** | Spec pages link to third-party review references | ✅ Community evidence rows remain on PDP below creator card |
| **Wirecutter** | Transparent sourcing on recommendation pages | ✅ Methodology link + metadata-only summaries unchanged |
| **RacketGuide-style finders** | Post-quiz and PDP surfaces share evidence treatment | ✅ Shared `EvidenceCards` component with YouTube dedupe |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v33, VideoObject JSON-LD on 2 PDPs, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards.

---

## 2. Top 5 gaps (Sprint 129)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **VideoObject schema without visible creator evidence on PDP** | YouTube-first reviewers show thumbnails; IntoBadminton had JSON-LD only | ✅ Creator-video card on `/product/` |
| 2 | **EXBOLT 63 YouTube invisible in UI** | `sourceUrls` YouTube drove VideoObject but `EvidenceCards` only read `review-evidence.json` | ✅ `youtubeEvidenceForProduct` wired into shared evidence UI |
| 3 | **PDP evidence section not CI-guarded** | Visible evidence could drift from VideoObject baseline | ✅ `expectEvidenceSection` + `expectYoutubeEvidenceUi` on 2 golden PDPs |
| 4 | **No Playwright guard for creator-video UI** | Regression risk on competitive parity surface | ✅ PDP e2e checks region + “Watch on YouTube” link |
| 5 | **HelpfulReaction production wiring** | Social proof counts local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 130+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; YouTube `sameAs` (channel claim); fill CrUX/GSC CSV cells; RSL shuttle verified images; expand VideoObject as more products gain YouTube evidence rows.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Creator-video evidence card | `src/components/EvidenceCards.tsx` |
| PDP evidence section | `src/components/ProductDetailPage.tsx` |
| PDP baseline guards | `src/lib/pdp-baseline.ts`, `docs/baselines/pdp-queries.json` |
| PDP e2e smoke | `e2e/pdp-baseline-smoke.spec.ts` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 128 deferred items + competitive audit | ✅ |
| 2 | Creator-video UI only when `youtubeEvidenceForProduct` returns a ref | ✅ 2/2 VideoObject PDPs |
| 3 | Community evidence deduped when same YouTube URL already shown | ✅ Astrox 88D Pro |
| 4 | `expectEvidenceSection` + `expectYoutubeEvidenceUi` on both golden profiles | ✅ |
| 5 | VideoObject JSON-LD unchanged (schema-only Sprint 128 work) | ✅ |
| 6 | PWA precache paths unchanged (`ib-v33`) | ✅ unchanged |
| 7 | HelpfulReaction / string articles / tier-4 images assessed — deferred | ✅ deferred |
| 8 | No YouTube `sameAs` uncommented (channel still unclaimed) | ✅ deferred |
| 9 | PDP e2e covers evidence region + creator-video link | ✅ |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/pdp-baseline-smoke.spec.ts --grep "pdp-explainer-yy-exbolt-63|pdp-racket-yy-astrox-88d-pro-2024"
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| PDP e2e golden profiles | 82 (unchanged) |
| PDP VideoObject golden profiles | 2 (unchanged) |
| PDP creator-video UI golden profiles | 2 (new) |
| PWA cache version | ib-v33 (unchanged) |
