# Design system (MVP)

**Direction:** Calm, Apple-inspired minimal layout — generous spacing, one accent, system/Inter text. See product plan §2.3.1.

## Tokens (CSS)

Defined in `src/app/globals.css`:

- **Backgrounds:** `--background`, `--surface`
- **Text:** `--text`, `--color-muted`
- **Accent:** `--color-accent` (court-adjacent green, light/dark)
- **Lines:** `border-zinc-200/80` (light) / `border-zinc-700/80` (dark)

## Typography

- **Inter** (next/font) as `--font-inter`; body line-height ~1.6.
- Titles: semibold, tracking tight; avoid all-caps blocks.

## Components

- **Radius:** 1rem–1.25rem on cards and primary actions (`rounded-2xl`).
- **Controls:** Pills/segmented for style tags; full-width primary CTA on mobile.
- **Motion:** keep transitions &lt;300ms; respect `prefers-reduced-motion` in `globals.css`.

## Ads

- `AdSlot` reserves dashed bordered regions so AdSense can slot in without breaking the grid. Sidebar placeholder is `AdSidebar` for `lg+` layouts (optional on pages that use a two-column shell).

## Brand safety

Do not copy third-party marks. **IntoBadminton** naming and any logo you add should be original.
