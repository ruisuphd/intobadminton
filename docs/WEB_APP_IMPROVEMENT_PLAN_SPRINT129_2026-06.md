# Web App Improvement Plan — Sprint 129 (June 2026)

**Branch:** `claude/practical-cerf-f96545`  
**Baseline:** Sprint 128 — VideoObject PDP schema + product-funnel PWA offline e2e (PR #278).

---

## 1. Competitive audit (June 2026)

| Competitor | Strength vs IntoBadminton | Sprint 129 response |
|------------|---------------------------|---------------------|
| **Wirecutter / RTINGS** | Hand-crafted SERP titles on every review (brand + product + angle) | ✅ 63 machine-cased placeholder titles ("Rsl At70 Racket Review") replaced with curated 50–90-char titles |
| **Wirecutter** | One canonical URL per tested product — no self-competing duplicates | ✅ 7 near-duplicate review pairs (83–98% body similarity) consolidated via cross-canonical + sitemap exclusion |
| **RTINGS** | Review page product panel always matches the reviewed product | ✅ Aerus Z2 deep dive un-mislabeled from "88 Dial 3"; AZ2 PDP now links its own review instead of an Eclipsion Z3 alias |
| **Badminton Insight** | Player-sponsorship facts correct (Antonsen ↔ Auraspeed) | ✅ "Anton Axelsen" → "Anders Antonsen" fixed in 90K Metallic review (JSON + both source copies) |
| **Editorial blogs** | Native-speaker copy quality | ✅ 45 voice-normalization grammar artifacts ("I rates", "I's level", "The community I is") fixed; conjugation post-pass added to both pipeline scripts |

**Moat unchanged:** transparent fit score, `/data/` claims registry, static export, postbuild SEO gate, PWA ib-v33, 20/20 commercial image CI, 80/80 all-category editorial parity, 82 PDP e2e guards, 124 catalog e2e guards, 24 trust-path e2e guards, 13 compare-guides e2e guards, 3/3 product-funnel CrUX paths.

---

## 2. Fact-check audit (user-requested, vs local `blogs/` sources)

| Check | Scope | Result |
|-------|-------|--------|
| Numeric spec cross-check (weights g, tensions lb, balance/shaft mm) | 117 articles with spec numbers vs mapped source markdown | ✅ 100% consistent (2 regex false positives manually verified correct: Fantome 5.8 mm shaft, Ryoga Shiden 7.5→6.7 mm taper) |
| Jun-2026 drop (7 reviews) | 88.1 g / 82.14 g / 94.0 g / 85.02 g, balance 299/300/305 mm, tensions | ✅ all match Chinese sources |
| Voice-normalization grammar artifacts | all 153 articles + source markdown | ⚠️ 45 hits in 16 articles — **fixed**; root cause: `"one reviewer" → "I"` swaps without verb conjugation; post-pass added to `blog-en-persona-normalize.py` and `blog-import-option-b.py` (`GRAMMAR_FIXES`) |
| Player-fact errors | sponsorship/usage claims | ⚠️ "Anton Axelsen" (conflation of Anders Antonsen + Viktor Axelsen) in 90K Metallic review — **fixed** in JSON + repo & Desktop markdown |
| Article ↔ product integrity | review-product map | ⚠️ `yonex-power-cushion-88-dial-3-review` body is the **Aerus Z2 (SHBAZ2MEX)** deep dive — **remapped** to `yy-aerus-z2`, retitled, alias removed; ⚠️ `rsl-aero-u-shuttle-review` body reviews the **Classic Tourney** (source never mentions Aero U) — retitled honestly + canonicalised to the Classic review |
| 20-pass structural/voice gate + source-attribution gate | full corpus | ✅ 20/20 passes, 0 issues |

**Open flags (owner decision, Sprint 130+):**
- `rsl-aero-u-shuttle`'s PDP still links the Classic-content review; needs either a sourced Aero U review or removal of the review link.
- 6 deliberate "second-perspective" duplicate slugs remain live (now canonicalised); full archive+redirect would also free crawl budget.
- Outdated `reference-blog-ingestion` flow docs (blog.ts-era) superseded by markdown→`blog-articles.json` pipeline.

---

## 3. Top 5 gaps (Sprint 129)

| # | Gap | Impact | Delivery |
|---|-----|--------|----------|
| 1 | **41% of review titles were slug-cased placeholders** ("Li Ning Bladex 900 New Review", "Goshen", "Rsl") | `<title>` is the highest-leverage on-page element; junk casing suppresses CTR and looks machine-generated | ✅ 63 curated titles in `blog-articles.json` + `TITLE_OVERRIDES` (survives re-import) |
| 2 | **7 near-duplicate review pairs self-canonical + sitemapped** | Cannibalization; duplicate-content quality signal | ✅ `src/lib/review-canonical.ts` cross-canonicals + sitemap exclusion + audit exemptions + unit tests |
| 3 | **Aerus Z2 review published under wrong product/title** | Buyers on the AZ2 PDP were sent to an Eclipsion Z3 review while the real AZ2 review sat mislabeled | ✅ remap + retitle + alias removal + 4 baseline updates |
| 4 | **Grammar artifacts undermining E-E-A-T** | "I rates it a clear over-performer" reads as machine translation | ✅ 45 fixes + self-healing `GRAMMAR_FIXES` in both pipeline scripts |
| 5 | **Pipeline could regress all of the above on next import** | `VOICE_FIXES` re-introduces artifacts; auto-titles re-introduce placeholders | ✅ conjugation post-passes + title overrides live in the import script itself |

**Deferred (Sprint 130+):** RSL / Mizuno / Gosen dedicated brand pages (5 / 2 / 2 mapped reviews each — RSL is now the most-reviewed brand without a hub; Anta set the 1-review precedent); archive+redirect for the 6 remaining duplicate slugs; Aero U review sourcing; dedicated Yonex string hands-on articles; tier-4 Western distributor image backfill; YouTube `sameAs` (channel claim); CrUX CSV cells (owner runs `capture:crux-psi`); HelpfulReaction production wiring.

---

## 4. Execution summary

| Deliverable | Files |
|-------------|-------|
| Curated titles (63) | `src/data/blog-articles.json`, `scripts/blog-import-option-b.py` (`TITLE_OVERRIDES`) |
| Canonical consolidation | `src/lib/review-canonical.ts` (+ test), `src/app/review/[slug]/page.tsx`, `src/lib/sitemap.ts`, `scripts/postbuild-seo-audit.mjs`, `src/lib/locale.test.ts` |
| AZ2 integrity fix | `src/data/blog-review-product-map.json`, `src/lib/review-pages.ts` (+ test), `docs/baselines/{reviews,pdp,catalog-shoe,commercial-shoe}-queries.json` |
| Grammar/voice fixes (45) + Antonsen fix | `src/data/blog-articles.json`, `blogs/*.md` (repo + Desktop drop), `scripts/blog-en-persona-normalize.py`, `scripts/blog-import-option-b.py` |
| Documentation | this file |

---

## 5. Verification

```bash
npm run typecheck      # clean
npm test               # 666/666 (119 files) — includes new review-canonical tests
npm run lint           # 0 errors (5 pre-existing warnings)
npm run build          # static export OK
npm run postbuild      # SEO audit passed — 848 HTML files, 387 sitemap URLs, redirects + feed OK
npm run blog:validate  # 20/20 passes, 0 issues
npm run lint:{reviews,pdp,review-product-map,catalog,discovery}-baseline  # all green
```

Export spot-checks: cross-canonicals emitted on all 7 duplicate URLs (others self-canonical); duplicate URLs absent from `sitemap.xml`; new titles live; "Anders Antonsen" live.

---

## 6. Metrics

| Goal | Target |
|------|--------|
| Review titles meeting 50–90-char curated bar | 153/153 (was 90/153) |
| Self-competing duplicate review URLs in sitemap | 0 (was 7) |
| Review pages whose product panel matches the reviewed product | 153/153 (was 151/153) |
| Voice-normalization grammar artifacts | 0 (was 45) |
| Numeric spec consistency vs `blogs/` sources | 117/117 articles verified |
| Unit tests | 666 (was 661) |
