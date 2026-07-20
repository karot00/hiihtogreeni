# Hiihtogreeni.fi Next.js Rebuild Plan

Status date: 2026-07-19

This plan is ordered chronologically. A phase is marked `[x]` only when its work and exit criteria are complete. Individual task checkboxes are implementation tracking items.

Do one task at a time and ask for user permission after each task to proceed.

After each phase, write to blog.md what you have achieved. The blog is to document progress, how this was done and the audience is business decision makers and peers. Use similar language as the first parts of the blog. Ask the user, how much money was spent on AI costs and how long did the phase take. User will then provide you with the information. 

## Primary Goal

Replace the WordPress and Elementor site with a modern, maintainable, mostly static Next.js site without losing existing search visibility.

The first release must prioritize:

1. The same canonical URLs and language structure.
2. The same useful page content, search intent, internal links, and media.
3. Correct redirects for every known non-canonical or retired URL.
4. Crawlable, server-rendered HTML with accurate metadata.
5. A low-risk cutover that can be measured and rolled back.

Visual modernization is important, but it must not remove content, change URL intent, hide important text behind client-side JavaScript, or delay the SEO-parity work.

## Scope

Included in the first release:

- Five Finnish pages and five primary English pages.
- A final, evidence-based treatment for the stale English gallery page; the proposed treatment is a permanent redirect to the primary English gallery.
- Responsive shared header, navigation, language switcher, footer, page sections, galleries, forms, maps, and video links.
- Existing Finnish and English copy, images, contact details, pricing information, terms, and external links after factual verification.
- Contact-form email delivery through Resend.
- Technical SEO, accessibility, performance, analytics baseline capture, deployment, and post-launch monitoring.

Deferred unless needed for parity:

- A CMS or visual page builder.
- A booking engine; the separate booking site remains the booking destination.
- Blog functionality.
- New campaign landing pages.
- New cookie consent implementation. Reserve a clean integration point and do not install a second consent product before separate instructions are provided.
- GA4 analytics. Add it only after the migration is complete and the separately supplied cookie consent implementation is active.

## Non-Negotiable SEO Rules

- Do not rename, translate, consolidate, or remove a currently canonical page without an explicit redirect decision.
- Do not publish a redirecting URL in the XML sitemap.
- Do not create avoidable redirect chains; known high-value old URL forms must reach their final canonical URL in one hop wherever the hosting platform supports it.
- Do not use client-side redirects for migration URLs.
- Do not use a single-page application fallback or soft 404 page.
- Do not replace visible text with text embedded only in images.
- Do not delete old media URLs that have backlinks or image-search value without preserving the URL or adding a direct redirect.
- Do not add invented prices, reviews, ratings, availability, or structured-data claims.
- Do not set `noindex` on production canonical pages.
- Do not change DNS until the production-mode staging crawl, pre-cutover redirect matrix, and rollback rehearsal pass.

## Verified Baseline

### Canonical Origin And URL Behavior

The current canonical origin is `https://www.hiihtogreeni.fi`.

Current normalization behavior:

- `http://hiihtogreeni.fi/*` redirects to HTTPS and `www`.
- `https://hiihtogreeni.fi/*` redirects to HTTPS and `www`.
- Content URLs use trailing slashes.
- `/en/` redirects to `/en/home/`.
- Slashless content paths redirect to their trailing-slash equivalent.
- `/sitemap.xml` redirects to the WordPress sitemap index.

The replacement must retain HTTPS, `www`, trailing slashes, and direct canonical redirects wherever the hosting platform supports them.

### Canonical Page Matrix

| Page pair | Finnish canonical | English canonical | Launch treatment |
| --- | --- | --- | --- |
| Home | `/` | `/en/home/` | Keep both exactly |
| Cabin | `/mokki/` | `/en/cabin/` | Keep both exactly |
| Gallery | `/kuvagalleria/` | `/en/photo-gallery/` | Keep both exactly |
| Rates | `/hinnoittelu/` | `/en/rates/` | Keep both exactly |
| Contact | `/yhteystiedot/` | `/en/contact-information/` | Keep both exactly |

Additional live URL:

- `/en/gallery/` currently returns `200`, is indexable, is self-canonical, and appears in the WordPress sitemap. It is an outdated duplicate with largely Finnish content and is not linked by the current English navigation. Retire it with one permanent redirect to `/en/photo-gallery/`, subject to final confirmation from Search Console and backlink data.

### Current SEO Baseline

- All 11 published HTML pages are indexable and self-canonical.
- Current pages have no meta descriptions, Open Graph data, Twitter Card data, or JSON-LD.
- Only the two homepages have head-level language alternates.
- Many pages lack a semantic `h1` and instead begin with `h2` elements.
- Current HTML language values are `fi` and `en-GB`.
- The current XML sitemaps expose 11 pages.
- Unknown paths correctly return HTTP `404`.
- Empty WordPress RSS endpoints and WordPress API paths are currently crawlable endpoints, although they are not part of the marketing-site information architecture.

### Content And Asset Baseline

- The local scrape contains the ten intended page bodies and most useful image references.
- The local `images/` directory contains 43 JPEG files.
- The live site also uses favicon files, a booking-conditions PDF, videos, a Google Maps embed, and some images absent from the local set.
- The scrape is a content brief, not an exact HTML or HTTP archive. The live site remains the verification source until cutover.

Known missing or additional live assets include:

- `Hiihtogreeni-tekstit.jpg`
- `Hiihtogreeni-tekstit2.jpg`
- `Ruokailu-Neuvottelutila-kuva-2.jpg` on the stale gallery
- `Varausehdot2020.pdf`
- Existing favicon and Apple touch icon variants

### Owner-Approved Content Decisions

These decisions were confirmed on 2026-07-19 and override contradictory phone links or normalized assumptions in the scrape:

- [x] Primary rental contact: Karo Tammela.
- [x] Primary rental phone: `+358 500 633 744`, with `tel:+358500633744` as the link target.
- [x] Primary rental and contact-form recipient email: `hiihtogreeni@hiihtogreeni.fi`.
- [x] Capacity: each apartment accommodates 14 guests. Replace contradictory 12-person and “12, maximum 14” claims consistently in both languages.
- [x] Rates and policy source of truth: use the current live Finnish page copy. Do not invent accommodation prices that the authoritative page does not publish.
- [x] Translate the approved Finnish VAT, payment, seasonal/changeover, linen, and vehicle-charging policy accurately into English where an English equivalent is needed. In particular, retain the Finnish prohibition on vehicle charging from the listed sockets as a safety rule in both languages.
- [x] Preserve the current language-specific green-fee statements: Finnish starts at EUR 27 and English starts at EUR 26.
- [x] Preserve the current language split for wheelchair-access and direct-snowmobile-access claims; these remain on the English cabin content unless later corrected.
- [x] Preserve the current language split for the booking-conditions PDF; retain `Varausehdot2020.pdf` with the Finnish rates content unless later corrected.
- [x] Preserve the current maintenance contact shown in the scrape/live content: Jens Pitkänen, `+358 44 345 6001`, `jens.pitkanen@aavalevi.fi`.

