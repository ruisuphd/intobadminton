# Fact-check audit - 2026-05-09

Scope: high-traffic racket rows and source-authority handling in `src/data/products.json`.

## Official corrections applied

### Yonex NANOFLARE 1000 Z

Source name: Yonex  
Document title: `NANOFLARE 1000 Z` product page  
URL: `https://www.yonex.com/nf-1000z`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | Extra Stiff`
- `Weight / Grip | 4U (Avg. 83g) G5,6、3U(Avg. 88g) G4,5,6`
- `Stringing Advice | 4U: 20 - 28 lbs 3U: 21 - 29 lbs`

App change:

- `yy-nanoflare-1000z` renamed from `Nanoflare 1000Z` to `Nanoflare 1000 Z`.
- `shaftFlex` changed from `stiff` to `extra_stiff`.
- `commonStringTensionLbs.max` changed from `28` to `29`.
- Source changed to the product-specific official page and status changed to `official_verified`.

### Yonex ASTROX 99 PRO

Source name: Yonex  
Document title: `ASTROX 99 PRO` product page  
URL: `https://www.yonex.com/astrox-99-pro-3ax99-p`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | STIFF`
- `Stringing Advice | 4U: 20 - 28 lbs 3U: 21 - 29 lbs`
- `Item Code | 3AX99-P`

App change:

- `yy-astrox-99-pro.shaftFlex` changed from `extra_stiff` to `stiff`.
- Source changed to the product-specific official page and status changed to `official_verified`.

### Yonex ASTROX 77 PRO

Source name: Yonex  
Document title: `ASTROX 77 PRO` product page  
URL: `https://www.yonex.com/badminton/racquets/astrox-77-pro`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex Medium`
- `Weight / Grip 4U (Avg. 83g) G5,6`
- `Stringing Advice 4U: 19 - 27 lbs 3U: 20 - 28 lbs`

App change:

- `commonStringTensionLbs.min` changed from `20` to `19`.
- Status changed to `official_verified`.

### Yonex ARCSABER 11 PRO

Source name: Yonex  
Document title: `ARCSABER 11 PRO` product page  
URL: `https://www.yonex.com/arc11-p`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | STIFF`
- `Weight / Grip | 4U (Avg. 83g) G5, 6 3U (Avg. 88g) G4, 5, 6`
- `Stringing Advice | 4U: 19 - 27 lbs 3U: 20 - 28 lbs`

App change:

- Source changed to the product-specific official page.
- Status changed to `official_verified`.

### Yonex NANOFLARE 800 PRO

Source name: Yonex  
Document title: `NANOFLARE 800 PRO` product page  
URL: `https://www.yonex.com/nf-800pr`  
Accessed: 2026-05-09

Exact source wording used:

- `Flex | STIFF`
- `Weight / Grip | 4U (Avg. 83g) G5,6、3U(Avg. 88g) G4,5,6`
- `Stringing Advice | 4U: 20 - 28 lbs、3U: 21 - 29 lbs`

App change:

- `commonStringTensionLbs.max` changed to `29`.
- Duplicate Nanoflare 800 Pro row aligned to `stiff` rather than `extra_stiff`.
- Source changed to the product-specific official page and status changed to `official_verified`.

### Victor DriveX 12 O

Source name: VICTOR Badminton  
Document title: `DriveX 12 O` product page  
URL: `https://www.victorsport.com/product/drivex`  
Accessed: 2026-05-09

Exact source wording used:

- `Weight / Grip Size | 3U/G5 4U/G5`
- `String tension LBS | ≦ 33 lbs(15kg) ≦ 32 lbs(14.5kg)`

App change:

- `vic-drivex-12` renamed to `DriveX 12 O`.
- Source changed to the product-specific official page and status changed to `official_verified`.

## Rows downgraded for source authority

The app now treats generic brand homepages, retailer pages, blogs, and forum pages as insufficient for manufacturer-verified specs. These rows may still appear as recommendations, but their confidence and UI labels are downgraded until an official product-specific source is attached.

I cannot confirm the Li-Ning racket specs without a reliable product-specific official source.

Downgraded examples:

- `vic-drivex-8s`
- `vic-auraspeed-100x-se`
- `vic-auraspeed-hs-plus`
- `vic-brave-sword-12`
- `vic-thruster-falcon-enhanced`
- `vic-auraspeed-99`
- all Li-Ning racket rows currently in `src/data/products.json`
