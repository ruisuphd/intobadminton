# Unmapped Blog Sources — Triage (May 2026)

**Inventory date:** 2026-05-25  
**Mapped sources:** 119  
**Unmapped active files:** 0  
**Archived (merged / duplicate):** 12 in `blogs/_archive/`

All previously deferred sources are now mapped or merged. Re-run verification after any new `blogs/*.md` drop.

---

## Latest sprint (user decisions)

| Source | Decision | Live URL |
|--------|----------|----------|
| `comparison-li-ning-halbertec-flagship-lineup.md` | **Separate comparison** (not patched into 9000 standalone) | `/comparisons/li-ning-halbertec-flagship-lineup-review/` |
| `comparison-yonex-nanoflare-800-pro-vs-700.md` | **Separate comparison** | `/comparisons/yonex-nanoflare-800-pro-vs-nf700/` |
| `review-li-ning-bladex-800-speed-racket.md` | **Merged** into `li-ning-bladex-800-speed-tough-elastic` source | `/comparisons/li-ning-bladex-800-speed-tough-elastic/` |
| `review-yonex-aerosensa-50-shuttlecock.md` | **Product review** | `/review/yy-as-50/` |
| `review-yonex-power-cushion-comfort-z3-shoes.md` | **Product review** (source was mis-scraped 88 Dial — rewritten for Comfort Z3) | `/review/yy-comfort-z3/` |
| `review-yonex-astrox-88s-88d-pro-rackets.md` | **Merged** 2018 lineage intro into `yonex-astrox-88-pro-2024-review` source; archived duplicate body | `/comparisons/yonex-astrox-88-pro-2024-review/` (+ S vs D at `/comparisons/yonex-astrox-88d-pro-vs-88s-pro-2024/`) |

### Astrox 88 longform — why merge, not a third URL

The archived longform is the **same paired gen-3 88S/D Pro review style** already served by `yonex-astrox-88-pro-2024-review` and `yonex-astrox-88d-pro-vs-88s-pro-2024`. A third slug would duplicate SEO intent. Only the **2018 lineage paragraph** was unique; that now leads the live 2024 hub review. S-vs-D head-to-head stays on the comparison slug — different reader job.

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

npm run blog:import && npm run blog:validate && npm test && npm run build
```

---

## Related docs

- [`BLOG_INGESTION_PLAN.md`](BLOG_INGESTION_PLAN.md)
- [`AUDIT_2026-05.md`](AUDIT_2026-05.md)