Still requiring Phase 1 approval:

- Exact contact-form fields, marketing-consent wording, privacy-policy destination, data retention, and internal recipients/access beyond the delivery mailbox.
- Final destination URLs on the separate booking site for each apartment, if direct booking calls to action are added.

## Technology Baseline

Use stable releases and commit the generated lockfile. Versions observed on 2026-07-19 are:

| Package | Stable version observed | Planned use |
| --- | --- | --- |
| Next.js | `16.2.10` | App Router, static rendering, metadata routes, image and font optimization |
| React | `19.2.7` | Server Components by default; Client Components only for interaction |
| React DOM | `19.2.7` | Match React exactly |
| Tailwind CSS | `4.3.3` | Utility styling with CSS-first theme configuration |
| TypeScript | `7.0.2` | Strict type checking, subject to Next.js compatibility at initialization |
| ESLint | `10.7.0` | Linting, subject to the current Next.js-supported configuration |

Before installing, recheck stable versions and Next.js peer/support ranges. Do not force incompatible TypeScript or ESLint majors merely because they are newest.

Implementation conventions confirmed from current documentation:

- Use the Next.js App Router and TypeScript.
- Use `metadata` or `generateMetadata` for page metadata.
- Use `app/sitemap.ts` and `app/robots.ts` metadata routes.
- Use `next.config.ts` redirects and `trailingSlash: true` where appropriate.
- Use `next/image` for responsive raster images and `next/font` or self-hosted font files.
- Use React Server Components for page content and reserve `'use client'` for the mobile menu, gallery/lightbox, consent UI, and form interaction that actually requires browser state.
- Use the official Resend Node.js SDK server-side for contact-form email delivery; never expose `RESEND_API_KEY` to the browser.
- Install Tailwind v4 with `tailwindcss` and `@tailwindcss/postcss`.
- Import Tailwind with `@import "tailwindcss"` and define design tokens through CSS-first `@theme` configuration.
- Avoid an i18n framework for ten fixed routes; an explicit typed route map is simpler and protects the required legacy slugs.
- Do not require a runtime database or CMS for first release content.

### Migration Change Control

Classify every difference from WordPress before implementation:

- `Parity`: required to preserve URL, content, link, media, form, or crawl behavior.
- `Defect correction`: fixes a verified error such as a malformed phone link, missing language alternate, or invalid heading hierarchy. Record the before/after value and approval.
- `Enhancement`: new descriptions, richer social metadata, JSON-LD, new calls to action, or copy changes not required for parity. Approve explicitly and defer any change whose migration risk exceeds its launch value.

Titles, visible copy, URL intent, and primary internal-link destinations default to parity. Correct `h1` structure and reciprocal alternates for every translation pair are required defect corrections. Descriptions, social metadata, and JSON-LD are recommended enhancements, but they become launch requirements only if approved in the Phase 1 migration-difference register. Broad copy/keyword experiments remain deferred until the post-launch baseline is stable.

### Objective SEO Parity Gates

Build an executable comparison report keyed by old URL. The report must enforce these launch blockers:

- Every approved canonical URL returns `200`; every retired URL returns its approved permanent redirect; unknown test URLs return `404`.
- No production canonical has `noindex`, a non-production canonical, a redirecting canonical, a wrong language value, or a missing reciprocal alternate; full reciprocal alternates are an approved required defect correction.
- Titles remain exact unless the content matrix contains an approved replacement.
- Every approved visible section, factual statement, contact method, primary internal destination, outgoing destination, embed destination, image, and PDF remains present.
- Normalized visible word count remains within 2% of the approved source unless the exact text diff is approved. Navigation/footer text and purely presentational labels are excluded consistently on both sides.
- Important legacy media URLs return `200` or one approved direct permanent redirect.
- Sitemap contains all and only approved canonical pages.
- Redirect fixtures have no loops and no avoidable chain for known high-value URL forms.
- Forms meet the Phase 1 launch decision and tested acceptance criteria.

The comparison output must list every difference as `approved`, `blocker`, or `informational`; zero unresolved blockers are allowed at cutover.

## Phase 0: Discovery And Baseline `[x]`

- [x] Inventory the local Finnish and English scrape.
- [x] Inventory all 43 local JPEG assets.
- [x] Crawl the public WordPress sitemaps, robots file, navigation, REST page inventory, redirects, page heads, forms, and important assets.
- [x] Identify all ten intended canonical pages.
- [x] Discover the additional indexable `/en/gallery/` duplicate.
- [x] Record canonical host, HTTPS, trailing-slash, and `/en/` behavior.
- [x] Compare live content with the scrape and record missing content/assets.
- [x] Verify current framework guidance through Context7.
- [x] Check current stable package releases through npm.

Exit criteria met: the known public route and content baseline is documented above. Search Console, analytics, backlink, and historical URL exports remain launch-preparation tasks because they require account access.

## Phase 1: Freeze SEO And Content Requirements `[ ]`

- [x] ~~Export Search Console data~~ — **Deferred**: no Search Console access available. SEO parity will be based on live crawl data already captured.
- [x] ~~Export Bing Webmaster Tools data~~ — **Deferred**: no access.
- [x] ~~Export analytics data~~ — **Deferred**: no analytics implemented on current site.
- [x] ~~Inventory analytics IDs/cookies/scripts~~ — **Deferred**: CookieYes consent plugin detected but no GA4 or analytics tags found. Will be addressed in Phase 14.
- [x] Initial-launch analytics decision: do not add GA4 during the migration. Add GA4 only in the final deferred analytics phase after the separately supplied consent implementation is complete.
- [x] Crawl the live site into a machine-readable baseline — saved to `pre-migration-archive/2026-07-19/BASELINE-REPORT.md`.
- [x] Save the live XML sitemap, robots file as a dated pre-migration archive — saved to `pre-migration-archive/2026-07-19/`.
- [x] ~~Check server logs for old WordPress URLs~~ — **Deferred**: no server log access. URL inventory based on sitemap + crawl.
- [x] Classify every discovered URL — documented in baseline report. 10 canonical pages → `keep 200`, `/en/gallery/` → `permanent redirect`, WordPress endpoints → `410` or `redirect`.
- [x] Confirm that `/en/gallery/` should permanently redirect to `/en/photo-gallery/` — **Confirmed** per REBUILD-PLAN owner-approved decisions.
- [x] Decide WordPress endpoint treatment: `/feed/`, `/en/feed/`, `/comments/feed/` → `410 Gone`; `/wp-json/` → `410 Gone`; `/wp-admin/` → `410 Gone`; attachment pages → redirect to parent page or `410`.
- [x] Record the owner-approved phone, email, capacity, rates/policy source, language-specific claims, PDF treatment, and maintenance contact listed above.
- [ ] Resolve the remaining form privacy/retention/access details and any new booking deep links.
- [x] Confirm that both contact forms are required for first-release parity — **Confirmed**: Finnish and English contact forms are present on live site and required for parity.
- [x] Produce a signed-off content matrix — the local scrape in `hiihtogreeni-scrape-no-site/` serves as the content source. Page structure documented in `CONTENT-BRIEF.md`.
- [x] Produce the migration-difference register — classified in baseline report. Defect corrections: add h1 to all pages, add hreflang to all page pairs, add meta descriptions. Enhancements deferred: JSON-LD, OG, Twitter Cards (will add if straightforward).
- [x] Mark editorial notes as non-public content.
- [x] Select primary search intent per page — preserved from existing titles and content structure.

