# Sports/Ski Teams Page Plan

Status: **planned, not yet implemented**. Awaiting green light or edits.
Companion to `IMAGE-PLACEMENT-PLAN.md` (some image assignments below
supersede/extend that plan — see "Relationship to IMAGE-PLACEMENT-PLAN.md").

## Recommendation: a dedicated page, not just a section

The site already treats Cabin, Rates, and Gallery as separate top-level pages
(`src/app/(fi)/mokki/`, `.../hinnoittelu/`, `.../kuvagalleria/`, plus `en`
equivalents), each with its own nav entry, canonical URL, and metadata. The
seven selling points requested (14/28-person capacity, 7+7 bedrooms/
bathrooms per apartment, conference room, +50 m² ski maintenance room,
proximity to slopes, privacy) are enough distinct content to justify the
same treatment, and a dedicated URL is much stronger for SEO queries like
"levi mökki hiihtojoukkueille" / "ski team accommodation Levi" than a
subsection buried on the homepage.

**Plan: build a new page, and add a short teaser link from the homepage**
so both audiences (general visitors and team organizers arriving via search)
find it easily.

## Naming, URL, and navigation

| | Finnish | English |
|---|---|---|
| Nav label | "Joukkueille" | "For Teams" |
| URL | `/joukkueille/` | `/en/teams/` |
| `NavKey` | `"teams"` (new) | |
| Suggested H1 | "Mökki joukkueille ja hiihtojoukkueille Levillä" | "A Levi cabin built for ski teams and sports groups" |
| Suggested eyebrow | "Levi, Lappi — joukkueille" | "Levi, Lapland — for teams" |

Final copy wording is open for review; the above is a working title only.

## Technical footprint (files touched)

- `src/content/types.ts` — extend `NavKey` with `"teams"`.
- `src/lib/routes.ts` — add `teams` to `ROUTES.fi` / `ROUTES.en`.
- `src/lib/seo.ts` — add `teams` to `CANONICAL_PATHS`.
- `src/content/fi.ts` / `src/content/en.ts` — add `FI_NAV` / `EN_NAV` entry,
  a `fiTeams`/`enTeams` `PageContent`, and a `fiTeamsSections`/
  `enTeamsSections` copy object (facts, paragraphs, captions).
- `src/app/sitemap.ts` — add the new route pair (`priority` similar to
  `cabin`, e.g. `0.8`, `changeFrequency: "yearly"`).
- New page files:
  - `src/app/(fi)/joukkueille/page.tsx`
  - `src/app/(en)/en/teams/page.tsx`
- New hero image trio (matches the `/public/hero/*.{avif,webp,jpg}` pattern
  used by every other page): `public/hero/teams.avif` / `.webp` / `.jpg`,
  generated from the chosen hero photo (see below) since the `Hero`
  component requires all three formats plus explicit width/height.
- Header/nav: `Header.tsx` and `MobileNav.tsx` already render `getNav(lang)`
  generically, so no code change needed there beyond the new nav-array entry
  — six nav items should still fit at the `lg` breakpoint, but worth a visual
  check once implemented (gap may need to tighten slightly).
- Homepage teaser: one new small link/section in `src/app/(fi)/page.tsx` and
  `src/app/(en)/en/home/page.tsx` pointing to the new page (see below).

No redirects needed — this is a net-new URL, not a migrated one.

## Page content outline

Following the existing `SplitSection` / `FactStrip` / `Section` primitives
already used on the Cabin and Rates pages (no new UI primitives required,
except optionally a small image grid for the ski-maintenance showcase using
the same markup pattern as `ImageCard`/`GalleryGrid`).

### 1. Hero
- Image: `levi_winter_hiihtogreeni.jpg` (3264×1836 — wide winter atmosphere,
  good hero crop candidate). Needs avif/webp/jpg generation as `hero/teams.*`.
- H1 + eyebrow as above.
- Lead copy: mentions "14 or 28 team members", "steps from the slopes",
  "your own ski maintenance room".
- CTA buttons: "Ask about availability" (contact) + "See rates" (rates page).

