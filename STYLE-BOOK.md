# Hiihtogreeni CSS Style Book

Status date: 2026-07-19

This document is the visual and CSS implementation reference for the Hiihtogreeni.fi rebuild. It should be used together with `REBUILD-PLAN.md` and the approved page-content matrix.

## Design Direction

The site should feel like a high-quality private Lapland stay: calm, capable, warm, spacious, and close to nature. It should retain enough of the original site to feel familiar while replacing the dated WordPress/Elementor presentation with a more deliberate hospitality design.

The visual idea is **Arctic calm, timber warmth**:

- Snow, open sky, forest, and blue-gray winter light provide calm and space.
- The log cabin, fireplace, sauna, and interior wood provide warmth.
- Large groups, ski teams, corporate guests, and golfers require practical clarity rather than boutique-hotel vagueness.
- Photography carries the atmosphere; typography and layout should frame it rather than compete with it.
- Premium means precise spacing, excellent image treatment, restrained color, and confident typography. It does not mean gold gradients, excessive serif type, glassmorphism, or decorative clutter.

## Original-Site Continuity

Retain these recognizable elements from the current site:

- Montserrat for the wordmark, navigation, and headings.
- Fira Sans for body copy and functional UI.
- The current blue-gray teal `#486C7A` as the main brand color.
- The current warm orange `#E47D33` as a limited accent.
- Full-width winter and cabin photography.
- Simple, direct navigation and prominent contact information.
- Image-led links to cabin information, rates, and gallery pages.
- A maximum content width close to the original 1140 px layout, refined to a 1200 px design container.

Modernize these original patterns:

- Replace black caption strips and heavy text shadows with controlled overlays and separate editorial captions.
- Replace the busy autoplay hero slider with one strong hero image or an accessible, user-controlled seasonal gallery.
- Replace repeated full-width blocks with a clear rhythm of editorial text, photography, factual panels, and calls to action.
- Replace tiny flag-only language controls with text labels `FI` and `EN`; flags may be secondary visual cues, never the only label.
- Replace generic icon rows with fewer, consistent line icons where they improve scanning.

## Design Principles

### 1. Photography First

Use the real Hiihtogreeni location and interiors as the main differentiator. Avoid stock photography. Give important images room to breathe and preserve natural color.

### 2. Quiet Confidence

Use few colors, few type weights, and minimal ornament. Important information should stand out through hierarchy and whitespace rather than visual noise.

### 3. Warmth Against Snow

Pair cool snow and forest neutrals with timber, ember, and warm off-white accents. The site must not become an all-blue corporate design.

### 4. Practical Luxury

Capacity, bedrooms, bathrooms, location, ski maintenance, meeting facilities, rates, and contact routes must be immediately understandable. High-end presentation must not hide operational facts.

### 5. Finnish Restraint

Prefer clean geometry, honest materials, direct language, and subtle detail. Avoid oversized rounded cards, floating blobs, neon gradients, and generic travel-site decoration.

## Color System

### Core Palette

| Token | Value | Role |
| --- | --- | --- |
| `--color-snow` | `#F7F8F6` | Primary page background; slightly warm rather than stark white |
| `--color-white` | `#FFFFFF` | Cards, image frames, form fields, and maximum contrast |
| `--color-ink` | `#172126` | Primary text, dark sections, and strong contrast |
| `--color-slate` | `#46545A` | Secondary text and quiet UI labels |
| `--color-frost` | `#DDE5E7` | Nonessential separators, pale panels, and disabled presentation; not the sole boundary of an enabled control |
| `--color-fjord` | `#486C7A` | Original brand teal; primary brand surfaces and links |
| `--color-fjord-dark` | `#294955` | Primary button hover, dark teal sections, and accessible link text |
| `--color-pine` | `#203B34` | Forest counterpoint, footer, and selected seasonal accents |
| `--color-timber` | `#8A5C3D` | Cabin warmth, small details, and editorial accents |
| `--color-ember` | `#E47D33` | Original accent orange; highlights and small active details |
| `--color-ember-dark` | `#9C481A` | Accessible warm links or controls on light backgrounds |
| `--color-mist` | `#EEF2F1` | Alternating section background |
| `--color-error` | `#A33131` | Form and system errors |
| `--color-success` | `#2E684C` | Form success and confirmed states |

### Usage Ratios