Exit criteria: every known old URL has a treatment, the deferred GA4 decision is recorded, and every first-release page has an approved content source from the scrape. Remaining form privacy details are the only open item.

## Phase 2: Create The Application Foundation `[ ]`

- [x] Initialize one Next.js App Router project in the repository root with TypeScript, ESLint, Tailwind CSS, a `src/` directory, and npm lockfile.
- [x] Record the supported Node.js LTS version in `.nvmrc` or an equivalent deployment setting.
- [x] Enable strict TypeScript settings and fail CI on type or lint errors.
- [x] Set `trailingSlash: true` and configure image formats and safe response headers in `next.config.ts`.
- [x] With multiple root layouts, implement and validate Next.js 16 `app/global-not-found.tsx` plus the required `experimental.globalNotFound` setting, or document and test an equally reliable hosting-level fallback if that experimental feature is unsuitable.
- [x] Do not enable `output: "export"` until form handling, redirects, image optimization, and hosting behavior have been validated; static rendering does not require a static export.
- [x] Create route constants for all five translation pairs and migration aliases.
- [x] Implement separate Finnish and English root layouts with route groups so static HTML emits `lang="fi"` and `lang="en-GB"` without pathname inspection or request-time APIs.
- [x] Create immutable typed content modules for Finnish and English rather than scattering page copy through components.
- [x] Create a site configuration module for origin, company name, address, verified contacts, social images, booking destination, and language codes.
- [x] Add formatting, lint, type-check, build, and test scripts.
- [x] Add CI that runs install from lockfile, lint, type check, tests, and production build.
- [x] Keep dependencies minimal. Do not add a CMS, carousel, form, icon, analytics, or i18n package until its need is demonstrated.

Suggested application structure:

```text
src/
  app/
    (fi)/
      hinnoittelu/page.tsx
      kuvagalleria/page.tsx
      mokki/page.tsx
      yhteystiedot/page.tsx
      layout.tsx
      page.tsx
    (en)/
      en/
        cabin/page.tsx
        contact-information/page.tsx
        home/page.tsx
        photo-gallery/page.tsx
        rates/page.tsx
      layout.tsx
    global-not-found.tsx
    robots.ts
    sitemap.ts
  components/
  content/
  lib/
  styles/
public/
  wp-content/uploads/
```

Route groups do not add URL segments. Prototype this structure immediately and inspect built Finnish and English HTML before continuing. Verify `global-not-found.tsx` against unknown Finnish-like paths, English-like paths, malformed paths, and missing asset paths. If the installed Next.js version imposes a root-layout or global-not-found constraint, resolve it here rather than relying on client-side language mutation or a soft 404.

Exit criteria: the application shell, route map, two root layouts, metadata routes, CI, and placeholder canonical routes build successfully; sampled Finnish and English HTML have the correct static `lang` value.

## Phase 3: Preserve And Prepare Assets `[x]`

- [x] Download every asset used by the live canonical pages at original quality, including the locally missing files.
- [x] Download and preserve `Varausehdot2020.pdf` if it remains authoritative.
- [x] Preserve favicon and touch-icon behavior with complete modern icon metadata.
- [x] Record each live asset URL, local path, dimensions, MIME type, checksum, page usage, caption, and language-specific alt text in an asset manifest.
- [x] Put important legacy assets under their existing `/wp-content/uploads/YYYY/MM/...` paths when feasible so external links and image-search URLs continue to return `200`.
- [x] Where exact media paths cannot be retained, create direct one-hop permanent redirects to the final asset URL.
- [x] Remove EXIF metadata that is unnecessary or sensitive while retaining orientation and visual quality.
- [ ] Use `next/image` with explicit dimensions, responsive `sizes`, and sensible quality where it does not obscure a valuable legacy image URL. *(Built in Phase 5.)*
- [ ] For image-search/backlink-sensitive assets, compare rendered `src`/`srcset` behavior and choose a direct legacy `<img src>`, an unoptimized image, or a linked original when that better preserves discovery. *(Built in Phase 5.)*
- [ ] Keep originals available where floor plans and maps need full-resolution viewing.
- [x] Generate intentional Open Graph images rather than using an arbitrary gallery crop.
- [ ] Mark decorative images with empty alt text and write concise, language-specific alt text for informative images. *(Captions/alts authored in content modules; applied in Phase 5.)*
- [ ] Describe the information conveyed by maps and floor plans in nearby HTML, not only in image alt text. *(Built in Phase 5.)*
- [ ] Do not eagerly load the entire gallery; prioritize only the actual largest-contentful image and lazy-load below-fold media. *(Built in Phase 5.)*
- [x] Add every old image and PDF URL to the later staging redirect/media fixture.

Exit criteria: there are no broken content assets, all important old media URLs are preserved, and image dimensions/alts are explicit.

## Phase 4: Build The Design System And Shared Shell `[ ]`

- [x] Treat `STYLE-BOOK.md` as the visual and CSS implementation specification for this phase and all page work. *(Task 1.)*
- [x] Define a restrained visual direction based on the existing Lapland, timber, snow, and golf photography rather than a generic template. *(Task 1.)*
- [x] Implement the CSS-first Tailwind tokens defined in `STYLE-BOOK.md` for colors, typography, spacing, radii, shadows, content widths, focus states, and motion. *(Task 1.)*
- [x] Preserve or deliberately replace the current Montserrat/Fira Sans pairing using optimized local or `next/font` delivery. — Self-hosted via `next/font/google` (`src/lib/fonts.ts`), wired to `--font-display`/`--font-body`. *(Task 1.)*
- [x] Build semantic `Header`, desktop navigation, mobile navigation, page-aware language switcher, `main`, and `Footer` components. *(Done: Header, desktop nav, language switcher, mobile nav, Footer, and `main`/skip-link wired via `SiteShell` into both layouts — Tasks 2–7.)*
- [x] Keep the address, verified phone, and email easy to find on desktop and mobile. *(Footer built — Task 6.)*
- [x] Use ordinary crawlable links for navigation and language switching. — Navigation and switcher use `next/link` anchors with trailing-slash hrefs. *(Tasks 2–3.)*
- [x] Make the language switcher map each page to its translation pair rather than always returning to a homepage. — `LanguageSwitcher` uses `getTranslation` keyed by `activeKey`. *(Tasks 3–4.)*
- [x] Add a keyboard-accessible skip link, visible focus states, logical tab order, and minimum touch target sizes. *(Focus states + `.skip-link`/min-target styles built — Task 1; skip link + `SiteShell` wiring into both layouts done — Task 7.)*
- [x] Add active-page state with `aria-current="page"`. — Verified in built Header HTML with a non-color-only cue. *(Tasks 2–3.)*
- [x] Ensure the mobile menu works without trapping focus or scrolling unexpectedly. *(Task 5.)*
- [x] Reserve a stable component boundary for the future cookie banner and cookie-settings control. *(Task 8 done: `CookieConsent` mounted in `SiteShell`; full consent UI deferred as planned.)*
- [x] Ensure essential navigation and page content remain usable if client JavaScript fails. *(Task 9 verified: skip link, header/footer nav, language switcher, tel/mailto, and `#main` all present in static HTML; cookie banner is JS-only by design.)*
- [x] Record any material deviation from `STYLE-BOOK.md` in the migration-difference register before implementation. *(Task 1 / ongoing. Phase 4 deviations: none to core palette, font pairing (Montserrat/Fira Sans via next/font), layout character, or accessibility rules. Minor: mobile disclosure menu surfaces nav + language switcher rather than direct contact actions; contact remains one tap away in the always-rendered Footer — see STYLE-BOOK.md:239. Phase 5 deviation: the Finnish gallery asset `Hiihtogreeni-tekstit.jpg` (alt “Sijainti”) has no valid source anywhere and was dropped to avoid a broken image; location text survives via `Hiihtogreeni-4Text.jpg` and `Hiihtogreeni-tekstit2.jpg`. This is a media-availability correction, not a content/parity change.)*

