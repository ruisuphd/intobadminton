# Automation run log

Cron and cloud-agent runs that sync reviews from the private `blogs/` drop.

## 2026-06-04 — Chinese reviews translation cron (`0 22 * * *`)

**Trigger:** scheduled automation (`0 22 * * *`) — branch `cursor/new-chinese-reviews-translation-5143`

### Blog source check

| Check | Result |
| --- | --- |
| Local path `~/Desktop/Files/Singapore Company/intobadminton/blogs` | Not mounted in cloud workspace |
| Repo `blogs/` | Absent — translation/import blocked |
| `blog-slug-source-map.json` vs `blog-articles.json` | 146 slugs mapped and imported on `main`; no drift |
| New Chinese reviews translated this run | **None** (no markdown drop available) |

**Unblock for next cron run:** sync the private drop before the agent starts:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
npm run blog:check   # fails in Cursor Agent if Chinese files lack ## English Translation
```

Then translate (Chinese above, English below), rename files to English, update `scripts/blog-slug-source-map.json`, and run `blog:import` → `blog:validate` → tests → build.

### Repo changes this run

- `scripts/blog-path.mjs`, `scripts/sync-blogs-drop.mjs`, `npm run blog:sync`
- `blog:check` reports Chinese filenames missing `## English Translation`; fails under `CURSOR_AGENT=1` when `blogs/` is absent

---

## 2026-06-04 — nightly reviews + maturity pass

**Trigger:** scheduled automation (`0 1 * * *`)

### Blog source check

| Check | Result |
| --- | --- |
| Local path `~/…/intobadminton/blogs` | Not mounted in cloud workspace (expected; directory is gitignored) |
| Repo `blogs/` | Absent — `npm run blog:check` exits 0 with skip message |
| `blog-slug-source-map.json` vs `blog-articles.json` | 146 slugs mapped and imported; no drift |
| New translations this run | None (no new markdown available to import) |

**When new reviews land:** copy translated `## English Translation` sections into `blogs/*.md`, map filenames in `scripts/blog-slug-source-map.json`, then run:

```bash
npm run blog:check
npm run blog:import
npm run blog:validate
npm test && npm run build
```

### App maturity changes (this PR)

- Added `scripts/check-new-blog-sources.mjs` and `npm run blog:check` for cron/CI.
- Wired existing `ArticleToc`, `SocialShare`, and `HelpfulReaction` on `/review/[slug]/` articles.
- Reviews index shows live article count.
- Lint cleanup: removed stale eslint-disable directives and unused import in `structured-data.ts`.

### Verification

- `npm run lint` — pass (0 errors)
- `npm test` — 168 tests pass
- `npm run build` — pass; SEO audit OK (643 HTML, 204 sitemap URLs)