- 65% snow, white, and mist.
- 20% ink, slate, and photography-dark overlays.
- 10% fjord and pine.
- 5% timber and ember accents.

Orange must remain an accent, not a large page background. The original `#E47D33` does not provide sufficient white-text contrast for small text; use `--color-ember-dark` for text/buttons on light surfaces or use ink text on the original orange.

### Seasonal Balance

- Winter content favors fjord, ink, frost, snow, and dark pine.
- Summer/golf content may introduce more pine and timber while retaining the same base system.
- Do not change the entire theme by season. Hiihtogreeni should remain one recognizable brand.

## Typography

### Font Families

- Display and UI: Montserrat.
- Body and functional text: Fira Sans.
- Load only required weights and self-host or use `next/font` to avoid layout shift.
- Recommended weights: Montserrat 600, 700, 800; Fira Sans 400, 500, 600.

The existing font pairing is part of the original site’s identity and is suitable for a modern hospitality site when spacing and scale are improved.

### Type Scale

Use fluid sizes with `clamp()` and avoid viewport sizes that become excessive on wide screens.

| Style | Suggested CSS | Use |
| --- | --- | --- |
| Display | `clamp(2.75rem, 7vw, 6.5rem)` / `0.94` | Homepage hero only; short lines |
| H1 | `clamp(2.25rem, 5vw, 4.75rem)` / `1.02` | One per page |
| H2 | `clamp(1.75rem, 3vw, 3rem)` / `1.08` | Major sections |
| H3 | `clamp(1.25rem, 2vw, 1.75rem)` / `1.2` | Subsections and factual cards |
| Lead | `clamp(1.125rem, 1.5vw, 1.375rem)` / `1.55` | Opening summaries |
| Body | `clamp(1rem, 0.4vw + 0.9rem, 1.125rem)` / `1.65` | Main copy |
| Small | `0.875rem` / `1.5` | Metadata, helper text, and captions |
| Label | `0.75rem` / `1.2` | Uppercase eyebrow labels |

### Type Rules

- Montserrat headings use `font-weight: 700` by default; reserve 800 for the wordmark or very short display text.
- Body text uses Fira Sans 400; use 500 for emphasis instead of widespread bold text.
- Keep reading lines between 55 and 72 characters.
- Use sentence case for headings. Uppercase is limited to short labels and navigation accents.
- Use modest negative tracking only on large headings, approximately `-0.025em`.
- Labels may use `0.08em` to `0.12em` positive tracking.
- Do not center long paragraphs. Centering is reserved for short hero or call-to-action copy.

## Layout System

### Containers

- Main wide container: 1200 px.
- Reading container: 720 px.
- Narrow form container: 640 px.
- Full-bleed media may span the viewport but its text must align with the main grid.

```css
.container-page {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}

.container-reading {
  width: min(100% - 2rem, 45rem);
  margin-inline: auto;
}
```

Horizontal page padding:

- Mobile: 16 px.
- Small tablet: 24 px.
- Desktop: 32 px.
- Wide desktop: container controls the maximum width.

### Grid

- Use a 12-column desktop grid only where it simplifies alignment.
- Editorial split sections normally use 5/7 or 7/5 proportions, not identical halves every time.
- Factual card grids use one column on mobile, two on tablet, and three where content remains readable.
- Alternate image position selectively to create rhythm, but do not mechanically zigzag every section.

### Spacing

Base spacing unit is 4 px. Primary spacing tokens:

| Token | Value | Typical use |
| --- | --- | --- |
| `--space-1` | 4 px | Icon/text adjustment |
| `--space-2` | 8 px | Tight inline gap |
| `--space-3` | 12 px | Label gap |
| `--space-4` | 16 px | Mobile padding |
| `--space-6` | 24 px | Card internals |
| `--space-8` | 32 px | Component separation |
| `--space-12` | 48 px | Compact section spacing |
| `--space-16` | 64 px | Mobile section spacing |
| `--space-24` | 96 px | Desktop section spacing |
| `--space-32` | 128 px | Major desktop editorial break |

Use `clamp(4rem, 9vw, 8rem)` for major vertical sections.

## Shape And Depth

- Default radius: 8 px.
- Large image/card radius: 12 px.
- Small controls and tags: 4 px.
- Avoid pill-shaped containers except compact status tags.
- Large hero images may be square-edged when full bleed.
- Use borders more often than shadows.
- Standard border: `1px solid color-mix(in srgb, var(--color-fjord) 18%, transparent)`.
- Standard shadow: `0 18px 50px rgb(23 33 38 / 0.10)`.
- Elevated overlays may use `0 24px 70px rgb(23 33 38 / 0.18)`.
- Never stack multiple dramatic shadows.