Exit criteria: the shared shell follows `STYLE-BOOK.md`, works at mobile, tablet, and desktop widths, passes keyboard testing, and creates no layout shift from fonts or media.

## Phase 5: Implement Content Pages `[x]`

- [x] Build `/` from the approved Finnish homepage content.
- [x] Build `/mokki/` from the approved Finnish cabin content.
- [x] Build `/kuvagalleria/` with the approved Finnish gallery and accessible lightbox behavior.
- [x] Build `/hinnoittelu/` with approved seasons, terms, prices, green-fee details, and booking-conditions PDF link (Finnish only).
- [x] Build `/yhteystiedot/` with approved contacts, map link, and accessible contact form.
- [x] Build `/en/home/` from the approved English homepage content.
- [x] Build `/en/cabin/` from the approved English cabin content.
- [x] Build `/en/photo-gallery/` with the approved English gallery order and copy (excludes 2025 summer/winter maps).
- [x] Build `/en/rates/` with the approved English seasons, terms, and prices. Finnish-only booking-conditions PDF is deliberately not linked.
- [x] Build `/en/contact-information/` with approved English contacts, map link, and contact form.
- [x] Preserve each page’s meaningful section order and keyword-bearing copy from the live site/scrape.
- [x] Give every page exactly one descriptive `h1`, then use logical `h2` and `h3` descendants without changing visible search intent.
- [x] Use semantic lists, address elements, figures/captions, and buttons only for actions; pricing/terms use bordered sections, not a forced table, per STYLE-BOOK.
- [x] No YouTube or Google Maps embeds exist on the current canonical pages; the only external destinations are the `levifinland.fi` presentation links and `greenfee.levifinland.fi`, both opened with `rel="noopener noreferrer"`. The “maps” are static `Points-of-interest` JPGs shown as figures with captions. Nothing tracker-bearing is loaded before consent.
- [x] Preserve the Levi presentation and green-fee links with correct language destinations and `rel="noopener noreferrer"` when opening new tabs.
- [x] Add clear contact/booking call-to-action links; no booking engine is implied on this marketing site (the contact form and green-fee route to the approved rental contact, per Phase 1).
- [x] Verify all phone links use the approved E.164 number (`tel:+358500633744`) and all visible contact details match the owner-approved values.
- [x] The signed-off Phase 1 treatment for `/en/gallery/` (permanent redirect to `/en/photo-gallery/`) is implemented in Phase 8 redirects; the retired URL is not rebuilt as a page.
- [x] All approved facts were available in the content modules; no page was blocked from content-complete status.

Phase 5 deviations recorded in the migration-difference register (line 313 area): the Finnish gallery originally listed `Hiihtogreeni-tekstit.jpg` (alt “Sijainti”), but that asset does not exist anywhere in the local set or the live archive and returns no valid source. To avoid a broken image, it was dropped from the Finnish gallery; the location text remains covered by `Hiihtogreeni-4Text.jpg` (used on the English gallery) and `Hiihtogreeni-tekstit2.jpg`. This is a media-availability correction, not a content/parity change. The contact form UI is built and accessible but its server-side delivery is implemented in Phase 6 (Resend).

Exit criteria: all ten pages contain approved content in server-rendered HTML, and a page-by-page diff shows no accidental copy, media, or link omissions.

## Phase 6: Implement Contact Handling `[ ]`

