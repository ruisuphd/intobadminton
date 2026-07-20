# Unmapped Blog Sources — Triage (May–Jun 2026)

**Inventory date:** 2026-07-20  
**Active source files:** mapped (see `npm run blog:check`)  
**Archived Jul 20 Chinese originals:** `blogs/_archive/jul2026-batch3/` (15 files)

## 2026-07-20 drop (ingested 2026-07-20)

| Cluster | Decision | Live URL / notes |
|---------|----------|------------------|
| Yonex EXBOLT / XB63 (3 CN) | **Merged → new** | `/review/yonex-exbolt-63-string-review/` |
| Yonex BG80 | **New** | `/review/yonex-bg80-string-review/` |
| Victor HS Plus / 极音速 (4 CN) | **Enriched** existing HS Plus source | `/review/victor-auraspeed-hs-plus-deep-dive/` |
| Astrox 99 Pro gen3 (2 CN) | **Enriched** gen-3 deep dive | `/review/yonex-astrox-99-pro-3-deep-dive/` |
| Astrox 88S/88D Pro new colour (2 CN) | **Enriched** 2024 twins note | `/review/yonex-astrox-88-pro-2024-review/` |
| TK 龙牙之刃 2 Pro (+ series) | **New** product + review (Ryuga II Pro) | `/review/victor-thruster-ryuga-ii-pro-racket-review/` |
| Li-Ning 无敌号 ACE | **New** product + review (Invincible ACE) | `/review/li-ning-invincible-ace-shoes-review/` |
| Anta Dingyin / EXBOLT 68 bilingual | Re-import only if needed | already live |

---

## 2026-06-04 drop (ingested 2026-06-05)

Nine Chinese-named source files landed on 2026-06-04 (the "blogs drop" PRs #110/#121/#128 had flagged as absent). Triage — 7 published, 2 archived as duplicates:

| Source | Decision | Live URL / target |
|--------|----------|-------------------|
| `…NS-9900-LTG-青剑…` | **Published** (grail) | `/review/yonex-nanospeed-9900-ltg-green-sword-review/` |
| `…VT-ZF-LTD-紫金大姐夫…` | **Published** (grail) | `/review/yonex-voltric-z-force-ltd-2012-review/` |
| `…高神-Ryoga-Shiden…` | **Published** (Gosen racket — 高神 = Gosen, existing brand) | `/review/gosen-ryoga-shiden-review/` |
| `…胜利佛斩-FZ-100XX…` | **Published** | `/review/victor-fz-100xx-budget-attack-review/` |
| `…安踏AH600W…` | **Published** (new brand: Anta) | `/review/anta-ah600w-racket-review/` |
| `…波力雷速800LT…` | **Published** (distinct LT SKU vs `bonny-leisu-800`) | `/review/bonny-leisu-800-lt-review/` |
| `…美津浓carbo-pro-825…` | **Published** (distinct SKU vs 823) | `/review/mizuno-carbo-pro-825-review/` |
| `…胜利「音爆Pro」…` | **Archived** — duplicate of live `victor-sonic-boom-pro-budget-attack-review` | `blogs/_archive/` |
| `…李宁雷霆100二代…` | **Archived** — duplicate of live `li-ning-thunder-100-gen-2-vs-gen-1` (legacy-pinned) | `blogs/_archive/` |

7 net-new reviews authored in `scripts/blog-main-sprint-articles.json` (observer/brand voice; none founder-firsthand). Catalog: 7 `needs_review` rows added to `products.json` (+ Anta brand in `brands.json`), wired via `blog-review-product-map.json`. Gates green: `blog:validate` 0 issues, 220 unit tests, build + SEO audit (672 HTML, 219 sitemap URLs). Reproduce via `scripts/ingest-jun2026-drop.py` + `scripts/ingest-jun2026-catalog.py`.

---

## Latest sprint (user decisions)

| Source | Decision | Live URL |
|--------|----------|----------|
| `comparison-li-ning-halbertec-flagship-lineup.md` | **Separate note** (not patched into 9000 standalone) | `/review/li-ning-halbertec-flagship-lineup-review/` |
| `comparison-yonex-nanoflare-800-pro-vs-700.md` | **Separate note** | `/review/yonex-nanoflare-800-pro-vs-nf700/` |
| `review-li-ning-bladex-800-speed-racket.md` | **Merged** into `li-ning-bladex-800-speed-tough-elastic` source | `/review/li-ning-bladex-800-speed-tough-elastic/` |
| `review-yonex-aerosensa-50-shuttlecock.md` | **Review note** | `/review/yonex-aerosensa-50-shuttle-review/` |
| `review-yonex-power-cushion-comfort-z3-shoes.md` | **Review note** (source was mis-scraped 88 Dial — rewritten for Comfort Z3) | `/review/yonex-comfort-z3-shoes-review/` |
| `review-yonex-astrox-88s-88d-pro-rackets.md` | **Merged** 2018 lineage intro into `yonex-astrox-88-pro-2024-review` source; archived duplicate body | `/review/yonex-astrox-88-pro-2024-review/` (+ S vs D at `/review/yonex-astrox-88d-pro-vs-88s-pro-2024/`) |

### Astrox 88 longform — why merge, not a third URL

The archived longform is the **same paired gen-3 88S/D Pro review style** already served by `yonex-astrox-88-pro-2024-review` and `yonex-astrox-88d-pro-vs-88s-pro-2024`. A third slug would duplicate SEO intent. Only the **2018 lineage paragraph** was unique; that now leads the live 2024 review note. S-vs-D head-to-head stays as its own review note because it answers a different reader job.

---

## Verification

```bash
python3 - <<'PY'
import json
from pathlib import Path
mapped = {v for v in json.loads(Path("scripts/blog-slug-source-map.json").read_text()).values() if v}
all_md = {p.name for p in Path("blogs").glob("*.md")}
print("\n".join(sorted(all_md - mapped)) or "(none)")
PY

npm run blog:check && npm run blog:import && npm run blog:validate && npm test && npm run build
```

---

## Related docs

- [`BLOG_INGESTION_PLAN.md`](BLOG_INGESTION_PLAN.md)
- [`AUDIT_2026-05.md`](AUDIT_2026-05.md)
