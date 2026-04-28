# Multilingual product aliases

Alias data lives in [src/data/product-aliases.json](../src/data/product-aliases.json), with helper functions in [src/lib/aliases.ts](../src/lib/aliases.ts).

## Goal

Badminton communities often refer to the same racket by:

- official English name;
- abbreviation (`AX100ZZ`, `NF1000Z`);
- Chinese brand name (`尤尼克斯`, `李宁`, `胜利`);
- Chinese series nickname (`天斧`, `疾光`, `龙牙`);
- regional spelling differences.

The alias layer prevents evidence from BadmintonCN, BadmintonCentral, Reddit, YouTube, and retailers from being attached to the wrong product.

## Matching policy

1. Exact canonical ID match wins.
2. Official model alias wins over loose brand-only match.
3. Chinese nickname match requires manual review before aggregation.
4. Legacy/discontinued products need explicit `launchYear` and status.
5. Ambiguous matches remain in an editorial queue; they do not affect recommendation scores.

## Next backend phase

Move aliases into Firestore collection `productAliases` and add an admin UI to approve uncertain matches.