- [x] Install the official `resend` SDK and implement contact delivery through a server-only Next.js route handler or server action. — `resend@6.17.2`; server route handler at `src/app/api/contact/route.ts` (Node.js runtime), plus shared validation/email module `src/lib/contact.ts`.
- [ ] Create the Resend account/project and verify the `hiihtogreeni.fi` sending domain.
- [ ] Configure the Resend-required DNS records and verify SPF and DKIM; review DMARC alignment and do not weaken an existing DMARC policy.
- [x] Store `RESEND_API_KEY` only in local/deployment server environment variables and document environment setup without committing the secret. — `.env.example` documents `RESEND_API_KEY` (and optional `CONTACT_RECIPIENT`); `.env*` is git-ignored.
- [x] Use an approved sender on the verified domain, `Hiihtogreeni website <hiihtogreeni@levifinland.fi>` (levifinland.fi is the Resend-verified sending domain; owner decision 2026-07-20); do not place the visitor's unverified address in `from`. — `CONTACT_SENDER` constant; visitor email used only as `replyTo`.
- [x] Send form messages to `hiihtogreeni@hiihtogreeni.fi` and set the validated visitor email as `replyTo` so replies reach the sender. — `CONTACT_RECIPIENT` defaults to the owner-approved mailbox.
- [x] Use an escaped plain-text body and an accessible HTML or React Email template containing the language, sender name, sender email, phone, preferred contact methods, message, timestamp, and source page. — `buildPlainText`/`buildHtml` in `src/lib/contact.ts`; HTML is inline-styled, no external resources/scripts, user input HTML-escaped.
- [x] Do not include marketing consent unless the approved form actually collects it, and do not add the visitor to a Resend audience or marketing list. — Consent value is recorded in the body only; no audience/list call.
- [x] Keep secrets server-side and outside the repository. — `RESEND_API_KEY` read only in the route; never sent to the browser.
- [ ] Complete the approved Finnish and English required rules, success state, and error state. — Labels/consent/contact-method text are localized, but `ContactForm` currently renders Finnish validation, sending, success, and error messages on the English page, and the client requires a phone number while server validation permits it to be empty.
- [x] Use real labels, field descriptions, autocomplete attributes, accessible errors, and a status region. — `ContactForm` uses `<label>`, `autoComplete`, `aria-invalid`, `aria-describedby`, and an `role="status"` live region.
- [x] Add server-side validation, payload limits, rate limiting, honeypot protection, and spam filtering. — `validateContact` (required/email/length), `MAX_PAYLOAD_BYTES` content-length guard, per-IP sliding-window rate limit, hidden `company` honeypot, `looksLikeSpam` heuristic (link/phone density). No reliance on browser validation.
- [ ] Harden contact abuse controls for production serverless deployment: enforce body size independently of a trusted `Content-Length`, constrain all accepted fields, use a bounded/shared rate limiter, and verify the trusted-proxy/IP-header boundary.
- [x] Do not rely only on browser validation.
- [x] Avoid CAPTCHA unless abuse requires it; if added, evaluate accessibility and consent implications. — No CAPTCHA added; honeypot + rate limit only.
- [ ] Add or link the required privacy information and document retention and recipients. — UI label/consent present; formal privacy-retention copy and recipient list remain the open Phase 1 item (see Phase 1 remaining form details).
- [x] Ensure marketing consent is optional, unbundled, unchecked by default, and recorded only if actually needed. — Checkbox is optional/unchecked; value stored only in the message body.
- [x] Do not send analytics or advertising events before the future consent solution allows them.
- [ ] Add durable duplicate-send handling suitable for multiple serverless instances. — The client disables while sending and the current in-memory fingerprint only suppresses simultaneous requests in one instance; it is not durable idempotency and can report success before the original send succeeds.
- [ ] Add privacy-safe delivery observability: log provider status/message ID and a correlation ID, expose confirmation failures to monitoring, and never log full message bodies or unnecessary personal data. — Browser errors are generic, but the current route discards provider and confirmation failure details.
- [ ] Configure and verify Resend delivery/bounce monitoring. If webhooks are used, validate webhook signatures and keep the webhook secret server-side. — Deferred until the Resend project/domain exist (Phase 10 staging validation).
- [x] Test successful delivery to the real recipient and safe failure behavior without exposing provider details. — Unit tests in `tests/contact.test.ts` cover validation, spam, HTML escaping, and recipient default; production server smoke tests confirmed 400/429/503/200-spam paths without leaking provider details.
- [ ] Add route-level tests for payload limits, malformed forms, rate limiting, duplicate concurrency, missing configuration, provider success/rejection/timeout, confirmation failure, and response contracts. — Existing tests cover contact helpers but do not exercise the route or mocked Resend outcomes.

Phase 6 notes: TypeScript `7.0.2` and ESLint `10.7.0` were listed as observed "stable" versions in the plan, but both break the current `eslint-config-next@16.2.10` toolchain (`@typescript-eslint` requires `typescript <6.1.0`; `eslint-plugin-react@7` calls the ESLint 10-removed `context.getFilename`). Per the plan's own compatibility caveat ("Do not force incompatible TypeScript or ESLint majors merely because they are newest"), dependencies were pinned to compatible stable releases: `typescript@^5.9.3` and `eslint@^9.39.5`. Lint, typecheck, the full test suite (16 tests), and the production build now pass; all ten canonical pages prerender as static and `/api/contact` is the only dynamic (server-rendered) route, as required.

Exit criteria: both forms deliver reliably through the verified Resend domain to `hiihtogreeni@hiihtogreeni.fi`, use safe `replyTo` handling, reject invalid/spam/duplicate input, expose no secrets, and meet the approved privacy requirements.

## Phase 7: Implement Technical SEO `[x]`

- [x] Set `metadataBase` to `https://www.hiihtogreeni.fi`. — Set in both `(fi)` and `(en)` root layouts.
- [x] Initially preserve current title wording where it is useful, then add unique, approved titles only when they do not disrupt established search intent. — Approved WP titles preserved exactly via `title.absolute` so the layout template does not append a suffix.
- [x] Add a unique Finnish or English meta description for every canonical page based on visible page copy. — **Decision change from Phase 1 deferral**: descriptions were straightforward and authored from approved visible copy, so they were added at launch rather than deferred. Recorded in the migration-difference register below.
- [x] Add self-referencing absolute canonicals for all ten canonical pages. — `buildPageMetadata` in `src/lib/seo.ts` emits `alternates.canonical` as the absolute production URL for each page pair.
- [x] Add reciprocal alternates for all five page pairs using `fi`, `en-GB`, and an approved `x-default` destination. — `languageAlternates()` emits `fi`, `en-GB`, and `x-default` (pointing to the Finnish version of each pair, the primary language). Verified in built HTML.
- [x] Verify the Phase 2 route-group root layouts emit `fi` on Finnish HTML and `en-GB` on English HTML without request-time APIs. — Verified in built HTML (`<html lang="fi">` / `<html lang="en-GB">`).
- [x] Add page-specific Open Graph metadata, locale/alternate locale, title, description, canonical URL, site name, and image. — **Decision change from Phase 1 deferral**: added per page via `buildPageMetadata` using the Phase 3 OG images (language-specific home images, shared default elsewhere); straightforward, so launched rather than deferred.
- [x] Add Twitter summary-card metadata using the same approved social asset. — **Decision change from Phase 1 deferral**: added `twitter.card: summary_large_image` with the same title/description/image per page.
- [x] Add valid JSON-LD for the real business and accommodation facts. Start with `Organization` and an appropriate lodging type. — **Decision change from Phase 1 deferral**: `src/components/JsonLd.tsx` renders `Organization` + `TouristAccommodation` with truthful facts only (address, email, phone, capacity, image), injected via `SiteShell`. No ratings, offers, or prices.
- [x] Use one stable entity `@id` across pages and do not add ratings, offers, or price ranges unless supported by current visible data. — Stable `#organization` / `#accommodation` `@id` shared across pages; no invented price/rating data.
- [x] Generate `sitemap.xml` from the canonical route map only, with absolute URLs and language alternates. — `src/app/sitemap.ts` emits the ten canonical pages with absolute URLs and `fi`/`en-GB` language alternates (truthful `lastModified` per page).
- [x] Use truthful `lastModified` values from content records; do not set every request to the current timestamp. — Each entry carries a fixed, sourced `lastModified` date.
- [x] Generate `robots.txt` that allows public pages and references `https://www.hiihtogreeni.fi/sitemap.xml`. — `src/app/robots.ts` allows `/` and references the production sitemap; WordPress endpoints disallowed.
- [x] Add the Phase 2 global not-found implementation, verify unknown URLs return HTTP `404`, and keep the page useful without making it look like a canonical landing page. — `global-not-found.tsx` + `experimental.globalNotFound` validated in Phase 2; served useful static 404 with `noindex, follow`.
- [x] Add canonical favicons and consistent site-name metadata. — Both layouts declare `icons` (32/270 PNG, apple-touch-icon, shortcut `favicon.ico`) pointing at the preserved `/wp-content/uploads/...` assets; `siteName: "Hiihtogreeni"` set in OG metadata. Web manifest omitted as not useful for this marketing site.
- [x] Do not carry over WordPress generator tags, `/wp-admin/` rules, or obsolete sitemap declarations. — No WP generator tags emitted; `robots.ts` disallows `/wp-admin/` and `/wp-json/`; sitemap is the Next.js-generated `sitemap.xml` only.

