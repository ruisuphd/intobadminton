# Recommendation model (MVP)

The finder builds a **UserProfile** (see `src/lib/taxonomy.ts`) and scores each racket with weighted subscores:

| Subscore | Role |
|----------|------|
| **style** | Head balance vs selected play styles (e.g. offensive → head-heavier). |
| **discipline** | Doubles/mixed nudge toward lighter or head-light patterns. |
| **level** | Shaft flex vs self-assessed level band. |
| **budget** | Price vs optional `budgetMaxUsd`. |
| **body** | Coarse build/injury flags (e.g. avoid stacking ultra-stiff with injury flags). |

Weights are in `src/lib/scoring.ts` (fitness sum). **Reason codes** map to human-readable copy in `src/lib/reason-codes.ts`.

This is a **tunable heuristic**, not a trained model. When you add analytics, log distributions and A/B test weights—not dark patterns.

## Evaluation

- Maintain a small spreadsheet of “persona → expected top 3” and run it after catalog changes.
- Compare click-through to outbound brand pages and dwell time on explainers when you have traffic.
