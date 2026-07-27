# New Image Placement Plan

Source images: `images/hiihtogreeni_final/` (16 files, added by client).
Status: **planned, not yet implemented**. Awaiting green light or edits.

## Current bugs found

- Homepage **"Levi Golf -green fee -liput" / "Levi Golf green fees"** section
  (`src/app/(fi)/page.tsx` and `src/app/(en)/en/home/page.tsx`) currently
  renders `/wp-content/uploads/2024/07/Large-and-warm-space-for-ski-maintenance.jpg`
  — a ski-storage room photo mistakenly used for the golf section.
- Homepage **"Maisemat" / "Scenery"** section currently shows a Levijärvi
  beach photo (`Lahella-mokkia-on-Levijarven-uimaranta.jpg`), not a
  terrace/golf-course view as requested.

## Mechanics

- Copy the used source files into `public/wp-content/uploads/2026/07/`
  (matches the existing dated-folder convention: `2022/10`, `2024/07`,
  `2025/06`, `2025/07`). Keep filenames as-is (already descriptive/SEO-friendly).
- Update `src/content/fi.ts` and `src/content/en.ts` with localized alt
  text/captions for every new placement.
- Add a new small client component (next to `src/components/GalleryGrid.tsx`)
  for the homepage carousel: accessible, prev/next buttons, dot indicators,
  keyboard + swipe support, respects `prefers-reduced-motion`, styled to match
  the existing design tokens (`--radius-card`, frost border, fjord/ember
  colors).

## Placements

### 1. Fix the two homepage sections (fi + en `page.tsx`)

| Section | New image | Dimensions | Why |
|---|---|---|---|
| Levi Golf green fee | `levi_golf_green_fee.jpg` | 1767×1330 | Sharp, on-topic golf image; replaces the mistaken ski photo |
| Maisemat / Scenery | `golf_course_views_from_hiihtogreeni_terrace.jpg` | 1632×1229 | Terrace view over the course, as requested |

### 2. Homepage "For groups / Ryhmille" split section

- Replace `banner_mokki-levilla.jpg` (generic winter exterior) with
  `Hiihgreeni-levi-rental-cabin-for-large-groups.jpg` (1600×900). The section
  copy is specifically about group bookings; this image matches it directly.

### 3. Rates page ("Levi Golf -green fee" section)

- Currently text-only (no image) in `src/app/(fi)/hinnoittelu/page.tsx` and
  the `en` equivalent. Convert to an image+text `SplitSection` using
  `osta_green_fee_levi_golfiin.jpg` (1632×1229, literally "buy green fee")
  next to the buy-tickets CTA.

### 4. New homepage image carousel

Placed after the Hero / 3-card row. Curated 6-slide mix so it doesn't just
repeat golf shots:

1. `northern_lights_levi_hiihtogreeni.jpg` — aurora, eye-catching
2. `levi_winter_hiihtogreeni.jpg` — wide winter panorama
3. `hiihtogreeni_next_to_levi_golf.jpg` — cabin's relation to the course
4. `rental_cabin_for_large_groups_levi_golf_course.jpg` — cabin + course, groups angle
5. `excellent_ski_maintenance_room_levi_hiihtogreeni.jpg` — best ski-room shot
6. `levi_golf_greenfees_from_hiihtogreeni.jpg` — another course view

### 5. Photo gallery page (kuvagalleria / photo-gallery)

Add 2 more images to `fiGalleryImages` / `enGalleryImages`:

- `view_from_hiihtogreeni_levi_rental_cabin_golf_course.jpg`
- `sport_equipment_maintenance_room_levi_hiihtogreeni.jpg`

### 6. Optional bonus

Reuse `view_from_hiihtogreeni_levi_rental_cabin_golf_course.jpg` on the cabin
page's "Lähellä rinteitä, golfkenttää ja järveä" section too (currently uses
an unrelated meeting-room photo there) — matches the site's existing pattern
of reusing the same asset across pages.

## Images recommended to skip (near-duplicates)

These 4 are near-duplicate shots of the same ski room from slightly
different angles. The gallery already has 4 ski-maintenance photos from an
earlier shoot; adding 6 more (10 total) would be repetitive. Recommendation:
use only the 2 best new ones (see #5 above) and leave these unused in
`images/hiihtogreeni_final/` unless the client wants them added anyway:

- `good_facilities_for_ski_maintenance_levi.jpg`
- `large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg`
- `levi_hiihtogreeni_ski_maintenance_room.jpg`
- `ski_maintenance_room_hiihtogreeni.jpg`

## Full mapping (16 images accounted for)

| # | File | Destination |
|---|---|---|
| 1 | `levi_golf_green_fee.jpg` | Homepage golf section (bug fix) |
| 2 | `golf_course_views_from_hiihtogreeni_terrace.jpg` | Homepage Scenery section (bug fix) |
| 3 | `Hiihgreeni-levi-rental-cabin-for-large-groups.jpg` | Homepage "For groups" split section |
| 4 | `osta_green_fee_levi_golfiin.jpg` | Rates page green fee section (new split) |
| 5 | `northern_lights_levi_hiihtogreeni.jpg` | Carousel |
| 6 | `levi_winter_hiihtogreeni.jpg` | Carousel |
| 7 | `hiihtogreeni_next_to_levi_golf.jpg` | Carousel |
| 8 | `rental_cabin_for_large_groups_levi_golf_course.jpg` | Carousel |
| 9 | `excellent_ski_maintenance_room_levi_hiihtogreeni.jpg` | Carousel |
| 10 | `levi_golf_greenfees_from_hiihtogreeni.jpg` | Carousel |
| 11 | `view_from_hiihtogreeni_levi_rental_cabin_golf_course.jpg` | Gallery (+ optional cabin page reuse) |
| 12 | `sport_equipment_maintenance_room_levi_hiihtogreeni.jpg` | Gallery |
| 13 | `good_facilities_for_ski_maintenance_levi.jpg` | Skip (duplicate) |
| 14 | `large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg` | Skip (duplicate) |
| 15 | `levi_hiihtogreeni_ski_maintenance_room.jpg` | Skip (duplicate) |
| 16 | `ski_maintenance_room_hiihtogreeni.jpg` | Skip (duplicate) |