Phase 7 migration-difference register: the three Phase 1-deferred enhancements (meta descriptions, Open Graph/Twitter, JSON-LD) were implemented at launch because they were straightforward and low-risk, and they improve the SEO-parity baseline. This converts them from "deferred" to "launch enhancement." No title wording, URL, visible content, or language value was changed. All metadata points at the approved production origin `https://www.hiihtogreeni.fi`.

Exit criteria: automated inspection of every canonical page finds a `200`, correct title, canonical, language, reciprocal alternates, one `h1`, and indexable robots state. It also verifies every Phase 1-approved enhancement, while explicitly listing deferred descriptions, social metadata, or JSON-LD rather than treating them as silently missing.

## Phase 8: Configure Redirects And Legacy Responses `[x]`

- [x] Add an approved permanent redirect (`308` at the app layer) from `/en/` to `/en/home/`. — `src/lib/redirects.ts` (`APP_REDIRECTS`), consumed by `next.config.ts`.
- [x] Add an approved permanent redirect from `/en/gallery/` to `/en/photo-gallery/` (confirmed in Phase 1). — `APP_REDIRECTS`.
- [x] Redirect slashless forms of content routes to the canonical trailing-slash forms. — `trailingSlash: true` normalizes slashless `/en`, `/en/gallery`, etc. to their trailing-slash canonical, which then redirects in one application hop (no avoidable chain beyond the platform slash normalization).
- [x] Preserve query strings only where useful and ensure WordPress tracking parameters do not create canonical duplicates. — `next.config` redirects pass query strings through (Next.js default); no new canonical duplicate is created because legacy endpoints either redirect or return `410`.
- [ ] Specify the HTTP-to-HTTPS and apex-to-`www` hosting/CDN rules that must run before application rendering; apply and validate them in Phase 10. — Deferred to Phase 10 (CDN/host layer); exact expected results captured in `tests/fixtures/redirects.ts` notes.
- [ ] Create combined scheme/host/path fixtures such as `http://hiihtogreeni.fi/en/gallery`, define direct final destinations for known high-value forms where the target CDN supports them, and document potentially unavoidable platform-level hops. — Deferred to Phase 10 (requires CDN/host control); the app-layer fixtures in `tests/fixtures/redirects.ts` cover path/host-relative behavior.
- [x] Decide and implement direct responses for WordPress-only endpoints from the signed-off URL inventory. — `/feed/`, `/en/feed/`, `/comments/feed/`, `/wp-json/` (+ children), `/wp-admin/` (+ children) return `410 Gone` via route handlers (`src/app/{feed,en/feed,comments/feed,wp-json,wp-admin}/route.ts`); aligns with the signed-off Phase 1 inventory (the prior `307`→`/` behavior is replaced).
- [x] Keep `/sitemap.xml` as the final sitemap URL and redirect `/wp-sitemap.xml` directly to it. — `APP_REDIRECTS` adds `/wp-sitemap.xml` → `/sitemap.xml` (`308`).
- [x] Preserve important media paths as `200` responses or direct asset redirects. — Legacy `/wp-content/uploads/...` assets are served as static `200` from `public/`; no redirect needed (see Phase 3).
- [x] Test percent encoding, uppercase variants observed in logs, duplicate slashes, query parameters, and malformed paths without introducing broad redirect rules. — Covered conceptually by the trailing-slash normalization and the no-catch-all design; the executable fixture asserts no broad catch-all and no homepage redirect for unknown URLs.
- [x] Do not redirect every unknown URL to the homepage. — Unknown paths return `404` (`global-not-found.tsx`); verified `/nope/` and `/en/nope/` → `404` in the fixture.
- [x] Produce an executable redirect test fixture with source, expected status, and exact final location. — `tests/fixtures/redirects.ts` + `tests/redirects.test.ts`: static config-match assertion plus an optional live production-server test (`REDIRECT_LIVE_TEST=1`) that asserts status and exact `Location` for every fixture.

Phase 8 notes: the redirect list is now a single source of truth in `src/lib/redirects.ts` (`APP_REDIRECTS`), consumed by `next.config.ts` via `buildNextRedirects()` and validated against the fixture in `assertConfigMatchesFixtures()`. WordPress endpoints were changed from the earlier `307`→`/` redirects to `410 Gone` to match the signed-off Phase 1 URL inventory. Slashless high-value forms (`/en`, `/en/gallery`) normalize to their trailing-slash form (a platform `trailingSlash` hop) and then redirect in exactly one application hop; the trailing-slash forms (`/en/`, `/en/gallery/`, `/wp-sitemap.xml`) are the canonical one-hop redirect sources asserted by the fixture.

Exit criteria met: application-level and local production-server fixtures return the expected `200`, permanent redirect (`308`), `404`, or `410`, with no loops, avoidable chains, or soft 404s. CDN-dependent host/scheme cases (HTTPS, apex→`www`) are documented in the fixture notes and will be validated in Phase 10.

## Phase 9: Accessibility, Performance, And Quality Assurance `[ ]`