## Photography

### Image Treatment

- Preserve natural snow whites and timber color; avoid strong teal presets.
- Use consistent crops with explicit aspect ratios.
- Exterior hero: approximately 16:7 desktop and 4:5 or 3:4 mobile, with an art-directed mobile crop when needed.
- Editorial landscape: 4:3 or 3:2.
- Interior feature: 3:2.
- Card image: 4:3.
- Gallery thumbnails may mix 4:3 and 3:2 in a controlled masonry-like composition, but layout shift must be prevented with known dimensions.

### Overlays

- Place text only where the image has sufficient quiet space.
- Use a directional dark gradient instead of a uniform black overlay:

```css
background:
  linear-gradient(90deg, rgb(17 29 33 / 0.78) 0%, rgb(17 29 33 / 0.34) 52%, transparent 78%);
```

- Mobile gradients may run bottom-to-top because text generally moves below the visual center.
- Do not use heavy black text shadows. A subtle `0 2px 18px rgb(0 0 0 / 0.3)` is the maximum for hero text.

### Image Content Priority

1. Cabin in its winter landscape.
2. Spacious shared living and dining areas.
3. Bedrooms with private bathrooms.
4. Sauna, fireplace, and timber details.
5. Ski maintenance and meeting facilities.
6. Golf, slopes, maps, and nearby landscape.

## Core Components

### Top Contact Bar

- Desktop-only by default; mobile contact actions belong in the menu or a compact utility row.
- Fjord or pine background with white text.
- Maximum height around 36 px.
- Use Fira Sans 500 at 14 px.
- Address is plain text; phone and email are links with clear focus states.
- Do not allow the utility bar to dominate the header.

### Header

- White or snow background.
- Wordmark is text-based `Hiihtogreeni` in Montserrat 800 unless a future approved logo replaces it.
- Header height: approximately 80 px desktop and 64 px mobile.
- Navigation uses Montserrat 600 at 14-15 px.
- Active navigation uses a 2 px ember-dark underline plus a font-weight/text treatment, or fjord-dark text plus underline. Do not use the lighter ember alone as a meaningful state indicator on white.
- Sticky behavior is optional; if used, keep it stable with a subtle bottom border and no large shrinking animation.
- Language switcher reads `FI` and `EN` and includes an accessible language name.

### Hero

- Prefer one strong image with an optional seasonal secondary image selector.
- Keep the primary H1 and opening value proposition in initial server-rendered HTML.
- Place content within the 1200 px grid, generally left aligned.
- Use a small eyebrow such as `LEVI, LAPLAND` above the H1.
- Maximum hero copy width: 680 px.
- Primary action links to cabin/contact/booking destination as approved; secondary action may link to the gallery.
- Avoid more than two hero actions.
- Desktop minimum height: 620-720 px depending on image.
- Mobile height should follow content and art direction rather than forcing a tiny 160 px banner.

### Buttons And Links

Primary button:

- Fjord-dark background, white text, 48-52 px minimum height.
- 6 px radius.
- Montserrat 600, 14 px, slight positive tracking.
- Hover shifts toward pine and raises no more than 1 px.

Secondary button:

- Transparent or snow background.
- 1 px fjord border with fjord-dark text.
- On dark photography, use a white border and white text.

Text links:

- Use fjord-dark or ember-dark on light surfaces.
- Underline on hover and keyboard focus; body links should not rely on color alone.
- External-link indicators are optional and should be visually quiet.

### Image Link Cards

- Use three homepage cards for Cabin, Rates, and Gallery to preserve original information architecture.
- Image occupies approximately two-thirds of the card.
- Content sits on white/snow with a clear heading and one-line purpose.
- Cards use 8-12 px radius and a subtle border.
- Hover scales only the image to a maximum of `1.025`; card position remains stable.
- Entire card may be linked when focus styling clearly surrounds the card.

### Editorial Split Section

- Pair a large image with a heading, lead paragraph, body copy, and optional factual link.
- Keep text vertically centered only when content is short; long text starts near the top.
- Use asymmetric proportions and generous gaps.
- On mobile, image generally precedes text unless the heading needs to establish context first.

### Fact Strip

