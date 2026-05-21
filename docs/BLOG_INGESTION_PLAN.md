# Blog Ingestion Plan — 72 Raw Chinese Reviews Triage

**Source:** `/blogs/` (72 markdown files harvested from BadmintonCN "神兵利器" forum)
**Target:** English `BlogArticle` entries that join the 67 existing posts in `src/lib/blog.ts`
**Template:** `src/lib/blog-source-reviews.ts` (paraphrase, not translate — original buyer guidance with attribution)
**Catalogue:** `src/data/products.json` (currently 65 unique products)

## Triage table (72 entries)

| # | File | Detected product (English) | Brand | Category | Duplicate of | In products.json? | Published BlogSlug? | SEO priority | Proposed English slug | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `Elz3-冷门，好穿，不贵，我的比赛球鞋首选-神兵利器.md` | Power Cushion Eclipsion Z3 | Yonex | review | — | Y (`Power Cushion Eclipsion Z3`) | Y (`yonex-eclipsion-z3-shoes-review`) | 2 | n/a (already published) | Skip — already covered. Could mine for "lesser-known competition shoe" angle. |
| 2 | `TiGe (1).md` | Carbonsonic MAX (synthetic shuttle) | Victor | review | — | Y (`Victor Carbonsonic Max`) | Y (`victor-carbonsonic-max-shuttle-review`) | 2 | n/a (already published) | Skip — already covered. Author "TiGe XLab" voice could enrich existing piece. |
| 3 | `TiGe XLab｜欧击蛇之呼吸：90n与900n的完美结合？年度最佳二线高端.md` | OuJi (Bonny) Snake Breath 蛇之呼吸 | Bonny / OuJi | review | — | N | N | 3 | `bonny-snake-breath-second-tier-flagship-review` | Niche second-tier Chinese brand; G6 handle is unusual angle. Bonny / OuJi is sometimes branded 波力. |
| 4 | `TiGe copy.md` | Li-Ning LT66 Power string + GP100 Pro grip | Li-Ning | review | — | N (neither LT66 nor GP100) | N | 2 | `li-ning-lt66-power-string-and-gp100-pro-grip-review` | Two-in-one accessories review; LT66 is a follow-up to L66. Pairs naturally with existing L69 review. |
| 5 | `TiGe-XLab｜李宁新三大系列全部高端拍横评及选购指南.md` | Li-Ning flagship buying guide (AxForce 100 II + Halbertec 9000 + Bladex 800 Speed lineage) | Li-Ning | guide | — | Partial (most products covered individually) | N | 1 | `li-ning-flagship-racket-buying-guide-2026` | High-value pillar guide — cross-links to AxForce 90/100, Halbertec, Bladex articles already published. Strong internal-link earner. |
| 6 | `TiGe.md` | Halbertec 7000 II (战戟 7000 二代) | Li-Ning | review | — | N (only Halbertec 8000/9000/9000P listed) | Partial — `li-ning-halbertec-7000-ii-review` exists; this file is for the 2nd gen | 1 | `li-ning-halbertec-7000-gen-2-review` (or fold into existing) | Confirm whether existing `li-ning-halbertec-7000-ii-review` covers gen 1 or gen 2. If gen 1, the new file becomes a fresh review. |
| 7 | `【老白测评】流光幻彩、赛博未来-波力乌缺-1982-Y3K-实战测评.md` | Bonny WuQue 1982 Y3K (shoes) | Bonny | review | — | N | N | 2 | `bonny-wuque-1982-y3k-shoes-review` | "Bonny" 波力 brand. Cyberpunk colourway angle. WuQue is Bonny's signature midsole tech. |
| 8 | `中羽众测之李宁L69羽毛球线and武汉青山李宁专卖店-神兵利器.md` | L69 String + Wuhan Qingshan Li-Ning store visit | Li-Ning | review | — | Y (`L69 String`) | Y (`li-ning-l69-string-review`) | 2 | n/a (already published) | Skip core review. Store-visit colour could enrich existing article as a "where to buy" callout. |
| 9 | `中羽众测｜战戟9000-Power：测评初心归来处，方天画戟正当时.md` | Halbertec 9000 Power | Li-Ning | review | — | Y (`Halbertec 9000 Power`) | Partial — `li-ning-halbertec-8000-vs-9000-vs-9000-power` is a comparison | 1 | `li-ning-halbertec-9000-power-deep-dive` | Worth a standalone deep-dive companion to the 3-way comparison. |
| 10 | `中羽测评-大师调教-进攻号角-川崎「MASTER-MAO.md` | Kawasaki Master Mao 20 (矛20) | Kawasaki | review | — | N | Y (`kawasaki-master-mao-20-racket-review`) | 2 | n/a (already published) | Skip — already covered. |
| 11 | `中羽球友-chengzhen-对「ASTROX-100ZZ.md` | Astrox 100ZZ VA (Viktor Axelsen edition) vs Kurenai | Yonex | review | — | Y (`Astrox 100ZZ` + `Astrox 100ZZ VA`) | Y — `yonex-astrox-100zz-axelsen-va-vs-kurenai` | n/a | Already published | Earlier draft mis-translated 安塞龙 (Viktor Axelsen) as "Anders Antonsen" and created a duplicate article. Retracted 2026-05-21 — Antonsen is a Victor athlete (Auraspeed 99), not Yonex. Coverage now lives in the single VA vs Kurenai article. |
| 12 | `中羽球友-chengzhen-对「DriveX-12.md` | DriveX 12 ZSW vs DriveX 12 Original | Victor | comparison | NOT a duplicate of #13 — different content focus | Y (`DriveX 12 O`) | Partial (`victor-drivex-12-vs-astrox-88d-pro` exists) | 2 | `victor-drivex-12-zsw-vs-original-comparison` | ZSW (Zii Jia Lee signature) variant comparison. Distinct from #13 (which compares to DriveX 10). |
| 13 | `中羽球友-chengzhen-对「DriveX-12」的点评详情.md` | DriveX 12 (vs DriveX 10, vs 88dp 新色) | Victor | comparison | NOT a duplicate of #12 | Y | Partial | 2 | `victor-drivex-12-vs-drivex-10-and-88d-pro-2024` | Lineage comparison (10→12 evolution + cross-brand vs 88DP new colour). |
| 14 | `中羽球友-chengzhen-对「雷霆100二代」的点评详情.md` | AxForce 100 Gen 2 (雷霆100 二代) | Li-Ning | review | — | Y (`AxForce 100 Gen 2`) | Y (`li-ning-axforce-100-gen-2-vs-100zz-vs-90-new`) | 1 | n/a (already published) | Skip core. Chengzhen's weight/balance individual-unit data could be a fact-check appendix. |
| 15 | `中羽评测｜「厚」积薄发，稳驭全场-VICTOR-C90NLite.md` | Victor C90NLite (shoes) | Victor | review | — | Partial (`Victor C90NL` mentioned) | Y (`victor-c90nl-shoes-review`) | 2 | n/a (already published) | Skip — likely the same shoe. Confirm Lite suffix vs base. |
| 16 | `中羽评测｜三规格-新幻想-VICTOR-黄金利爪TK-F-C.md` | TK-F-C (Golden Talon, 3 weight specs) | Victor | review | — | N (only `TK-F` Enhanced listed) | Y (`victor-tk-f-c-ultra-review`) | 1 | n/a (already published) | Skip — already covered as Ultra. Verify if TK-F-C and TK-F Ultra are same SKU. |
| 17 | `中羽评测｜以力为基，以速取胜——李宁「雷霆90NEW」体验测评.md` | AxForce 90 New (雷霆 90 New) | Li-Ning | review | — | Y (`AxForce 90 New`) | Y (`li-ning-axforce-90-new-review`) | 1 | n/a (already published) | Skip. |
| 18 | `中羽评测｜以速破力，取巧制胜—YONEX-NF800-PROTOUR.md` | Nanoflare 800 Pro Tour | Yonex | review | — | Partial (`Nanoflare 800 Pro` + `Nanoflare 800 Pro (2024)`) | Y (`yonex-nanoflare-800-pro-tour-review`) | 1 | n/a (already published) | Skip. |
| 19 | `中羽评测｜全面进化-随心所「驭」-VICTOR-驭12.md` | DriveX 12 | Victor | review | — | Y (`DriveX 12 O`) | Y (`victor-drivex-12-vs-astrox-88d-pro` covers it as comparison) | 1 | `victor-drivex-12-standalone-review` | Standalone deep-dive complement to existing comparison piece. |
| 20 | `中羽评测｜内置乾坤，重装上阵-VICTOR-P9200III体验评测.md` | P9200 III (shoes) | Victor | review | — | Y (`P9200 III`) | Y (`victor-p9200-iii-shoes-review`) | 2 | n/a (already published) | Skip. |
| 21 | `中羽评测｜冷冽如刃-幽魅倩影——VICTOR-AURASPEED.md` | Auraspeed Fantôme 影刃 | Victor | review | — | N (only `Auraspeed 90K II`, `100X`, `HS Plus`, `99 J` listed) | Y (`victor-auraspeed-fantome-review`) | 2 | n/a (already published) | Skip. |
| 22 | `中羽评测｜分能独当一面，合则自成一格-YONEX-ASTROX-88.md` | Astrox 88 S Pro / 88 D Pro 2024 (paired review) | Yonex | comparison | — | Y (`Astrox 88D Pro (2024)`, `Astrox 88S Pro (2024)`) | Y (`yonex-astrox-88d-pro-vs-88s-pro-2024`, `yonex-astrox-88-pro-2024-review`) | 1 | n/a (already published) | Skip. |
| 23 | `中羽评测｜同台竞"戟"，可控可攻-问鼎巅峰-—.md` | Halbertec 9000 (single product) | Li-Ning | review | — | Y (`Halbertec 9000`) | Partial (only the 3-way comparison) | 1 | `li-ning-halbertec-9000-standalone-review` | Standalone deep-dive on the 9000 alone — colour-led hook. |
| 24 | `中羽评测｜向上之势-步步制胜-——YONEX-SUBAXIA.md` | Subaxia GT (shoes) | Yonex | review | — | N | Y (`yonex-subaxia-gt-shoes-review`) | 2 | n/a (already published) | Skip. |
| 25 | `中羽评测｜回归暴力本色-YONEX新一代天斧99-PRO体验评测.md` | **Astrox 99 Pro 3rd gen (2025 launch)** | Yonex | review | — | **N (catalogue needs new SKU `yy-astrox-99-pro-3`)** | **Y as of 2026-05-17** (`yonex-astrox-99-pro-3-deep-dive`) | 1 | `yonex-astrox-99-pro-3-deep-dive` | Source explicitly identifies the racket as `新天斧99PRO（暨第三代天斧99）` = 3rd-gen Astrox 99; Yonex globally launched the 3rd-gen ASTROX 99 series on 5 Sep 2025 (re-published 2nd-gen URL on `us.yonex.com/products/astrox-99-pro`). Published as proof-of-voice #1 in this session. |
| 26 | `中羽评测｜奏一曲高昂乐章——VICTOR-神速90K.md` | Auraspeed 90K II | Victor | review | — | Y (`Auraspeed 90K II`) | Y (`victor-auraspeed-90k-ii-review`) | 2 | n/a (already published) | Skip. |
| 27 | `中羽评测｜平衡中的操控，进攻与灵动—李宁战戟7000球拍体验评测.md` | Halbertec 7000 (first generation) | Li-Ning | review | — | N | Y (`li-ning-halbertec-7000-ii-review`) | 2 | n/a or `li-ning-halbertec-7000-original-review` | Confirm whether existing slug covers gen 1 or gen 2. If gen 2, this gen-1 piece becomes a backfill. |
| 28 | `中羽评测｜悬挂滤震，疾速攻坚-—-川崎KACE球鞋体验测评.md` | Kawasaki KACE (shoes) | Kawasaki | review | — | N | Y (`kawasaki-kace-shoes-review`) | 2 | n/a (already published) | Skip. |
| 29 | `中羽评测｜新纪元，新概念-——YONEX-Grpht.md` | Grpht Thrttl (training shoe) | Yonex | review | — | N | Y (`yonex-grpht-thrttl-training-shoe-review`) | 3 | n/a (already published) | Skip. |
| 30 | `中羽评测｜暴力图腾-薰风Kumpoo「修罗II代」-球拍体验测评.md` | Kumpoo Shura II (修罗II代) | Kumpoo | review | — | N | Y (`kumpoo-shura-2-racket-review`) | 3 | n/a (already published) | Skip. |
| 31 | `中羽评测｜灵动便捷，舒适简约-YONEX-POWER-CUSHION.md` | Power Cushion 88 Dial 3 | Yonex | review | — | N | Y (`yonex-power-cushion-88-dial-3-review`) | 3 | n/a (already published) | Skip. |
| 32 | `中羽评测｜焕新升级，灵动制胜-—-YONEX「65Z4」球鞋体验测评.md` | Power Cushion 65 Z4 | Yonex | review | — | Partial (`Power Cushion 65 Z Wide` listed) | Y (`yonex-65z4-shoes-review`) | 2 | n/a (already published) | Skip. |
| 33 | `中羽评测｜疾速进化，细致打磨-YONEX-疾光700.md` | Nanoflare 700 (gen 2 / 2024) | Yonex | review | — | Y (`Nanoflare 700 Game`, `Nanoflare 700 Pro (2024)`) | Y (`yonex-nanoflare-700-review`) | 2 | n/a (already published) | Skip. |
| 34 | `中羽评测｜百兽之力-再铸巅峰-李宁雷霆100二代一代对比体验评测.md` | AxForce 100 Gen 2 vs Gen 1 | Li-Ning | comparison | — | Y | Y (`li-ning-axforce-100-gen-2-vs-100zz-vs-90-new`) | 1 | `li-ning-axforce-100-gen-2-vs-gen-1` | Different angle from existing 3-way comparison — direct generational head-to-head. |
| 35 | `中羽评测｜苍穹之力-一触即发-川崎kawasaki-穿越·星河.md` | Kawasaki Star Cross (穿越·星河) | Kawasaki | review | — | N | Y (`kawasaki-star-cross-racket-review`) | 3 | n/a (already published) | Skip. |
| 36 | `中羽评测｜让弹更稳，让稳更快-李宁贴地飞行ⅢPRO球鞋体验测评.md` | Aerus III Pro / Ranger III Pro 贴地飞行 (shoes) | Li-Ning | review | — | N | Y (`li-ning-aerus-iii-pro-shoes-review`) | 2 | n/a (already published) | Skip. |
| 37 | `中羽评测｜轻拢慢捻抹复挑-YONEX疾光白切NEXTAGE球拍测评.md` | Nanoflare Nextage | Yonex | review | — | N | Y (`yonex-nanoflare-nextage-review`) | 3 | n/a (already published) | Skip. |
| 38 | `中羽评测｜速度制胜——李宁「锋影900-New」体验测评-神兵利器.md` | Bladex 900 New (锋影 900 New) | Li-Ning | review | — | N (`Bladex 800 Speed/New` listed only) | Y (`li-ning-bladex-900-new-review`) | 2 | n/a (already published) | Skip. |
| 39 | `中羽评测｜铿锵有力，见弹见稳-VICTOR「驭10.md` | DriveX 10 Metallic | Victor | review | — | N | Y (`victor-drivex-10-review`) | 2 | n/a (already published) | Skip. |
| 40 | `中羽评测｜鹰击长空-锐不可挡——THRUSTER-F-隼.md` | Thruster F Falcon Ultra (隼U) | Victor | review | — | Y (`Thruster Falcon Enhanced (TK-F)`) | Y (`victor-thruster-falcon-review`) | 2 | n/a (already published) | Skip. |
| 41 | `亚狮龙-Supreme——稳定的鹅刀翎门面-神兵利器.md` | RSL Supreme (shuttlecock) | RSL | review | — | N | N | 2 | `rsl-supreme-shuttle-review` | RSL = 亚狮龙. Premium goose-feather shuttle — pairs with Aerosensa lineup. |
| 42 | `全新尝试-天斧新纪元｜YONEX-ASTROX-NEXTAGE.md` | Astrox Nextage | Yonex | review | — | N | Y (`yonex-astrox-nextage-review`) | 3 | n/a (already published) | Skip. |
| 43 | `刀锋MAX实战评测：羽毛球场上的实用之选-神兵利器.md` | Bladesabre MAX (shoes) | Li-Ning | review | — | Y (`Bladesabre MAX`) | Y (`li-ning-bladesabre-max-shoes-review`) | 2 | n/a (already published) | Skip. |
| 44 | `史上最详尽的弓10选购指南-神兵利器.md` | Yonex Arcsaber 10 buying guide (multi-generation) | Yonex | guide | — | N | **Y as of 2026-05-17** (`yonex-arcsaber-10-complete-buying-guide`) | 1 | `yonex-arcsaber-10-complete-buying-guide` | Pillar guide covering all Arcsaber 10 generations. High SEO value (long-tail "arcsaber 10 differences"). Published as proof-of-voice #2 in this session. |
| 45 | `各司其职，各取所需——YONEX-NF1000-Z-and.md` | Nanoflare 1000 Z & 1000 Play comparison | Yonex | comparison | — | Y (`Nanoflare 1000 Z`) | Y (`yonex-nanoflare-1000z-play-review`) | 1 | n/a (already published) | Skip. |
| 46 | `天斧88D平替？川崎巧克力88D测评分享！-神兵利器.md` | Kawasaki Chocolate 88D | Kawasaki | review | — | N | N | 3 | `kawasaki-chocolate-88d-vs-yonex-astrox-88d-pro` | Budget alternative angle — natural cross-link from the Astrox 88D Pro 2024 review. |
| 47 | `强化的进攻，细化的操控｜极音速ARS-HS-plus-and.md` | Auraspeed HS Plus + TK Falcon | Victor | comparison | — | Y (`Auraspeed HS Plus`) | Y (`victor-auraspeed-hs-plus-deep-dive`, `victor-auraspeed-hs-plus-attack-review`) | 1 | n/a (already published) | Skip. |
| 48 | `御剑飞行-应战而生｜YONEX-ARCSABER-7-PRO.md` | Arcsaber 7 Pro | Yonex | review | — | Y (`Arcsaber 7 Pro`) | Y (`yonex-arcsaber-7-pro-review`) | 2 | n/a (already published) | Skip. |
| 49 | `朴实无华-尽在掌控｜亚瑟士ASICS极光3-BLAST-FF3体验评测.md` | ASICS Blast FF 3 (Gel-Court Hunter 3 / 极光3) | ASICS | review | — | N | Y (`asics-blast-ff-3-badminton-shoes-review`) | 2 | n/a (already published) | Skip. |
| 50 | `李宁L66高弹线实战测评：扎实手感plus高性价比的耐打之选-神兵利器.md` | Li-Ning L66 string | Li-Ning | review | — | N | N | 2 | `li-ning-l66-string-review` | Companion to existing L69 review — completes Li-Ning string line coverage. Short article (1.7KB) so may need supplementary research. |
| 51 | `波力斩鬼刀8888AX紫炎Ultr.md` | Bonny ZhanGui Dao 8888AX 紫炎 Ultra (Demon Slayer Sword) | Bonny | review | — | N | N | 2 | `bonny-zhanguidao-8888ax-ultra-review` | Bonny WuQue ZD-series flagship. "Demon Slayer Sword" theme is unique angle. |
| 52 | `波力碳装甲：一双穿在脚上的装甲-神兵利器.md` | Bonny Carbon Armour (shoes) | Bonny | review | — | N | N | 3 | `bonny-carbon-armour-shoes-review` | Niche but pairs with growing Bonny shoe coverage. |
| 53 | `猎奇向144——胜利TK9900-神兵利器.md` | Victor Thruster 9900 (TK9900) | Victor | review | — | N | N | 3 | `victor-thruster-9900-curiosity-review` | "Curiosity" series — older/odd racket. Lower SEO. |
| 54 | `猎奇向164——尤尼克斯天斧99pro-神兵利器.md` | Astrox 99 Pro (1st gen) | Yonex | review | — | Y (`Astrox 99 Pro`) | Partial (`yonex-astrox-99-pro-2-deep-dive` is for 2nd gen) | 2 | `yonex-astrox-99-pro-gen-1-review` | Backfill for 1st gen Astrox 99 Pro — useful internal-link target from 2nd gen piece. |
| 55 | `猎奇向168——李宁雷霆80-神兵利器.md` | AxForce 80 (雷霆 80) | Li-Ning | review | — | Y (`AxForce 80`) | Y (`li-ning-axforce-80-review`) | 2 | n/a (already published) | Skip. |
| 56 | `猎奇向508——波力乌缺玄武-神兵利器.md` | Bonny WuQue Xuanwu (玄武) | Bonny | review | — | N | N | 3 | `bonny-wuque-xuanwu-review` | Niche Bonny racket. Low SEO priority. |
| 57 | `猎奇向647——胜利神速HS-plus-神兵利器.md` | Auraspeed HS Plus (alternative review angle) | Victor | review | — | Possible dupe of #47 (different author angle) | Y | Y (`victor-auraspeed-hs-plus-deep-dive`) | 2 | n/a (already published) | Skip — covered. |
| 58 | `羽毛球鞋的选择方式、使用建议和更换标准-神兵利器.md` | Badminton shoe selection / care guide | n/a | guide | — | n/a | Partial (`badminton-shoe-fit-stability` exists, this is broader) | 2 | `badminton-shoe-buying-guide-and-replacement` | Buyer education + replacement timing — strong evergreen SEO. |
| 59 | `薰风JS67球线测评～.md` | Kumpoo JS-67 string (Ice Blue) | Kumpoo | review | — | N | N | 3 | `kumpoo-js-67-string-review` | Niche string. Short file — needs supplemental research. |
| 60 | `谈谈新出的800speed（对比800new，100xse，800p，.md` | Bladex 800 Speed (vs 800 New, 100XSE, 800 Pro, etc.) | Li-Ning | comparison | — | Y (`Bladex 800 Speed`) | Y (`li-ning-bladex-800-speed-tough-elastic`) | 1 | n/a (already published) | Skip. |
| 61 | `谈谈新出的88dp和88sp新色-神兵利器.md` | Astrox 88D Pro + 88S Pro new colour 2024 | Yonex | comparison | — | Y | Y (`yonex-astrox-88d-pro-vs-88s-pro-2024`) | 1 | n/a (already published) | Skip. |
| 62 | `谈谈新出的nf700pro（对比nf700，nf800pro，nf10.md` | Nanoflare 700 Pro vs NF700 vs 800 Pro vs 1000Z | Yonex | comparison | — | Y | Partial — covered separately, not as 4-way | 1 | `yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z` | Cross-line comparison — fills gap in current Nanoflare coverage. |
| 63 | `谈谈新出的nf800pro、HS.md` | NF800 Pro + Auraspeed HS Plus | Yonex / Victor | comparison | — | Y both | Y (`yonex-nanoflare-800-pro-and-victor-hs-plus`) | 1 | n/a (already published) | Skip. |
| 64 | `谈谈新出的战戟9000power（对比战戟8000，战戟9000，88.md` | Halbertec 9000 Power vs 8000 vs 9000 vs 88(?) | Li-Ning | comparison | — | Y | Y (`li-ning-halbertec-8000-vs-9000-vs-9000-power`) | 1 | n/a (already published) | Skip. |
| 65 | `谈谈新出的雷霆90new（对比雷霆80，战戟8000，88dp新色，t.md` | AxForce 90 New vs AxForce 80, Halbertec 8000, 88DP new colour, TK(?) | Li-Ning | comparison | — | Y | Y (`li-ning-axforce-90-new-vs-axforce-80-and-yonex-88dp`) | 1 | n/a (already published) | Skip. |
| 66 | `超爽速度进攻拍！波力雷速800测评分享！-神兵利器.md` | Bonny Leisu 800 (雷速 800) | Bonny | review | — | Y (`Bonny Leisu 800`) | Y (`bonny-leisu-800-racket-review`) | 2 | n/a (already published) | Skip. |
| 67 | `镇山海-定乾坤——薰风山海NEW（球拍测评50）-神兵利器.md` | Kumpoo Shanhai NEW (山海 NEW) | Kumpoo | review | — | N | Y (`kumpoo-shanhai-new-racket-review`) | 3 | n/a (already published) | Skip. |
| 68 | `高性价比进攻拍，胜利音爆PRO测评！-神兵利器.md` | Victor Yinbao Pro / Sonic Pro (音爆 Pro) | Victor | review | — | N | N | 3 | `victor-sonic-boom-pro-budget-attack-review` | Budget attack racket (~RMB 300). Value-tier angle. |
| 69 | `高神雷鸣69评测-神兵利器.md` | Goshen Leiming 69 (high-modulus string) | Goshen / Gosen | review | — | N | N | 3 | `goshen-leiming-69-string-review` | Very short file (~2KB) — pads thin. Niche. |
| 70 | `高端进攻型球拍，波力魔君测评分享！-神兵利器.md` | Bonny MoJun (魔君 — vs Arcsaber 11 Pro) | Bonny | review | — | N | N | 3 | `bonny-mojun-vs-arcsaber-11-pro-attack-racket-review` | Compares to Arcsaber 11 Pro (already in catalogue). |
| 71 | `（猎奇1073）胜利神速99——巅峰推进，星芒可及-神兵利器.md` | Victor Auraspeed 99 J / 99 (Anders Antonsen) | Victor | review | — | Y (`Auraspeed 99 J (Anders Antonsen)`) | Y (`victor-auraspeed-99-hayabusa-review`) | 2 | n/a (already published) | Skip — confirm whether "Auraspeed 99 J" = "Hayabusa". |
| 72 | `（猎奇1087）尤尼克斯弓剑7tour——小恶魔系小姨子-神兵利器.md` | Yonex Arcsaber 7 Tour | Yonex | review | — | N (only `Arcsaber 7 Pro` and `Arcsaber 11 Pro` listed) | N | 2 | `yonex-arcsaber-7-tour-review` | Natural sibling article to existing Arcsaber 7 Pro review — easy internal link. |