### 2. Intro
- Short paragraph establishing track record: the cabin already hosts alpine
  and cross-country ski teams, clubs, and national squads (this reuses the
  positioning already implied by existing captions like
  "Hiihtogreeni-sopii-alppihiihto-ja-maastohiihtojoukkueille" — "suits
  alpine skiing and cross-country teams").

### 3. Fact strip — team capacity
Reuses `CAPACITY` from `shared.ts` but framed for teams:
- `14` — guests per apartment
- `28` — guests for the whole cabin (both apartments combined)
- `7` — bedrooms per apartment (14 total across the cabin)
- `7` — ensuite bathrooms per apartment (14 total)
- `20` — seats in the shared conference room (rented separately - included if whole cabin rented)

### 4. Split section — "Space for the whole team" (bedrooms & bathrooms)
- Image: reuse existing gallery photos, e.g. `Hiihtogreeni-mokki-5.jpg`
  (spacious rooms) or `Hiihtogreeni-mokki-7.jpg` (room with ensuite).
- Copy: every bedroom has its own private bathroom — practical for athletes
  who need their own space and recovery routine, no shared hallway showers.

### 5. Split section — "A briefing room built in"
- Image: `Mokki-Levi-Hiihtogreeni-neuvottelutila.jpg` (already used on the
  Cabin page; reuse is an established pattern across this site).
- Copy: 24-seat conference room for team talks, video review, sponsor
  meetings, or coaches' briefings — no need to book an outside venue.

### 6. Feature section — "The best ski maintenance facilities in Levi"
This is the headline differentiator, so it gets the richest treatment: a
lead `SplitSection` plus a small supporting image grid (not just one photo).
- Lead image: `excellent_ski_maintenance_room_levi_hiihtogreeni.jpg`
- Supporting grid (4-6 images): `sport_equipment_maintenance_room_levi_hiihtogreeni.jpg`,
  `good_facilities_for_ski_maintenance_levi.jpg`,
  `large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg`,
  `levi_hiihtogreeni_ski_maintenance_room.jpg`,
  `ski_maintenance_room_hiihtogreeni.jpg`
- Copy emphasizes concrete facts: warm, **50+ m²**, open layout, located
  **inside the cabin** (not an outdoor shed or shared basement), suitable for
  waxing/tuning benches and a full team's equipment at once.

### 7. Split section — "Steps from the slopes"
- Image: `/wp-content/uploads/2025/07/Points-of-interest-Hiihtogreeni-winter.jpg`
  (existing winter points-of-interest map — a natural fit for a
  proximity/logistics claim).
- Copy: ~200 m to the Koillisrinteet pistes, ski tracks reachable directly
  from the yard — reuses existing verified distance facts already on the
  Cabin/Contact pages.

### 8. Split section — "Privacy for your team"
- Image: `northern_lights_levi_hiihtogreeni.jpg` (quiet, atmospheric,
  reinforces exclusivity rather than a crowded resort feel).
- Copy: the whole duplex can be rented exclusively by one team/group — no
  shared common areas with strangers, private plot, quiet surroundings.

### 9. Exterior strip — "The cabin from outside"
Small supporting row/mini-carousel (reusing the carousel component from
`IMAGE-PLACEMENT-PLAN.md` if already built, or a simple 3-up image row):
- `Hiihgreeni-levi-rental-cabin-for-large-groups.jpg`
- `rental_cabin_for_large_groups_levi_golf_course.jpg`
- `Hiihtogreeni-1.jpg` (existing)

### 10. Call to action
- Same pattern as other pages: rental contact (Karo Tammela), link to
  Contact page and Rates page.

## Homepage teaser (the "new section" part of the ask)

Add one small, clearly-linked element on both homepage variants pointing at
the new page, so it's discoverable without requiring nav discovery:
- Simplest option: a 4th `ImageCard` alongside the existing Cabin/Rates/
  Gallery row, image `large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg`,
  title "Joukkueille" / "For Teams", linking to the new page.
- Alternative: a one-line callout inside the existing "Ryhmille yrityksistä
  ystäviin" / "For groups" split section ("Ski team or club? See our
  dedicated facilities →") instead of a new card, if a 4th card feels like
  too much homepage real estate.

Recommendation: the 4th `ImageCard` — it matches the site's existing
information-architecture pattern exactly and needs no new component.

## Relationship to IMAGE-PLACEMENT-PLAN.md

The earlier plan recommended **skipping** 4 near-duplicate ski-maintenance
photos to avoid crowding the general photo gallery:
`good_facilities_for_ski_maintenance_levi.jpg`,
`large_warm_ski_maintenance_facilities_for_alpine_skiing_teams.jpg`,
`levi_hiihtogreeni_ski_maintenance_room.jpg`,
`ski_maintenance_room_hiihtogreeni.jpg`.

This new dedicated Teams page is the right home for exactly those images —
multiple close angles of the same room are a strength here, not redundancy,
because the room's size and quality are the specific claim being sold to
this audience. Recommend **using all 4 on the Teams page** (section 6 above)
instead of leaving them unused, while still keeping the general gallery lean
per the original plan.

## Open questions for review

1. Are the working URL/nav names (`Joukkueille` / `For Teams`,
   `/joukkueille/` / `/en/teams/`) acceptable, or is a different term
   preferred (e.g. more ski-specific: `Hiihtojoukkueille` / `Ski Teams`)?
2. Confirm the hero photo choice (`levi_winter_hiihtogreeni.jpg`) — it needs
   AVIF/WebP conversion, so worth confirming before that work happens.
3. Homepage teaser: 4th `ImageCard` vs. a callout line inside the existing
   groups section?
4. Any specific team/club testimonials, logos, or past-guest proof points to
   include, or should the page rely on facts + photography only for now?
