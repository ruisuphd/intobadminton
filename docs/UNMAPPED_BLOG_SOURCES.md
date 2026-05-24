# Unmapped Blog Sources — Triage (May 2026)

**Context:** `scripts/blog-slug-source-map.json` maps public blog slugs → `blogs/*.md` English sources. The Option B import pipeline (`scripts/blog-import-option-b.py`) reads mapped files only; unmapped files are editorial backlog.

**Inventory date:** 2026-05-24  
**Total `blogs/*.md` files:** 124  
**Mapped sources:** 114  
**Unmapped at triage:** 10 (+ 1 resolved this sprint)

---

## Summary

| Decision | Count |
|----------|-------|
| **mapped** | 1 (Bonny WuQue 089 — resolved 2026-05-24) |
| **deferred** | 8 |
| **archive** | 2 |

---

## Triage table

| Source file | Decision | Target slug (if any) | Rationale |
|-------------|----------|----------------------|-----------|
| `review-bonny-wuk-que-089-racket.md` | **mapped** | `bonny-wuque-flagship-089-shoes-review` | Sprint 10B shoe review; product `bonny-wuque-089-shoes` in catalogue. Mapped in `blog-slug-source-map.json` line 128. Re-run `npm run blog:import` after English section edits. |
| `comparison-li-ning-halbertec-flagship-lineup.md` | deferred | — (enrichment for `li-ning-halbertec-9000-standalone-review`) | Standalone Halbertec 9000 colour/spec narrative. Live slug `li-ning-halbertec-9000-standalone-review` already covers the product; merge unique colour/spec paragraphs rather than new URL. |
| `comparison-yonex-nanoflare-800-pro-vs-700.md` | deferred | `yonex-nanoflare-800-pro-vs-nf700` (proposed) | NF800 Pro vs NF700 head-to-head; distinct from `comparison-yonex-nanoflare-800-pro-vs-auraspeed-hs-plus.md`. Needs new slug + sitemap entry; medium SEO value. |
| `review-li-ning-bladex-800-speed-racket.md` | deferred | — (enrichment for `li-ning-bladex-800-speed-tough-elastic`) | Standalone Bladex 800 Speed launch review. Comparison slug already live; avoid third URL on same frame. Extract first-person feel notes into existing article. |
| `review-li-ning-halbertec-7000-racket.md` | deferred | — (gen-1 backfill vs `li-ning-halbertec-7000-ii-review`) | Gen-1 Halbertec 7000 source. Confirm whether live slug covers gen 1 or gen 2 before creating `li-ning-halbertec-7000-original-review`. |
| `review-li-ning-l69-string-wuhan-store-spotlight.md` | deferred | — (enrichment for `li-ning-l69-string-review`) | Store-visit / stringer narrative; not a separate product review. Add "where to buy / stringing" callout to existing L69 article. |
| `review-yonex-aerosensa-50-shuttlecock.md` | deferred | `yonex-aerosensa-50-shuttle-review` (proposed) | Product `Aerosensa 50 (AS-50)` exists in `products.json`; no blog slug yet. Good Sprint 13 candidate — premium shuttle tier with AS-30/AS-40 cross-links. |
| `review-yonex-astrox-88s-88d-pro-rackets.md` | archive | — | Long-form 2018-era 88 S/D history. Superseded by `yonex-astrox-88-pro-2024-review` and `yonex-astrox-88d-pro-vs-88s-pro-2024`. Keep file as reference; do not import. |
| `review-yonex-astrox-99-sun-orange-racket-quirky.md` | deferred | `yonex-astrox-99-sun-orange-review` (proposed) | Curiosity / colourway angle on gen-1 Astrox 99. Low SEO priority; useful internal link from `yonex-astrox-99-pro-gen-1-review`. |
| `review-yonex-power-cushion-comfort-z3-shoes.md` | deferred | `yonex-comfort-z3-shoes-review` (proposed) | Product in catalogue; editor notes reference Comfort Z3 vs Eclipsion Z3. Pairs with shoe-fit cluster; no slug yet. |
| `reviews-yonex-nanoflare-800-pro-and-tour.md` | archive | — | NF800 Pro/Tour paired review. Live slug `yonex-nanoflare-800-pro-tour-review` already ingested from `comparison-yonex-nanoflare-800-pro-tour-game-play-1000z.md`. Duplicate intent — do not map second slug. |

---

## Actions by decision

### Mapped (done)

- [x] Add `bonny-wuque-flagship-089-shoes-review` → `review-bonny-wuk-que-089-racket.md` in `blog-slug-source-map.json`
- [x] Add product link in `blog-review-product-map.json` → `bonny-wuque-089-shoes`
- [ ] Re-import when English section is finalized: `npm run blog:import && npm run blog:validate`

### Deferred (next sprints)

1. **Shuttle + shoes (highest catalogue fit):** AS-50, Comfort Z3 — new slugs, add to `blog-slugs-list.json`, import, sitemap.
2. **Comparison gap:** NF800 Pro vs NF700 — new slug; cross-link Nanoflare cluster.
3. **Enrichment-only (no new URL):** Halbertec 9000 lineup, Bladex 800 Speed standalone, L69 Wuhan spotlight — patch existing JSON bodies via import overrides or manual edit.
4. **Gen-1 backfill:** Halbertec 7000 original — clarify generation on live 7000-II slug first.

### Archive (no import)

- Move to `blogs/_archive/` optional; or leave in place with this doc as the index.
- Do not add to `blog-slug-source-map.json`.

---

## Verification

```bash
# List unmapped files (expect 10 until deferred items are mapped)
python3 - <<'PY'
import json
from pathlib import Path
mapped = {v for v in json.loads(Path("scripts/blog-slug-source-map.json").read_text()).values() if v}
all_md = {p.name for p in Path("blogs").glob("*.md")}
print("\n".join(sorted(all_md - mapped)) or "(none)")
PY

# After any new mapping
npm run blog:import && npm run blog:validate && npm test
```

---

## Related docs

- [`BLOG_INGESTION_PLAN.md`](BLOG_INGESTION_PLAN.md) — historical 72-file triage + Sprint 10A–12 status
- [`AUDIT_2026-05.md`](AUDIT_2026-05.md) — pass 2 source-map completeness