---

## Dedup recommendations

The TiGe-prefixed cluster is NOT a duplicate set, despite filenames suggesting otherwise:

- **`TiGe.md`** → Li-Ning Halbertec 7000 II review (canonical for that product)
- **`TiGe (1).md`** → Victor Carbonsonic MAX shuttle review (already covered as `victor-carbonsonic-max-shuttle-review`)
- **`TiGe copy.md`** → Li-Ning LT66 Power string + GP100 Pro grip review (distinct product, new article)
- **`TiGe XLab｜欧击蛇之呼吸…`** → Bonny / OuJi Snake Breath review (distinct product)
- **`TiGe-XLab｜李宁新三大系列…`** → Li-Ning flagship buying guide (pillar piece)

→ **All five TiGe files are unique articles by the same author (泰戈 / TiGe XLab). Keep all five as separate ingestion targets.** Rename internally so the author byline is consistent, but do not dedup.

The two `chengzhen-对「DriveX-12」` files are also NOT exact duplicates:
- File #12 focuses on **DriveX 12 ZSW vs DriveX 12 Original** (intra-product variant)
- File #13 focuses on **DriveX 12 vs DriveX 10** (generational) and **vs Astrox 88DP new colour** (cross-brand)

→ **Keep both as separate articles** — they answer different buyer questions.

