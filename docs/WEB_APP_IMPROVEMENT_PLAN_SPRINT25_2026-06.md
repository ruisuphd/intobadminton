# Web App Improvement Plan — Sprint 25 (June 2026)

**Branch:** `cursor/web-app-improvement-plan-d8b3`  
**Baseline:** Sprint 24 — discovery hub catalog CTAs, guide deep-links, PWA ib-v14 (PR #172).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 25 response |
|------------|---------------------------|-------------------|
| **Tennis Warehouse** | Every educational article ends with filtered catalogue browse | ✅ `GuideCatalogCta` on remaining procedural `/guides/*` landings |
| **Running Warehouse** | Interactive tools link to category-filtered catalog | ✅ `catalogHrefFromToolSlug` + `ToolCatalogCta` on `/tools/*` landings |
| **RTINGS** | Tier-1 brand landings in perf CI | ✅ Lighthouse CI includes `/brands/victor/` and `/brands/li-ning/` |
| **Wirecutter** | Shoes guides offline-capable for installed users | ✅ PWA `ib-v15` precaches wide-feet and shoes-footwork guide shells |
| **RacketGuide** | Calculator → strings/rackets catalog deep-links | ✅ E2E tool + remaining guide catalog CTA smoke |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, 153 first-person reviews.

---

## 2. Top 5 gaps (Sprint 25)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **4 procedural guides lack catalog browse CTA** | Sprint 24 covered Lighthouse set only; wide-feet, shoes-footwork, doubles-roles, equipment-authenticity still dead-end | ✅ `GuideCatalogCta` (or dual CTA on authenticity guide) |
| 2 | **Individual tool pages lack catalog deep-links** | Tools hub has browse CTA but calculators/checkers don't exit to SKU browse | ✅ `catalogHrefFromToolSlug` + `ToolCatalogCta` on 5 tool landings |
| 3 | **Victor and Li-Ning brand routes absent from Lighthouse CI** | Perf regressions on tier-1 brand landings already in PWA precache | ✅ `lighthouserc.json` adds both brand shells |
| 4 | **PWA missing shoes-guide shells** | Installed users lose wide-feet and shoes-footwork guides offline | ✅ `ib-v15` precache for both guide routes |
| 5 | **Shoes guides absent from Lighthouse CI** | Perf regressions on high-intent footwear education routes | ✅ `lighthouserc.json` adds wide-feet and shoes-footwork |

**Deferred (owner / editorial):** deploy reactions worker + `REACTIONS_API_URL`; fill `crux-template.csv`; original `public/products/` photography; YouTube `sameAs` after channel claim.

---

## 3. Execution summary

| Deliverable | Files |
|-------------|-------|
| Tool → catalog deep-link helper | `src/lib/catalog-url.ts`, `catalog-url.test.ts` |
| Tool dual CTA component | `src/components/ToolCatalogCta.tsx` |
| Remaining guide catalog CTAs | `wide-feet-badminton-shoes`, `shoes-footwork`, `doubles-roles`, `equipment-authenticity` pages |
| Tool catalog CTAs | 5 `/tools/*` landings |
| PWA offline expansion | `public/sw.js` (`ib-v15`), `pwa-precache.test.ts` |
| Lighthouse CI | `lighthouserc.json` |
| E2E regression | `e2e/hub-shelf-smoke.spec.ts`, `e2e/pwa-offline-smoke.spec.ts` |

---

## 4. Ten-pass plan verification

| Pass | Check | Result |
|------|-------|--------|
| 1 | Gaps grounded in Sprint 24 deferred list + competitive audit | ✅ |
| 2 | `catalogHrefFromToolSlug` reuses `catalogUrlFromState` / filter params | ✅ |
| 3 | Tool slug map covers all 5 `/tools/*` landings (excl. hub) | ✅ |
| 4 | Guide slug map already covers remaining 4 guides | ✅ |
| 5 | PWA cache version bumped (`ib-v14` → `ib-v15`) | ✅ |
| 6 | Static export — no new API routes | ✅ |
| 7 | Unit tests: `catalog-url.test.ts`, `pwa-precache.test.ts` | ✅ |
| 8 | `npm test` + `npm run build` + postbuild SEO audit | ✅ |
| 9 | E2E: wide-feet guide + string-tension-calculator catalog CTA + PWA ib-v15 | ✅ |
| 10 | Lighthouse CI URL set includes Victor, Li-Ning, shoes guides | ✅ |

---

## 5. Verification

```bash
npm test
npm run build
npx playwright test e2e/hub-shelf-smoke.spec.ts e2e/pwa-offline-smoke.spec.ts
```

---

## 6. Metrics (unchanged)

| Goal | Target |
|------|--------|
| Review→product map (mappable slugs) | 100% (140/140) |
| Pages per session | 2.5+ |
| Tool/guide → catalog CTR | Measurable in GA4 `select_content` |
