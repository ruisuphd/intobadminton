# Automation run log

Cron and cloud-agent runs that sync reviews from the private `blogs/` drop.

## 2026-06-04 — PR #95 `ready_for_review` (translation run `cursor/new-chinese-reviews-translation-218b`)

**Trigger:** GitHub pull request #95 (`ready_for_review`) — Sprint 3 web app (`cursor/web-app-improvement-plan-22e9`). **Sprint 3 merged to `main`** (squash). Translation workflow ran in parallel on this branch.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` mapped sources | **146** |
| `blog-articles.json` imported articles | **146** — no import drift |
| New translations this run | **None** |

### PR #95 (Sprint 3 — merged)

- Catalog products in site search + kind filter chips; affiliate disclosure on commercial pages; engagement chrome on best-of/compare guides; brand filter on `/results/`.
- Notify-me lint: resolved on PR branch via `eslint-disable` for localStorage hydrate (main after merge).

### Translation / import

Not performed — no `blogs/` drop. Re-run after syncing:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
CURSOR_AGENT=1 npm run blog:check
# translate → rename → npm run blog:import && npm run blog:validate
```

---

## 2026-06-04 — Web app Sprint 3 PR #94 (branch `cursor/web-app-improvement-plan-0fb2`)

**Trigger:** Cloud agent — Sprint 3 engagement loops merged with `main` Buttondown notify-me.

### Shipped

- Notify-me: Buttondown when `NEXT_PUBLIC_BUTTONDOWN_USERNAME` set; else `notify-me.ts` local intent
- `HomeRecentShortlists`, expanded `HomeToolkitStrip`, `/saved/` in search + Lighthouse

### Blog source check

| Check | Result |
| --- | --- |
| Repo `blogs/` | **Absent** — no translation/import this run |

---

## 2026-06-04 — PR #87 `ready_for_review` re-trigger (branch `cursor/new-chinese-reviews-translation-d088`)

**Trigger:** GitHub pull request #87 (`ready_for_review`) — run-log PR **already merged** to `main` as `9d5b349`; this automation re-ran the full translate → import → web-app update workflow.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` mapped sources | **126** |
| `blog-articles.json` imported articles | **146** — no import drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 177 passed
- `npm run build` + postbuild SEO audit — pass (646 HTML, 207 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merge this runlog PR only; re-run after syncing:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
CURSOR_AGENT=1 npm run blog:check
```

---

## 2026-06-04 — PR #84 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-dbb4`)

**Trigger:** GitHub pull request #84 (`ready_for_review`) — Chinese review translation workflow (cron template). PR #84 itself is web-app Phase B (`cursor/web-app-improvement-plan-a493`); translation remains blocked without the private `blogs/` drop.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` mapped sources | **126** |
| `blog-articles.json` imported articles | **146** — no import drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 177 passed
- `npm run build` + postbuild SEO audit — pass (646 HTML, 207 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merged to `main` as runlog documentation (`e423c0d`); re-run after syncing:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
CURSOR_AGENT=1 npm run blog:check
```

---

## 2026-06-04 — PR #83 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-f3aa`)

**Trigger:** GitHub pull request #83 (`ready_for_review`) — Sprint 2 web-app PR **already merged** to `main` as `15eba41` before this run completed.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 176 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merged to `main` as runlog documentation; re-run after syncing the private drop:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
# or: BLOGS_DIR=/path/to/mounted/blogs npm run blog:check
```

---

## 2026-06-04 — PR #82 `ready_for_review` re-run (branch `cursor/new-chinese-reviews-translation-3c08`)

**Trigger:** GitHub pull request #82 (`ready_for_review`) — runlog PR **already merged** to `main` as `8300bed` before this cloud run completed.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 176 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). PR #82 already on `main`; no follow-up merge required for this run unless a new runlog-only PR is opened. Re-run after syncing the private drop:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
# or: BLOGS_DIR=/path/to/mounted/blogs npm run blog:check
```