Possible soft-dupe: file #47 (`强化的进攻，细化的操控｜极音速ARS-HS-plus`) and file #57 (`猎奇向647——胜利神速HS-plus`) both cover Auraspeed HS Plus. The existing site already has two HS Plus articles (`victor-auraspeed-hs-plus-deep-dive` and `victor-auraspeed-hs-plus-attack-review`) so coverage is saturated. **Skip both source files.**

No other duplicates found in the 72 files.

---

## High-priority queue (top 10 to paraphrase first)

Filter: items NOT already published with high SEO value (priority 1).

1. **`li-ning-flagship-racket-buying-guide-2026`** (file #5, `TiGe-XLab｜李宁…`) — Pillar guide covering AxForce + Halbertec + Bladex flagship lines. High internal-link value, broad search intent ("which Li-Ning racket to buy").
2. **`yonex-arcsaber-10-complete-buying-guide`** (file #44, `史上最详尽的弓10选购指南`) — Multi-generation Arcsaber 10 guide. Long-tail SEO goldmine ("arcsaber 10 differences", "which arcsaber 10 generation"). Arcsaber 10 has decade-plus loyal following.
3. ~~**`yonex-astrox-100zz-anders-antonsen-vs-va-vs-kurenai`** (file #11)~~ — Retracted 2026-05-21. The source 安塞龙 transliteration referred to Viktor Axelsen, not Anders Antonsen; coverage lives in the existing `yonex-astrox-100zz-axelsen-va-vs-kurenai` article instead.
4. **`li-ning-halbertec-9000-power-deep-dive`** (file #9) — Currently only covered as a 3-way comparison; flagship needs a standalone showcase. Halbertec 9000 Power is a flagship-tier product (priority 1).
5. **`li-ning-halbertec-7000-gen-2-review`** OR `…-original-review` (files #6, #27) — Need to confirm which generation existing `li-ning-halbertec-7000-ii-review` covers, then backfill the other. Either way, Halbertec line is high-value.
6. **`li-ning-axforce-100-gen-2-vs-gen-1`** (file #34) — Direct generational head-to-head distinct from the existing 3-way comparison. AxForce 100 II is among the highest-search Li-Ning rackets.
7. **`victor-drivex-12-standalone-review`** (file #19) — DriveX 12 is currently only covered as a vs-Astrox-88DP comparison. Standalone gives the product its own SEO landing page.
8. **`yonex-nanoflare-700-pro-vs-nf700-800-pro-1000z`** (file #62) — Cross-line Nanoflare matrix fills a gap. Nanoflare 1000 Z is a flagship product with strong "vs" intent.
9. **`li-ning-halbertec-9000-standalone-review`** (file #23) — Same logic as #4: 9000 base model deserves its own page distinct from the 3-way comparison.
10. **`victor-drivex-12-zsw-vs-original-comparison`** (file #12) — ZSW (Lee Zii Jia signature) is a buyer-decision question. Distinct from existing DriveX 12 coverage.

**Next-tier (priorities 2 deferred for batch 2):** Bonny Snake Breath (#3), RSL Supreme shuttle (#41), Li-Ning LT66 Power string (#4), Astrox 99 Pro gen 1 backfill (#54), Arcsaber 7 Tour (#72), Li-Ning L66 string (#50), Bonny Zhangui Dao 8888AX Ultra (#51), Kawasaki Chocolate 88D (#46), Bonny WuQue 1982 Y3K shoes (#7), shoe-selection guide (#58).

---

## Coverage gaps — products to add to `products.json`

Products that appear in `/blogs/` source files but are NOT in `src/data/products.json`. These need catalogue entries before (or as part of) ingestion so links and structured data resolve.

### Rackets
- **Li-Ning Halbertec 7000 II** (战戟 7000 II) — file #6
- **Li-Ning Halbertec 7000** (original, 战戟 7000) — file #27
- **Li-Ning Bladex 900 New** (锋影 900 New) — file #38
- **Yonex Astrox Nextage** (file #42)
- **Yonex Nanoflare Nextage** (file #37)
- **Yonex Arcsaber 7 Tour** (file #72)
<!-- Yonex Astrox 100ZZ "Anders Antonsen Edition" line removed 2026-05-21 — Antonsen is a Victor athlete; 安塞龙 = Viktor Axelsen. The VA edition is already in products.json as yy-astrox-100zz-va. -->
- **Kumpoo Shanhai NEW** (薰风 山海 NEW) — file #67
- **Kumpoo Shura II** (修罗 II 代) — file #30
- **Victor DriveX 10 Metallic** (file #39)
- **Victor Auraspeed Fantôme** (影刃) — file #21
- **Victor Sonic Boom Pro** (胜利 音爆 Pro) — file #68
- **Victor Thruster 9900** (TK9900) — file #53
- **Kawasaki Master Mao 20** (矛 20) — file #10
- **Kawasaki Star Cross** (穿越·星河) — file #35
- **Kawasaki Chocolate 88D** — file #46
- **Bonny / OuJi Snake Breath** (蛇之呼吸) — file #3
- **Bonny ZhanGui Dao 8888AX Ultra** (斩鬼刀 8888AX 紫炎 Ultra) — file #51
- **Bonny WuQue Xuanwu** (乌缺 玄武) — file #56
- **Bonny MoJun** (魔君) — file #70

### Shoes
- **Yonex Subaxia GT** (file #24)
- **Yonex Grpht Thrttl** (file #29)
- **Yonex Power Cushion 88 Dial 3** (file #31) — different SKU from existing `Power Cushion 65 Z Wide`
- **Yonex Power Cushion 65 Z4** (file #32) — different SKU from existing `65 Z Wide`
- **Li-Ning Aerus III Pro / Ranger III Pro** (贴地飞行 III Pro) — file #36
- **Li-Ning Bladesabre MAX** (file #43) — existing slug but product not in catalogue
- **Victor C90NLite** (file #15) — confirm vs existing entry
- **ASICS Blast FF 3** (file #49)
- **Kawasaki KACE** (file #28)
- **Bonny WuQue 1982 Y3K** (file #7)
- **Bonny Carbon Armour** (碳装甲) — file #52

### Strings
- **Li-Ning L66** (file #50)
- **Li-Ning LT66 Power** (file #4)
- **Kumpoo JS-67** (薰风 JS-67) — file #59
- **Goshen / Gosen Leiming 69** (高神 雷鸣 69) — file #69

### Grips
- **Li-Ning GP100 Pro** (file #4)

### Shuttlecocks
- **RSL Supreme** (亚狮龙 Supreme) — file #41

**Total new SKUs to add: ~37 products.** Recommend adding catalogue rows in three waves matching the priority queue above, so each new article links to a populated product page.

---

## Footnote on file counts

- **72 raw source files** in `/blogs/`
- **65 unique products / topics** after dedup (no exact duplicates; only soft overlap on Auraspeed HS Plus)
- **~38 files** already covered by an existing `BlogSlug` (skip core paraphrasing — mine for supplementary fact-check colour only)
- **~34 files** are net-new content to paraphrase into fresh `BlogArticle` entries
- **~12 of the 34** carry an existing-catalogue product (faster ingestion path)
- **~22 of the 34** require new `products.json` entries first
