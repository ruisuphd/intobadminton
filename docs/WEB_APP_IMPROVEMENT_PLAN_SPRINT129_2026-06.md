# Web App Improvement Plan — Sprint 129 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-62ae`  
**Baseline:** Sprint 128 — VideoObject PDP schema + product-funnel PWA offline e2e (PR #278 merged).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 129 response |
|------------|---------------------------|---------------------|
| **Badminton Insight / Spinrider** | YouTube creator reviews visible on product pages with thumbnail + watch link | ✅ `YoutubeEvidencePanel` on PDPs with cited creator evidence |
| **RTINGS** | Evidence sections surface third-party testing alongside specs | ✅ Creator review reference block between finder panel and specs |
| **Tennis Warehouse** | Product pages link to external video reviews in-page, not schema-only | ✅ Visible panel pairs with Sprint 128 `VideoObject` JSON-LD |
| **Wirecutter** | Transparent third-party evidence labelling | ✅ Methodology link + metadata-summary-only copy |
| **YouTube-first reviewers** | Video is the primary discovery surface | ⏳ `sameAs` channel claim still deferred (handle unclaimed) |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v33, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards, 2 PDP VideoObject golden profiles.

---

## 2. Top 5 gaps (Sprint 129)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **YouTube evidence schema-only on PDP** | Sprint 128 added `VideoObject` JSON-LD but users saw no creator video reference | ✅ `YoutubeEvidencePanel` with thumbnail + watch link |
| 2 | **EXBOLT 63 YouTube only in `sourceUrls`** | `review-evidence.json` lacked YouTube row — inconsistent with Astrox 88D Pro pattern | ✅ `yt-exbolt-63-review-1` evidence row |
| 3 | **No CI guard for visible video panel** | Schema drift was guarded; UI could disappear silently | ✅ `expectYoutubeEvidencePanel` on PDP baseline |
| 4 | **No e2e for creator evidence UI** | Playwright only checked JSON-LD indirectly via review links | ✅ PDP baseline e2e checks heading + "Watch on YouTube" |
| 5 | **HelpfulReaction production wiring** | Social proof counts still local-only without owner secret | ⏳ Owner: set `REACTIONS_API_URL` + run wire workflow |

**Deferred (Sprint 130+):** dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; Nanoray Light 70i verified image; RSL shuttle verified images (4 waivers on `/best/shuttles/`); YouTube `sameAs`; fill CrUX CSV cells (owner runs `capture:crux-psi`).

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Visible YouTube evidence panel | `src/components/YoutubeEvidencePanel.tsx`, `src/components/ProductDetailPage.tsx` |
| EXBOLT 63 YouTube evidence row | `src/data/review-evidence.json` |
| PDP baseline `expectYoutubeEvidencePanel` | `src/lib/pdp-baseline.ts`, `docs/baselines/pdp-queries.json` |
| PDP YouTube panel e2e | `e2e/pdp-baseline-smoke.spec.ts` |
| Unit test update | `src/lib/youtube-evidence.test.ts` |
| Documentation | this file, master plan addendum |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 128 deferred items + competitive audit | ✅ |
| 2 | Panel only renders when `youtubeEvidenceForProduct()` returns data | ✅ |
| 3 | EXBOLT 63 prefers review-evidence row over raw `sourceUrls` | ✅ unit test |
| 4 | `expectYoutubeEvidencePanel` on both YouTube-backed PDP golden profiles | ✅ |
| 5 | Panel uses metadata summary only — no transcript/embed autoplay | ✅ |
| 6 | Astrox 88D Pro baseline keeps `expectVideoObjectJsonLd` + panel guard | ✅ |
| 7 | Non-YouTube PDPs unchanged — no panel on grip/shuttle SKUs without evidence | ✅ |
| 8 | HelpfulReaction owner secret assessed — blocked on repo secret | ✅ deferred |
| 9 | RSL shuttle image hunt assessed — no verified Western distributor photos yet | ✅ deferred |
| 10 | `npm test` + baselines + `npm run build` pass | ✅ |

---

## 5. Verification

```bash
npm test
npm run lint:pdp-baseline
npm run build
npx playwright test e2e/pdp-baseline-smoke.spec.ts
```

---

## 6. Metrics

| Goal | Target |
|------|--------|
| PDP e2e golden profiles | 82 (unchanged) |
| PDP VideoObject golden profiles | 2 (unchanged) |
| PDP YouTube evidence panel golden profiles | 2 (new) |
| Product-funnel offline e2e shells | 3/3 (unchanged) |
| PWA cache version | ib-v33 (unchanged) |
| Trust-path e2e golden profiles | 24 (unchanged) |