---

## 2026-06-04 — PR #80 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-d661`)

**Trigger:** GitHub pull request #80 (`ready_for_review`) — web-app maturity PR **already merged** to `main` as `efbcab2` before this run started.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 173 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merge this PR only to land run-log documentation; re-run after syncing the private drop:

```bash
npm run blog:sync -- "/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs"
# or: BLOGS_DIR=/path/to/mounted/blogs npm run blog:check
```

---

## 2026-06-04 — PR #78 `ready_for_review` re-trigger (branch `cursor/new-chinese-reviews-translation-66ff`)

**Trigger:** GitHub pull request #78 (`ready_for_review`) — runlog PR **already merged** to `main` as `65e6153`; PR #79 landed overlapping runlog while this run was in flight.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-articles.json` vs slug list | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no content changes)

- `npm test` — 173 passed
- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

No translation PR merged (no `blogs/` drop). PR #81 closed as duplicate of PR #79 runlog on `main`. Re-run after `npm run blog:sync` with the Desktop path or `BLOGS_DIR`.

---

## 2026-06-04 — PR #79 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-c075`)

**Trigger:** GitHub pull request #79 (`ready_for_review`) — documents the same blocked translation run as PR #77; no new source drop in cloud VM.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs imported articles | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 173 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

Translation, rename, import, and web-app review updates **not performed** (no `blogs/` drop). Merged to `main` as `e3273c5`. Re-run after `npm run blog:sync` with the Desktop path or a mounted `BLOGS_DIR`.

---

## 2026-06-04 — PR #77 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-c075`)

**Trigger:** GitHub pull request #77 (`ready_for_review`) — web-app maturity PR **already merged** to `main` as `c9bf4ef` before this run completed.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-slug-source-map.json` vs `blog-articles.json` | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no review content changes)

- `npm run blog:validate` — 20/20 passes, 0 issues
- `npm test` — 173 passed
- `npm run build` + postbuild SEO audit — pass (644 HTML, 205 sitemap URLs)

### Merge status

No Chinese source files to translate, rename, or import. Re-run after syncing `blogs/` into the workspace (see unblock steps in the cron entry below).

---

## 2026-06-04 — PR #76 `ready_for_review` re-trigger (branch `cursor/new-chinese-reviews-translation-29b3`)

**Trigger:** GitHub pull request #76 (`ready_for_review`) — documentation PR **already merged** to `main` as `d267f61`.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-articles.json` vs slug list | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no content changes)

- `npm test` — 173 passed
- `npm run blog:validate` — 20/20 passes, 0 issues

### Merge status

PR #76 already merged. No translation PR opened (no `blogs/` drop). Re-run after `npm run blog:sync` with the Desktop path or `BLOGS_DIR` pointing at a mounted copy.

---

## 2026-06-04 — PR #75 `ready_for_review` (branch `cursor/new-chinese-reviews-translation-6a07`)

**Trigger:** GitHub pull request #75 (`ready_for_review`) — tooling PR already **merged** to `main` as `b206650`.

### Blog source check

| Check | Result |
| --- | --- |
| Path `/Users/ruisu/Desktop/Files/Singapore Company/intobadminton/blogs` | **Not found** in cloud VM (`npm run blog:sync` exit 1) |
| Repo `blogs/` | **Absent** — `CURSOR_AGENT=1 npm run blog:check` exit 1 |
| Chinese filenames pending `## English Translation` | **Unknown** (no drop to scan) |
| `blog-articles.json` vs slug list | **146 / 146** — no drift on `main` |
| New translations this run | **None** |

### Verification (no content changes)

- `npm test` — 168 passed
- `npm run blog:validate` — 20/20 passes, 0 issues

### Merge status

PR #75 merged with sync/check tooling only. No follow-up PR opened (nothing to import). Re-run after syncing `blogs/` into the workspace.

---

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
