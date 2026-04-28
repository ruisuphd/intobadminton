# Recommendation model

The finder builds a **UserProfile** (see `src/lib/taxonomy.ts`) and scores rackets, strings, shoes, and bags with weighted subscores:

| Subscore | Role |
|----------|------|
| **style** | Category-specific style fit: racket balance, string control/repulsion, shoe fit, or bag workflow. |
| **discipline** | Singles/doubles/mixed fit, including doubles speed, string durability, shoe stability, and bag capacity. |
| **level** | Demand level vs self-assessed level band. |
| **budget** | Price vs optional `budgetMaxUsd`. |
| **body** | Coarse build, foot width, string tension, and comfort flags. |

Weights are in `src/lib/scoring.ts` (fitness sum). **Reason codes** map to human-readable copy in `src/lib/reason-codes.ts`.

This is a **tunable heuristic**, not a trained model. When you add analytics, log distributions and A/B test weights—not dark patterns.

## Evidence And Depreciation

- Official specs remain the strongest source.
- BadmintonCN, Reddit, and YouTube are rights-limited evidence sources. Store links, themes, confidence, and short summaries only.
- Resale estimates are shown as market context, not guaranteed prices. They should include confidence, basis, and last updated date.

## Evaluation

- Maintain a small spreadsheet of “persona → expected top 3” and run it after catalog changes.
- Include category persona fixtures for strings, shoes, and bags.
- Compare click-through to outbound brand pages and dwell time on explainers when you have traffic.