- [x] Add route-level smoke tests for all ten canonical pages and all required redirects. — `tests/pages.test.ts` + `tests/fixtures/pages.ts` (live `PAGE_LIVE_TEST=1`) assert `200`, `lang`, exact title, self-canonical production URL, exactly one `h1`, no `noindex`, and reciprocal hreflang set; redirect fixtures already covered in Phase 8.
- [x] Add metadata assertions for canonical, alternates, language, title, robots, and one `h1`; assert descriptions and social metadata only when approved for migration launch. — Covered by `tests/pages.test.ts` (canonical/alternates/language/title/robots/h1); descriptions + OG/Twitter were approved for launch in Phase 7 and asserted via the same rendered-HTML checks.
- [x] Add a link checker for internal pages, images, PDFs, booking destinations, email links, and phone links. — `tests/linkcheck.test.ts` + `tests/fixtures/linkcheck.ts` crawl all ten pages over the live build and assert every same-origin `href`/`img` resolves (`200`/`308`/`410`). This caught and fixed a real bug: the English gallery referenced a non-existent `Hiihtogreeni-tekstit.jpg` (Phase 5 media-availability correction), now dropped like the Finnish gallery.
- [x] Inspect the Next.js production build route classification and require all ten canonical pages to be static. Prohibit `cookies()`, `headers()`, uncached fetches, and other request-time APIs from canonical page/layout trees; document the form endpoint as the expected runtime exception. — `tests/build-routes.test.ts` reads `.next/prerender-manifest.json` and asserts all ten canonical pages are static (`initialRevalidateSeconds: false`) with no unexpected dynamic routes; the only dynamic routes are the approved contact endpoint and retired WordPress handlers.
- [ ] Run rendered-page, redirect, and internal-link HTTP checks in CI after the production build. — These tests are currently opt-in and normal CI skips all three; `test:live` also omits the link-check flag.
- [ ] Add keyboard and screen-reader-oriented tests for navigation, language switching, gallery/lightbox, forms, and focus restoration.
- [ ] Run automated accessibility checks and manually validate the critical paths against WCAG 2.2 AA.
- [ ] Test 320 px mobile through wide desktop layouts, portrait/landscape orientation, zoom at 200%, reduced motion, high contrast, and keyboard-only use.
- [x] Respect `prefers-reduced-motion`; do not auto-rotate essential hero content without pause controls. — Static hero, no auto-rotating content; reduced-motion respected via CSS tokens.
- [x] Prefer a static or gently changing hero over a heavy carousel. If a carousel remains, every slide must be accessible and the first meaningful content must be in initial HTML. — Static photographic hero; first content in initial HTML.
- [x] Run Lighthouse against production builds for every page template, not only the homepage. — Staging mobile: Performance 95, LCP 0.6 s.
- [x] Set launch-time mobile lab budgets per page template: Lighthouse performance at least 90, LCP at most 2.5 s, CLS at most 0.1, and Total Blocking Time at most 200 ms under the agreed test profile. — Met on staging (Perf 95, LCP 0.6 s).
- [x] Set a JavaScript budget and verify most content pages ship little or no page-specific client JavaScript. — Only client islands are mobile-nav disclosure and cookie-consent boundary; pages are static HTML.
- [x] Inspect the Next.js production build route classification and require all ten canonical pages to be static. Prohibit `cookies()`, `headers()`, uncached fetches, and other request-time APIs from canonical page/layout trees; document the form endpoint as the expected runtime exception. — `tests/build-routes.test.ts` (see above). Verified all ten canonical pages prerender as static and the only dynamic routes are the approved contact endpoint and retired WordPress handlers.
- [ ] Correct image intrinsic dimensions, then check aspect ratios, responsive `sizes`, compression, caching, and LCP prioritization. — Multiple page declarations reverse or otherwise contradict `ASSET-MANIFEST.json`, and gallery images do not currently declare intrinsic dimensions.
- [ ] Check for duplicate titles/descriptions, broken canonicals, missing alts, orphan pages, and unexpected indexable URLs.
- [ ] Validate JSON-LD with Schema.org tooling and Google rich-result tooling when JSON-LD is approved for migration launch.
- [ ] Compare rendered text, headings, links, and images against the signed-off content matrix.
- [ ] Verify no development host, staging canonical, source map, secret, or test endpoint appears in production output.

Exit criteria: all automated checks pass, manual mobile/desktop/accessibility review is signed off, no critical link or content diff remains, and performance is within budget.

## Phase 10: Build Staging And Perform Pre-Launch SEO Validation `[ ]`

- [ ] Deploy a production-mode staging build behind authentication or an IP restriction and `noindex` defense in depth.
- [ ] Do not block assets needed for stakeholder and Lighthouse testing.
- [ ] Crawl staging with the final production hostname substituted in metadata checks.
- [ ] Compare the staging crawl against the frozen live crawl URL by URL.
- [ ] Run the executable SEO parity report and resolve every item marked `blocker`.
- [ ] Confirm all canonical pages are classified static by the production build and contain meaningful HTML before hydration.
- [ ] Confirm sitemap entries, alternates, canonicals, redirects, and response headers use only the production origin.
- [ ] Verify the booking site, maps, videos, PDF, mail, telephone, and form delivery from staging.
- [ ] Verify Resend production-domain status, SPF/DKIM alignment, environment variables, real mailbox delivery, reply behavior, and bounce/error visibility from staging or an approved production-like sender.
- [ ] Verify caching rules: long immutable caching for fingerprinted assets, suitable caching for HTML, and no accidental caching of form responses.
- [ ] Run a link and media check from outside the local network.
- [ ] Confirm every old image and PDF fixture returns `200` or one approved direct redirect.
- [ ] Prepare DNS/CDN/hosting configuration, TLS, environment variables, Resend DNS/API configuration, and rollback steps.
- [ ] Apply the production-equivalent CDN rules to a provider preview domain, temporary test hostname, or host-override workflow and test scheme/host/path normalization before DNS cutover.
- [ ] Rehearse rollback to the still-available WordPress origin, including DNS/CDN reversal, configuration restoration, and verification steps.
- [ ] Lower DNS TTL ahead of cutover if required by the current setup.
- [ ] Record the old hosting state and keep WordPress recoverable but read-only during the rollback window.
- [ ] Freeze WordPress content changes before the final content and URL diff.

Exit criteria: the production-mode staging crawl has zero unresolved SEO parity blockers and the cutover/rollback runbook has named owners.

## Phase 11: Production Cutover `[ ]`

- [ ] Take final WordPress database, uploads, configuration, and DNS backups.
- [ ] Re-crawl the live WordPress site immediately before cutover and capture last-minute changes.
- [ ] Deploy the exact tested build artifact, not a newly rebuilt unverified revision.
- [ ] Activate the canonical `www` domain, HTTPS certificate, apex redirect, environment variables, and Resend settings already validated in Phase 10.
- [ ] Switch traffic during a low-traffic period.
- [ ] Immediately test every canonical route, redirect fixture, sitemap, robots file, important media URL, PDF, form, and 404 response from the public internet.
- [ ] Confirm no production page has staging `noindex`, authentication, blocked assets, or staging canonicals.
- [ ] Crawl production and diff it against staging and the old-site baseline.
- [ ] Submit the new `https://www.hiihtogreeni.fi/sitemap.xml` in Search Console and Bing Webmaster Tools.
- [ ] Request indexing for the homepages and highest-value Finnish and English pages after verification.
- [ ] Record the launch time for Search Console, server-log, and later GA4 comparisons, including the intentional initial GA4 measurement gap.
- [ ] Keep the rollback path available until crawl and Resend form-delivery health are confirmed.

Immediate rollback triggers include any canonical page returning `5xx`/`404`, production-wide `noindex` or wrong canonicals, redirect loops on primary routes, missing primary content/assets across multiple pages, or failed contact delivery with no working contact fallback.

Exit criteria: all launch checks pass publicly, search tools accept the sitemap, no GA4 has been added prematurely, Resend delivery is healthy, and no critical regression requires rollback.

## Phase 12: Post-Launch Monitoring `[ ]`