Use for high-value accommodation facts such as:

- 2 apartments.
- 14 guests per apartment.
- 7 bedrooms and private bathrooms.
- Approximately 150 m² per apartment.
- Slopes and golf nearby.

Use large numerals or concise labels, not decorative counters that animate from zero. Facts must remain real text and wrap cleanly on mobile.

### Rates And Terms

- Present season names and date/week rules in bordered sections or a clear table only when the data is truly tabular.
- Keep terms readable and printable.
- Never hide essential payment, cleaning, VAT, or changeover details in tooltips or accordions by default.
- Highlight booking/contact actions after the terms, not between each row.

### Gallery

- Use a responsive image grid with intentional featured images rather than identical small tiles.
- Desktop may use 12-column compositions with occasional 8/4 or 7/5 pairs.
- Mobile is a single column or two columns only for compatible details.
- Lightbox must support keyboard navigation, Escape, focus restoration, image count, and visible close/previous/next labels.
- Captions should be separate from alt text and shown only when useful.
- Floor plans and maps open at sufficient resolution and include adjacent explanatory text.

### Contact Form

- Place the form on a quiet snow or mist panel with a maximum width of 640 px.
- Labels always remain visible above controls; placeholders are examples, not replacements for labels.
- Input minimum height: 48 px; textarea minimum height: 160 px.
- Enabled-field borders use slate or another color with at least 3:1 adjacent contrast; frost is too light to identify a control on white/snow by itself. Focus uses a 2 px fjord outline with offset.
- Error messages sit directly below fields in `--color-error` and include an icon/text cue.
- Submit state must clearly show idle, sending, success, and failure without changing the layout dramatically.
- Resend is an implementation service and should not be visually branded in the customer-facing form.

### Footer

- Use ink or pine background with snow text.
- Include company name, address, verified phone/email, concise navigation, language links, booking/contact action, and later cookie settings link.
- Avoid reproducing the full page navigation multiple times without hierarchy.
- Use a restrained top border or timber accent, not a large decorative wave.

## Page Composition

### Homepage

1. Photography-led hero and primary value proposition.
2. Three image links: cabin, rates, gallery.
3. Cabin/location editorial split.
4. High-value fact strip.
5. Group suitability and special facilities.
6. Golf/ski seasonal feature.
7. Landscape or video feature.
8. Contact/booking call to action.

### Cabin Page

1. Interior or exterior hero with page H1.
2. Short location and accommodation summary.
3. Capacity and room fact strip.
4. Bedrooms/bathrooms editorial section.
5. Living, kitchen, sauna, and fireplace sections.
6. Group, meeting, maintenance, and parking facts; show accessibility and direct-snowmobile claims only on the English page according to the approved content matrix.
7. Gallery preview.
8. Contact/booking action.

### Gallery Page

1. Compact photographic hero and H1.
2. Short introductory copy.
3. Filter-free primary gallery unless categories materially improve discovery.
4. Floor plans and location maps in clearly labeled subsections.
5. Contact/booking action.

### Rates Page

1. Compact hero and H1.
2. Clear explanation of apartment/whole-house rental.
3. Seasonal rate/term sections.
4. Included services and payment terms.
5. Booking conditions link on the Finnish page only; do not imply that an English booking-conditions document exists unless one is separately approved.
6. Green-fee feature.
7. Contact action.

### Contact Page

1. Compact location hero and H1.
2. Primary rental contact panel.
3. Company and maintenance details.
4. Map/link to directions.
5. Contact form.
6. Alternate direct email/phone fallback.

## Responsive Behavior

Suggested design breakpoints align with content needs rather than devices:

- `sm`: 640 px.
- `md`: 768 px.
- `lg`: 1024 px.
- `xl`: 1280 px.
- `2xl`: 1536 px, used sparingly because content remains capped.

Rules:

- Mobile receives the complete content, not a reduced marketing version.
- Navigation changes before labels collide, normally near 1024 px.
- Two-column editorial sections collapse by 768 px or earlier if copy becomes narrow.
- Horizontal padding and section spacing scale fluidly.
- Never crop faces, key cabin architecture, floor-plan labels, or map legends to satisfy a fixed mobile ratio.
- Test 320 px width, 200% zoom, landscape phones, tablets, and large desktop screens.

## Motion

- Motion should feel slow, natural, and nearly invisible.
- Standard UI duration: 160-220 ms.
- Large image reveal maximum: 450 ms.
- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Do not animate layout dimensions for routine interactions.
- Do not autoplay parallax, background video, or essential carousels.
- Respect `prefers-reduced-motion: reduce` by removing transforms, smooth scrolling, and nonessential transitions.

## Icons

- Use one consistent simple outline set if icons are required.
- Stroke width should appear around 1.5-2 px at common sizes.
- Default icon sizes: 18, 20, and 24 px.
- Icons supplement labels; they do not replace contact, menu, previous/next, or close text where ambiguity is possible.
- Avoid decorative mountain, snowflake, and pine icons repeated throughout the page.

## Forms And System States

- Default: white field with a slate border or another boundary that has at least 3:1 adjacent contrast; do not use frost alone for enabled fields.
- Hover: slightly darker border.
- Focus: fjord 2 px outline and visible label.
- Error: error border, text, and icon; never red alone.
- Success: pale green panel with clear text and next action.
- Disabled: reduced contrast but still readable; cursor and text explain the state where needed.
- Loading: preserve button width and use `aria-busy`; avoid full-page spinners.

## Accessibility Requirements

- Meet WCAG 2.2 AA contrast for text, controls, focus indicators, and meaningful graphics.
- Keep body text at least 16 px.
- Maintain visible focus on every interactive element.
- Minimum pointer target is 44 by 44 CSS pixels where practical.
- Never place essential copy over an image without a tested contrast layer.
- Do not communicate state through color alone.
- Keep headings sequential and landmarks clear.
- Ensure all interaction works by keyboard.
- Support browser zoom and text reflow without horizontal page scrolling.
- Use alt text according to image purpose; decorative atmosphere images use empty alt text.

## Tailwind CSS v4 Foundation

The exact syntax must be checked against the installed Tailwind version, but the intended CSS-first theme is:

```css
@import "tailwindcss";

@theme {
  --font-display: "Montserrat", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Fira Sans", ui-sans-serif, system-ui, sans-serif;

  --color-snow: #f7f8f6;
  --color-white: #ffffff;
  --color-ink: #172126;
  --color-slate: #46545a;
  --color-frost: #dde5e7;
  --color-fjord: #486c7a;
  --color-fjord-dark: #294955;
  --color-pine: #203b34;
  --color-timber: #8a5c3d;
  --color-ember: #e47d33;
  --color-ember-dark: #9c481a;
  --color-mist: #eef2f1;
  --color-error: #a33131;
  --color-success: #2e684c;

  --radius-control: 0.375rem;
  --radius-card: 0.75rem;

  --shadow-soft: 0 18px 50px rgb(23 33 38 / 0.1);
  --shadow-overlay: 0 24px 70px rgb(23 33 38 / 0.18);

  --ease-natural: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Implementation rules:

- Prefer theme utilities and semantic components over arbitrary values repeated across files.
- Keep all utility class names statically discoverable by Tailwind.
- Do not build class names dynamically from partial strings.
- Use CSS custom properties for tokens and state variations.
- Keep component variants explicit and limited.
- Use `@layer components` only for repeated patterns that are clearer as named classes.
- Global CSS should contain reset/base rules, tokens, typography defaults, and a small number of shared primitives. Page-specific layout remains close to components.
- Do not use `!important` except for a documented third-party integration conflict.

## Design Review Checklist

- [ ] Does the design feel specific to a high-quality Lapland cabin rather than a generic hotel template?
- [ ] Are the original teal, orange, fonts, photography, and straightforward navigation still recognizable?
- [ ] Is timber warmth balanced against snow and forest tones?
- [ ] Is photography doing most of the atmospheric work?
- [ ] Can visitors find capacity, bedrooms, bathrooms, location, rates, contact, and booking paths quickly?
- [ ] Are layouts editorial and varied without becoming inconsistent?
- [ ] Are mobile crops, spacing, navigation, forms, and gallery interactions intentional?
- [ ] Do color contrast, keyboard navigation, focus, motion, zoom, and touch targets pass accessibility review?
- [ ] Are all styles built from the documented tokens or an explicitly approved addition?
- [ ] Has the implementation avoided generic rounded-card grids, glass effects, excessive gradients, and animation?

## Approval Rule

Material deviations from this style book should be recorded in the migration-difference register. Small implementation adjustments are expected when real content and image crops are tested, but changes to the core palette, font pairing, layout character, interaction model, or accessibility rules require explicit review.