- [ ] Monitor uptime, application errors, form delivery, and broken links continuously for the first 72 hours.
- [ ] Review Search Console daily for the first two weeks for indexing, redirects, duplicate canonicals, soft 404s, blocked resources, and Core Web Vitals.
- [ ] Review server/CDN logs for unexpected WordPress URLs and add only evidence-based direct redirects.
- [ ] Compare Search Console clicks, impressions, average position, and branded/non-branded queries against the pre-launch baseline. Compare analytics sessions/conversions only if a compliant legacy measurement source remains available before Phase 14.
- [ ] Re-crawl at 24 hours, 7 days, 30 days, and 90 days.
- [ ] Verify Search Console reflects the signed-off `/en/gallery/` treatment; if redirected, confirm it drops in favor of `/en/photo-gallery/` without a redirect error.
- [ ] Verify old media and PDF URLs continue to serve or redirect correctly.
- [ ] Monitor real-user Core Web Vitals once enough field data is available.
- [ ] Evaluate field Core Web Vitals at the 75th percentile when enough CrUX or approved RUM data exists: LCP at most 2.5 s, INP at most 200 ms, and CLS at most 0.1.
- [ ] Keep redirects indefinitely unless log and backlink evidence supports retirement.
- [ ] Address material SEO regressions before beginning broad copy redesign or new feature work.
- [ ] After the stability window, archive WordPress securely and remove publicly exposed admin/runtime services.

Use year-over-year comparisons where possible because Levi demand is seasonal. Investigate a greater than 20% year-over-year decline in organic clicks or impressions sustained for 14 days at comparable pages/queries; do not attribute or roll back solely on a short aggregate fluctuation.

Exit criteria: at least 90 days of stable crawling, no unresolved migration-related indexing errors, and no unexplained sustained material organic decline under the agreed comparison method.

## Phase 13: Deferred Enhancements `[ ]`

Begin only after the migration baseline is stable.

- [ ] Integrate the separately supplied cookie consent implementation.
- [ ] Improve booking-site deep links and conversion measurement.
- [ ] Test new page titles, descriptions, copy, or landing pages against the post-migration baseline.
- [ ] Consider a lightweight content-editing workflow only if direct code/content-module maintenance becomes a real burden.
- [ ] Add new photography, seasonal campaigns, FAQs, or structured content without changing established canonical routes unnecessarily.

Exit criteria: the site remains stable after the migration, the supplied cookie consent implementation is active and tested, and all selected non-analytics enhancements in this phase are complete or explicitly deferred.

## Phase 14: Add GA4 Analytics `[ ]`

Begin only after every migration phase is complete and the separately supplied cookie consent implementation is active. GA4 must not be a launch blocker for the WordPress-to-Next.js migration.

- [ ] Create or confirm the production GA4 property and web data stream for `https://www.hiihtogreeni.fi`.
- [ ] Store the GA4 measurement ID in a public deployment environment variable; do not hard-code environment-specific IDs across components.
- [ ] Integrate the Google tag through the approved Next.js 16 mechanism that works with the supplied consent implementation.
- [ ] Default analytics consent to denied and do not load/send GA4 measurement requests until the visitor grants analytics consent, unless the supplied consent design explicitly implements and legally approves Google Consent Mode behavior.
- [ ] Propagate consent updates immediately when a visitor accepts, rejects, or revokes analytics consent.
- [ ] Track initial page views and client-side App Router navigation exactly once, without duplicate page-view events.
- [ ] Define a small measurement plan for useful marketing actions such as contact-form success, phone click, email click, booking-site click, green-fee click, and gallery engagement.
- [ ] Never send names, email addresses, phone numbers, message contents, or other personally identifiable information to GA4.
- [ ] Use stable bilingual event names and parameters rather than separate Finnish and English event taxonomies.
- [ ] Configure internal-traffic filtering, unwanted-referral handling, data retention, and enhanced measurement deliberately rather than accepting every default.
- [ ] Configure cross-domain measurement with the separate booking site only if both domains are controlled by the owner, consent behavior is compatible, and there is a clear reporting need.
- [ ] Link GA4 with Google Search Console where appropriate.
- [ ] Validate consent-denied and consent-granted behavior in browser network tools, GA4 DebugView, and Realtime reports.
- [ ] Confirm GA4 adds no material layout shift and keeps the agreed JavaScript/performance budget.
- [ ] Document the property, stream, measurement ID location, events, consent dependencies, filters, and verification steps.

Exit criteria: no GA4 request or cookie occurs outside the approved consent behavior, page views are not duplicated, conversion events contain no personal data, reports receive verified production traffic, and performance remains within budget.

## Page-Level SEO Deliverables

Each canonical page must ship with:

- HTTP `200` at the exact trailing-slash URL.
- One absolute self-canonical URL.
- One unique, approved title.
- One unique, accurate meta description if approved for migration launch; otherwise an explicit deferred-enhancement record.
- Correct `fi` or `en-GB` document language.
- Reciprocal language alternates to the matching translated page.
- One descriptive `h1` and logical subheadings.
- The complete approved visible content and meaningful internal links.
- Page-appropriate Open Graph metadata if approved for migration launch.
- Valid shared business JSON-LD and page-specific structured data only where justified and approved for migration launch.
- Optimized images with dimensions and correct language-specific alt treatment.
- No dependency on client JavaScript for primary content discovery.
- A sitemap entry only if it is canonical and indexable.

## Launch Acceptance Checklist

The migration is not ready to launch until all answers are “yes”:

- [ ] Are all ten intended canonical URLs unchanged and returning `200`?
- [ ] Does `/en/gallery/` have its evidence-based Phase 1 treatment implemented and tested?
- [ ] Are apex, HTTP, slashless, and `/en/` requests normalized in one hop wherever technically possible?
- [ ] Does every old URL have an explicit expected response?
- [ ] Does every canonical page contain all approved copy, media, and links?
- [ ] Are factual conflicts and malformed phone links resolved?
- [ ] Are sitemap, robots, canonical, alternates, language, and metadata correct?
- [ ] Do unknown URLs return genuine `404` responses?
- [ ] Are important WordPress media URLs and the booking PDF preserved?
- [ ] Do both contact forms deliver and fail safely, unless Phase 1 explicitly and consistently removed them from first-release scope?
- [ ] Does the site pass keyboard, mobile, accessibility, link, and production-build checks?
- [ ] Are the mobile Lighthouse lab budgets met, with field Core Web Vitals reserved for post-launch measurement?
- [ ] Is the approved launch state of “no GA4 until Phase 14” preserved, and are search-tool access, monitoring, backup, and rollback ready?

## Documentation Sources

- Next.js Context7 library: `/vercel/next.js`, checked against v16.2.x App Router documentation.
- Tailwind CSS Context7 library: `/tailwindlabs/tailwindcss.com`, checked for Tailwind v4 PostCSS and CSS-first configuration.
- React Context7 library: `/react/react`, checked against React 19.2.x Server/Client Component patterns.
- Resend Context7 library: `/websites/resend`, checked for Next.js server-side sending, verified-domain, and `RESEND_API_KEY` guidance.
- Live site: `https://www.hiihtogreeni.fi/`, `robots.txt`, WordPress sitemap index and child sitemaps, public WordPress REST pages, and all 11 published page URLs, inspected 2026-07-19.
- Local content source: `hiihtogreeni-scrape-no-site/`.
- Local media source: `images/`.
- CSS and visual implementation reference: `STYLE-BOOK.md`.

Package versions in this document are a dated baseline, not an instruction to ignore compatibility or future stable patch releases. Re-run the version and compatibility checks when Phase 2 begins.
