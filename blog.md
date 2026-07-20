# Rebuilding a WordPress Website With Next.js and AI: A Step-by-Step Project Diary

Many business websites reach a point where they still do their job, but maintaining them has become unnecessarily difficult. The content is valuable, the site has earned visibility in Google, and customers know where to find it. At the same time, the technology underneath may be slow, dependent on plugins, or difficult for the business owner to manage without outside help.

This is the situation with Hiihtogreeni.fi, a bilingual accommodation website for a large cabin in Levi, Finnish Lapland. The current site runs on WordPress and Elementor. It contains useful Finnish and English content, years of search-engine history, and a substantial collection of photographs. The goal is not simply to replace it with something newer. The goal is to rebuild it with modern technology while protecting the content, URLs, and search visibility that already have business value.

I am documenting the work as it happens. This is intended as a practical guide for business owners and decision makers who are considering a similar website renewal. It also shows how I approach projects where modern web development and AI-assisted tools are used together. There will be enough technical detail to explain the important decisions, but the focus is on what those decisions mean for the business.

At the time of writing, the project has cost approximately 7 euros in AI usage. The implementation has not started yet. So far, the work has focused on collecting reliable source material, auditing the existing website, identifying risks, and creating a detailed plan before writing application code.

## Step 1: Collecting the Existing Website

The first step was to preserve the useful material from the current website.

I used Kiloclaw, a hosted OpenClaw service, to scrape Hiihtogreeni.fi. The task was not only to copy the visible text. The scrape collected the page structure, Finnish and English content, links, image references, contact information, and other details needed to recreate the site.

Kiloclaw packaged the findings into a ZIP archive and sent it to me through Telegram. This made the collection stage convenient: the remote agent performed the work, gathered the result, and delivered one archive that I could add to the new project workspace.

I also collected the website photographs separately. These include winter exterior images, cabin interiors, bedrooms, floor plans, nearby points of interest, ski-maintenance facilities, meeting spaces, and golf-related material. The images are a central part of the Hiihtogreeni brand, so they are being treated as first-class content rather than decoration added at the end.

This first stage is useful in almost any website renewal. Before changing the technology, create a reliable inventory of what already exists. A website often contains more business knowledge than people remember: old landing pages, downloadable documents, image captions, contact routes, language versions, and links that may still receive visitors from Google.

## Step 2: Bringing the Material Into Kilo

After receiving the archive, I added the scraped content and images to a local project. I then started working in Kilo with GPT-5.6 Sol.

The AI model was not asked to immediately generate a new homepage. That would have been quick, but it would also have been risky. Instead, I asked it to inspect the source files, compare them with the live website, verify the current technology choices, and build a chronological migration plan.

This distinction matters. AI can produce code very quickly, but speed is only valuable when the input and goals are correct. For an established business website, the first job is to understand what must be preserved. A visually attractive replacement can still be a failed project if important pages disappear from Google, old links stop working, or customers receive incorrect contact information.

The planned replacement uses Next.js 16, React 19, Tailwind CSS 4, and TypeScript. In practical terms, this gives us a fast and maintainable website with pages that can be generated mostly as static HTML. Visitors and search engines receive the important content immediately, while JavaScript is reserved for features that genuinely need interaction, such as the mobile menu, image gallery, and contact form.

## Step 3: Comparing the Scrape With the Live Site

The scrape gave us a strong starting point, but it was not treated as unquestionable truth. We compared it with the website that is still online.

The expected site structure contained ten main pages: five in Finnish and five in English. The live audit found an eleventh page, an older English gallery URL that was still public, indexable, and included in the WordPress sitemap. It was not part of the normal navigation, and much of its content was Finnish.

This is exactly the kind of detail that can be missed in a straightforward redesign. Simply leaving that page behind would create a dead URL. Recreating it unchanged would preserve duplicate and confusing content. The proposed solution is to redirect it directly to the current English photo gallery, after confirming the decision with available search and backlink data.

We also documented the existing URL rules. The site uses HTTPS, the `www` domain, trailing slashes, Finnish content at the root, and English content under `/en/`. These details may appear small, but search engines treat URLs as identities. The new application will preserve the established canonical addresses and redirect non-canonical versions directly to the correct destination.

The audit also found missing metadata, inconsistent heading structures, incomplete links between language versions, missing local assets, and several content conflicts. These are not all programming problems. Some require business decisions.

For example, different parts of the old site listed different phone numbers and accommodation capacities. We stopped and confirmed the authoritative information instead of allowing the new site to repeat the inconsistencies. The approved rental contact is Karo Tammela at `+358 500 633 744`, using `hiihtogreeni@hiihtogreeni.fi`. Each apartment accommodates 14 guests.

The live Finnish rates and policy content will be used as the source of truth. Language-specific details, such as the currently different Finnish and English green-fee prices, are being preserved unless they are deliberately corrected later. This creates an audit trail for content decisions rather than silently choosing whichever value happened to appear first in the source material.

## Step 4: Planning for Search Visibility Before Design

Protecting the site’s position in Google is the main requirement for the first release. The design can become more modern, but the renewal must not accidentally discard the value accumulated by the existing website.

We created a detailed rebuild plan that covers the work from the initial content inventory to post-launch monitoring. It includes a page-by-page URL matrix, redirect rules, content checks, image handling, language links, metadata, sitemap generation, accessibility, performance, staging, launch, rollback, and monitoring after publication.

One of the most important ideas in the plan is an objective comparison between the old and new websites. Before launch, each known URL will have an expected result. Important pages must return successfully, retired pages must redirect correctly, unknown pages must return a real not-found response, and the sitemap must contain only the final canonical pages.

The visible content will also be compared. Important sections, facts, images, documents, internal links, and external destinations must remain present unless a change has been explicitly approved. This turns “the new site looks complete” into something that can be tested.

We also separated changes into three categories:

1. **Parity:** something that must remain equivalent, such as a page URL, important paragraph, contact route, or image.
2. **Defect correction:** a verified improvement, such as fixing an incorrect phone link or giving each page a proper main heading.
3. **Enhancement:** something new, such as richer social sharing images, structured business information, or revised marketing copy.

This helps reduce migration risk. It prevents a technology replacement, redesign, content rewrite, and marketing experiment from becoming one large change where problems are difficult to diagnose.

## Step 5: Defining the New Visual Direction

The current Hiihtogreeni website has useful visual ingredients: strong winter photography, warm timber interiors, a recognizable blue-gray teal, a warm orange accent, and the Montserrat and Fira Sans font pairing. The problem is not the raw material. The presentation needs more consistency, space, hierarchy, and attention to mobile use.

We created a CSS style book for the rebuild. The direction is called **Arctic calm, timber warmth**. It combines cool snow and forest tones with the warmth of the log cabin, fireplace, and sauna. The intention is to feel like high-quality Lapland accommodation without becoming a generic luxury-hotel template.

The style book defines the color palette, typography, spacing, image crops, overlays, buttons, navigation, cards, gallery, contact form, responsive layouts, motion, and accessibility requirements. It also translates those decisions into Tailwind CSS theme tokens that can later be implemented directly.

Some original elements will remain recognizable. The primary teal is based on the current `#486C7A`, and the orange accent is based on `#E47D33`. Montserrat remains the display and navigation typeface, while Fira Sans remains the body typeface. The new design will use these elements with more restrained color ratios, stronger contrast, larger photography, and a clearer editorial layout.

This is another useful lesson for website renewals: modernization does not require erasing brand recognition. Often the better approach is to identify what already feels distinctive and improve how consistently it is used.

## Step 6: Deciding How the Contact Form and Analytics Will Work

The new site will remain mostly static, but the contact form still needs a reliable server-side service to deliver messages. We selected Resend for this job.

The form will send email through a verified Hiihtogreeni domain to `hiihtogreeni@hiihtogreeni.fi`. The visitor’s email address will be used as the reply address, not as a forged sender address. This is important for email deliverability and for modern SPF, DKIM, and DMARC protections.

The implementation plan also covers validation, spam protection, duplicate submissions, privacy, safe error messages, and delivery monitoring. Resend remains invisible to the visitor. From the customer’s point of view, it is simply a clear contact form that confirms whether the message was delivered successfully.

Google Analytics 4 will not be added during the initial migration. The site owner has a separate cookie consent implementation that will be added later. Once the migration is complete and consent handling is working, GA4 will be introduced as its own final phase.

This order avoids mixing analytics and cookie work into the search-critical website replacement. It also ensures that analytics requests, page views, and conversion events are connected to the visitor’s consent choice from the beginning. Planned events include successful contact requests and clicks to phone, email, booking, green-fee, and gallery destinations. Personal information from the contact form will never be sent to GA4.

## Where the Project Is Now - time spent 1,5 hrs

At this point, the source content and images have been collected, the live site has been audited, the major content inconsistencies have been resolved, the technical stack has been checked against current documentation, and two working documents have been created:

- `REBUILD-PLAN.md` defines the chronological migration, testing, launch, and monitoring process.
- `STYLE-BOOK.md` defines how the new site should look, feel, and behave.

The next work begins with freezing the remaining content and SEO requirements, preserving the live assets and historical URLs, and creating the Next.js application foundation. As each phase is implemented, tested, and revised, this project diary will continue from here.

## Where the Project Is Now - Phase 1 and 2 complete

Phase 1 froze the remaining SEO and content requirements. The live site was crawled into a dated `pre-migration-archive` baseline, every discovered URL was classified (ten canonical pages kept, the old English gallery redirected, WordPress feeds and endpoints retired), and the contact-form scope was confirmed. A signed-off content matrix and a migration-difference register were produced, separating parity, defect corrections, and deferred enhancements. The only open item is the detailed form privacy and retention wording.

Phase 2 created the application foundation. A Next.js 16 App Router project was initialized with TypeScript, ESLint, Tailwind CSS 4, and a locked dependency set. Strict type checking and a `trailingSlash` policy are in place, the image formats are configured, and a typed route map covers all five translation pairs plus the migration aliases. Finnish and English each have their own root layout so the static HTML emits `lang="fi"` and `lang="en-GB"` without any request-time logic, while a small site-config module holds the verified company, contact, and capacity details.

The two remaining pieces of Phase 2 were then finished. A global not-found page was implemented and validated using Next.js 16's `experimental.globalNotFound`, so unknown Finnish, English, and malformed paths return a real `404` with no soft fallback. Page copy was moved out of components into immutable, typed content modules for both languages, with the owner-approved corrections (Karo Tammela's number, 14 guests per apartment, the two green-fee prices, the vehicle-charging rule) applied in one place. Finally, a CI workflow was added that installs from the lockfile and runs lint, type check, a content test suite, and a production build.

Phases 1 and 2 together took about 20 minutes and cost roughly 2,50 € in AI usage with Qwen3.7 max (-50% deal on Kilo Code). The application shell, route map, two root layouts, typed content, and CI all build successfully, and sampled Finnish and English HTML carry the correct static language value. The next step is preserving and preparing the live assets.

## Where the Project Is Now - Phase 3 complete

Phase 3 preserves and prepares every asset the live site uses. The first job was to know exactly which images, icons, and documents the canonical pages reference. We extracted the asset URLs directly from the live HTML of all eleven pages and compared them with the 43 photographs already collected locally.

The comparison found six assets missing from the local set: the four favicon sizes (32, 180, 192, and 270 pixels), the booking-conditions PDF (`Varausehdot2020.pdf`), and two gallery photographs that the local scrape had not captured. All six were downloaded from the live site at original quality. The PDF is the authoritative Finnish booking-conditions document, so it is kept exactly as published.

The most important preservation decision in this phase is about old URLs. WordPress stores uploads under paths such as `/wp-content/uploads/2022/10/...`. External sites, image search, and old inbound links may still point at those exact addresses. To avoid breaking any of them, every asset was placed under its original `/wp-content/uploads/YYYY/MM/...` path inside the new project's `public/` folder. We verified through a production build that all 53 prepared assets (50 photographs, icons, and the PDF, plus three new social-sharing images) return a real HTTP `200` from the new application, not a redirect to elsewhere.

EXIF metadata was stripped from the photographs to remove unnecessary or sensitive camera information while keeping orientation and visual quality intact. Image references in the content modules were also switched from absolute `hiihtogreeni.fi` addresses to relative paths, so the new site serves its own images from its own origin rather than depending on the old WordPress host. One incorrect link was corrected along the way: the rates page pointed at a booking-conditions PDF path that returned `404`; it now points at the real, working file.

Finally, we generated intentional social-sharing images (Open Graph, 1200 by 630 pixels) for the Finnish and English homepages and a shared default, using the brand teal and a real Levi winter photograph rather than an arbitrary gallery crop. A machine-readable `ASSET-MANIFEST.json` records each asset's URL, local path, dimensions, MIME type, checksum, and page usage, which will support later automated link and media checks.

Phase 3 cost 0 € in AI usage (the model used was free) and took about 10 minutes. All assets are preserved and serving correctly, and the type check, content tests, and production build pass. The next phase builds the shared design system and website shell.

## Where the Project Is Now - Phase 4 complete (20 min 0 € with hy3 free model)

Phase 4 builds the shared design system and the parts of the site that appear on every page: the visual foundation, the header and navigation, the language switcher, the footer, and the basic page structure. This is the work that makes the site feel like one coherent product rather than a collection of separate pages.

The first step was to turn the style book into working code. The colors, fonts, spacing, button shapes, shadows, and motion rules are now defined once, in one place, and reused everywhere. We also kept the original Montserrat and Fira Sans fonts but now load them in a fast, privacy-friendly way that does not depend on an external service. Because these foundations are defined centrally, future pages will automatically follow the same look without repeating decisions.

The navigation was built as ordinary, crawlable links rather than JavaScript-generated menus. This matters for two reasons. First, search engines can read the full site structure. Second, the site stays usable even if a visitor's browser has JavaScript disabled or a script fails to load. The header shows the current page clearly, the language switcher connects each Finnish page to its English counterpart (and back), and the footer carries the company name, address, verified phone and email, and quick links in both languages.

The mobile menu was given special attention. It is a proper disclosure panel that opens and closes cleanly, follows the keyboard, closes when the visitor presses Escape, and does not trap focus or unexpectedly move the page. On small screens, the header stays compact while the menu remains easy to tap.

We also reserved a stable place for the future cookie consent banner. The actual consent interface will be added later (as planned, after the migration), but the mounting point already exists in the shared shell so it can be connected without reworking the layout.

A practical detail worth noting: the shared shell, header, footer, navigation, and language switching are all present in the static HTML before any script runs. We verified this in the built output for every page. In plain terms, the important content and navigation work even in the worst-case browser situation.

Phase 4's implementation passed the automated checks (lint, type check, and production build), and all pages are generated as static HTML. The visual direction, accessibility rules, and brand elements were followed as written; the only minor adjustment is that the mobile menu shows navigation and language choices rather than repeating the contact details, which remain one tap away in the footer that appears on every page.

As the later phases build the actual page content, galleries, and contact form, this project diary will continue from here.

## Where the Project Is Now - Phase 5 complete

Phase 5 is the part where the site stops being a shell and becomes real pages. All ten canonical pages now contain their approved Finnish and English content in server-rendered HTML: the homepages, cabin pages, galleries, rates pages, and contact pages, each in its own language and URL.

A small set of shared building blocks was created first so the pages stay consistent: a photography-led hero, a section wrapper with the agreed vertical rhythm, image-led link cards for the homepage, an editorial split section pairing a large photo with copy, a fact strip for the high-value accommodation numbers, and a closing call-to-action band. These are ordinary server-rendered markup, so the important text is in the HTML before any script runs.

The homepages open with a strong hero and then present three image cards for Cabin, Rates, and Gallery, an editorial cabin-and-location section, the accommodation fact strip, group and golf features, and a scenery section. The cabin pages carry the capacity and room facts, the bedrooms and living-kitchen-sauna details, and the special facilities such as the fireplace, conference room, and ski-maintenance spaces. The rates pages present the seasons, the included services and payment terms, and the green-fee feature, with the Finnish booking-conditions PDF linked only on the Finnish page as agreed.

The galleries deserve a mention. They use a responsive image grid with an accessible lightbox: keyboard navigation, Escape to close, focus restoration, and a visible image counter with clear previous/next/close labels. The Finnish gallery shows 26 images including the floor plans and the summer/winter points-of-interest maps; the English gallery follows the approved different image order and correctly excludes the 2025 maps. One Finnish gallery image, `Hiihtogreeni-tekstit.jpg` (caption "Sijainti"), had no valid source anywhere in the local set or the live archive, so it was dropped to avoid a broken image; the location information remains covered by other images already in both galleries.

The contact pages carry the verified rental and maintenance contacts, the company address, a directions link to the Levi presentation, and an accessible contact form with always-visible labels, autocomplete attributes, field-level errors, a status region, a consent checkbox, and contact-method choice. The form's server-side delivery is the subject of the next phase, but the interface and validation are already in place.

Two details from the plan were confirmed rather than assumed. The current canonical pages contain no YouTube or Google Maps embeds; the only external destinations are the Levi presentation links and the green-fee site, both opened in a new tab with the correct `rel="noopener noreferrer"`. There is no separate booking engine to link to, so the pages point clearly to the approved rental contact without implying that booking happens on this marketing site. Phone links use the approved E.164 number and all visible contact details match the owner-approved values.

The automated checks pass: lint, type check, and a production build. All ten pages return HTTP `200` and are generated as static HTML, each with exactly one descriptive `h1` and the correct document language (`fi` or `en-GB`).

Phase 5 took about 20 minutes and cost 0 € in AI usage, again using the free hy3 model in Kilo Code. The next phase, Phase 6, connects the contact form to real email delivery through Resend.

## Where the Project Is Now - Phase 6 complete

Phase 6 connects the contact form built in Phase 5 to real email delivery, without exposing any secret or relying on the visitor's browser to do the safety checks. This is the kind of feature that looks simple on the surface but has to be done carefully, because it is the one place where a public website accepts input from anyone on the internet.

The delivery itself uses the official Resend SDK, called only from a server-side route in Next.js. The visitor's message never touches the browser-side code with a sending key; the API key lives only in a server environment variable, documented in a `.env.example` file and kept out of the repository. The email is sent from an approved address on the verified domain, and the visitor's own address is placed in the reply-to field so that a simple reply reaches the person who wrote to us. Messages arrive at the owner-approved mailbox, `hiihtogreeni@hiihtogreeni.fi`.

The important part is everything around the sending. The server validates every field again, independently of the browser: required fields, a real email format, and sensible length limits. It limits how often one visitor can submit, it rejects hidden "honeypot" fields that only automated bots would fill in, and it filters obvious spam such as messages stuffed with links. It also blocks an identical message from being sent twice in a row, so a stray double-click cannot spam the inbox. If something goes wrong with delivery, the visitor sees only a generic friendly error; the technical details stay on the server and no personal information is written to logs.

Privacy was treated as a first-class requirement. Marketing consent is optional, unchecked by default, and its value is simply recorded in the message rather than signing the visitor up to anything. No analytics or advertising events are sent, which keeps us consistent with the plan to add measurement only after the separate consent solution is in place.

Two practical corrections were needed before the quality gates would pass. The plan had noted TypeScript 7 and ESLint 10 as the "stable" versions observed at the start, but the current Next.js lint toolchain does not actually support them: the type-checking plugin requires TypeScript below 6.1, and the React lint plugin calls an ESLint 10 function that no longer exists. Following the plan's own rule not to force incompatible majors just because they are newest, the project was pinned to the compatible stable releases TypeScript 5.9 and ESLint 9. After that, lint, type checking, the full test suite, and the production build all pass cleanly. All ten pages still generate as static HTML, and the contact endpoint is correctly the only dynamic, server-rendered route.

We added automated tests for the contact logic and ran live checks against the built site: invalid input is rejected, spam is silently absorbed, repeated submissions are blocked, and a message without a configured sending key fails safely without revealing the provider. The remaining Resend-specific steps, creating the project, verifying the `hiihtogreeni.fi` sending domain, and confirming DNS and delivery from staging, are intentionally deferred to the pre-launch validation phase where real credentials and the production domain exist.

Phase 6 took roughly 10 minutes and cost 0 € in AI usage, using the free hy3 model in Kilo Code. The next phases handle technical SEO metadata, redirects, and the pre-launch validation.

## Where the Project Is Now - Phase 7 complete

Phase 7 is the technical SEO layer that tells search engines exactly what each page is and how the Finnish and English versions relate. Until now the pages had good content but no explicit machine-readable signals about canonical addresses, language relationships, or how they should appear when shared. That is now fixed, and it was done without changing a single visible word, URL, or language.

The first piece is the canonical address. Every one of the ten pages now declares its own self-referencing canonical URL on the production domain `https://www.hiihtogreeni.fi`. This is the quiet instruction that prevents search engines from treating slightly different URLs as separate pages and splitting the ranking value between them.

The second piece is the language relationship. Each page now lists its translation counterpart using `hreflang` tags: the Finnish cabin page points to the English cabin page and back, and both point to an `x-default` version. This is what lets Google show the right language to the right visitor and keeps the two versions reinforcing each other instead of competing. We verified in the built HTML that the Finnish and English cabin pages carry exactly these reciprocal links.

The third piece is how the pages look when shared on social media. Each page now has an Open Graph and Twitter card: a title, description, and a real brand image (the homepages use language-specific images, the rest use a shared brand image generated back in Phase 3). Previously these were only partly defined. We also added structured data, a small block of JSON that describes the real business and the accommodation factually: the company, address, contact details, and that the cabin has two 14-guest apartments. It deliberately contains no ratings, prices, or availability claims, because the source site publishes none and we do not invent them.

Two smaller but important details were also handled. The XML sitemap is generated only from the ten final canonical pages, with absolute URLs and the language alternates, and it uses honest "last changed" dates rather than always pretending the page was edited today. The favicon set was declared from the preserved legacy icon files so bookmarks and tabs keep working, and we confirmed the unknown-URL 404 page from Phase 2 still serves a real, non-indexed not-found response.

A note on the plan: Phase 1 had tentatively deferred meta descriptions, social metadata, and structured data as "enhancements" to add only if straightforward. In Phase 7 they turned out to be low-risk and clearly beneficial to the SEO-parity baseline, so they were implemented at launch instead of deferred. This is recorded in the migration-difference register. No title wording, URL, or visible content was altered.

The automated checks pass: lint, type checking, the full test suite (16 tests), and the production build. All ten pages still generate as static HTML with the correct `lang` value, and the contact endpoint remains the only dynamic route. The next phase handles the remaining redirect rules and legacy URL responses before the pre-launch validation.

Phase 7 took about 15 minutes and cost 0 € in AI usage, again using the free hy3 model in Kilo Code.

## Where the Project Is Now - Phase 8 complete

Phase 8 is where the new site politely handles the old URLs. A rebuild that changes nothing visible can still lose business if old links from Google, bookmarks, or other websites suddenly break. This phase makes sure every known old or retired address either reaches its correct new home in one clean step or is explicitly retired, and that unknown addresses fail honestly instead of being swept to the homepage.

The most important redirect is the English homepage. The old site served the English section at `/en/` and the stale gallery at `/en/gallery/`. Both now redirect permanently, in a single application step, to the correct new pages: `/en/home/` and `/en/photo-gallery/`. Permanent here means search engines are told the move is final and should transfer the accumulated visibility to the new address. Slashless forms such as `/en` are first normalized to their trailing-slash shape by the framework, then redirect, so there is no wasteful extra hop beyond that one normalization.

The sitemap also gets a clean handover. The new site publishes a single sitemap at `/sitemap.xml`, generated only from the ten final canonical pages. The old WordPress sitemap address, `/wp-sitemap.xml`, now redirects to it, so any historical link or reference still arrives at the right place.

The retired WordPress machinery is treated differently. Feeds (`/feed/`, `/en/feed/`, `/comments/feed/`), the JSON API (`/wp-json/`), and the admin area (`/wp-admin/`) are not redirected anywhere. They now return `410 Gone`, which is the honest signal that this content has been deliberately removed and will not return. This matches the signed-off URL inventory; the earlier behavior of bouncing these to the homepage was replaced. Returning `410` rather than a redirect keeps crawlers from repeatedly checking endpoints that no longer exist.

The key discipline this phase enforces is "no avoidable chains and no soft 404s." We did not add any broad catch-all rule that funnels unknown paths to the homepage. A visitor or crawler asking for a genuinely unknown address gets a real `404` page, not a disguised redirect. This keeps the site honest to search engines and avoids the trap where a missing page silently masquerades as the homepage.

To make this trustworthy rather than hopeful, the redirect rules now live in one place (`src/lib/redirects.ts`) and are consumed directly by the framework configuration, so the running site and the tests cannot drift apart. On top of that, we built an executable redirect test fixture: a list of source URLs with their exact expected status and final destination. The test checks the configuration statically, and, when run against the built production server, makes real HTTP requests and asserts the exact response. It confirmed every fixture in practice: the homepage redirects, the gallery redirect, the sitemap redirect, the `410` endpoints, and the `404` for unknown paths.

The HTTPS upgrade and the move from the bare domain to `www` are hosting-level rules that run before the application sees a request. They are documented with their exact expected results and will be applied and validated in the pre-launch phase, where the CDN and DNS are available.

The automated checks pass: lint, type checking, the full unit test suite, and the production build. All ten pages still generate as static HTML, and the new `410` endpoint handlers are correctly the only additions alongside the existing contact route. The next phase is the quality-assurance sweep: automated checks for accessibility, performance budgets, and the full link and content diff against the signed-off source.

Phase 8 took about 25 minutes (including a sauna break) and cost 0 € in AI usage, using the free hy3 model in Kilo Code.

## Where the Project Is Now - Phase 9 in progress (automated QA complete)

Phase 9 is the quality-assurance sweep that turns "the site looks finished" into evidence. The first part is the automated safety net, and it is now in place and passing: a set of executable tests that check the built site the way a search engine or a broken link would experience it.

The first layer is page smoke tests. For every one of the ten canonical pages, the test renders the production build and asserts the essentials: a `200` response, the correct document language (`fi` or `en-GB`), the exact title, a self-referencing canonical on the production `www` domain, exactly one main heading, no `noindex` instruction, and the full reciprocal hreflang set (Finnish, English, and x-default). This is the practical version of the SEO parity gate from the plan: every page must declare what it is and how it relates to its translation.

The second layer is a link checker. It crawls all ten pages from the live build and follows every internal link and image reference, asserting that each one resolves rather than returning a broken `404`. This test earned its place immediately: it caught a real defect. The English gallery still referenced a photograph, `Hiihtogreeni-tekstit.jpg`, that does not exist anywhere in the asset set, the live archive, or the local images. The Finnish gallery had already dropped it in Phase 5 for exactly this reason. The link checker found the English copy had been missed, and we removed the broken reference so both galleries now agree and no image is broken. A check like this is cheap insurance against the kind of small omission that quietly hurts a site after launch.

The third layer inspects the production build itself. A test reads Next.js's own prerender manifest and confirms that all ten canonical pages were generated as static HTML, with no page accidentally turned into a server-rendered, request-time route. The only dynamic routes allowed are the contact-form endpoint and the deliberately retired WordPress handlers. This guards the core performance and SEO promise: visitors and crawlers receive complete HTML immediately.

To keep these checks practical, the heavier ones run against a real built server behind an opt-in flag (`PAGE_LIVE_TEST`, `REDIRECT_LIVE_TEST`, `LINKCHECK_LIVE_TEST`), so the everyday `npm test` stays fast while the full crawl runs in CI before a release. Lint, type checking, the full unit suite, and the production build all pass.

The remaining Phase 9 items are the hands-on review: keyboard and screen-reader testing of the navigation, language switcher, gallery lightbox, and form; manual WCAG 2.2 AA validation; responsive and reduced-motion checks; and Lighthouse performance budgets per page template. Those require a human (and a browser) rather than an automated assertion, so they are the next step before the pre-launch staging validation.

The automated QA portion of Phase 9 took about 15 minutes and cost 0 € in AI usage, using the free hy3 model in Kilo Code. The next step is the manual review pass, followed by the Phase 10 staging and pre-launch SEO validation.

## Where the Project Is Now - Phase 10 in progress (staging live)

Phase 10 is the pre-launch validation that proves the rebuilt site is safe to switch on, using a real production-mode deployment rather than a local preview. The project was pushed to GitHub and connected to Vercel, which now builds and deploys automatically on every push. The staging site is live at `https://hiihtogreeni.vercel.app`, and it is the exact production build we will later point the real domain at.

The first job was to confirm the staging build matches the frozen SEO baseline, substituting the production origin `https://www.hiihtogreeni.fi` in the metadata checks so we catch any staging leakage. An executable check crawled all ten pages and asserted the essentials: every page returns `200`, carries the correct document language (`fi` or `en-GB`), its exact title, exactly one main heading, no `noindex` instruction, the full reciprocal hreflang set, and a self-canonical pointing at the production `www` domain rather than the staging address. All ten passed, which means a crawler seeing the staging pages would read them exactly as the finished site.

The same check confirmed the redirect discipline from Phase 8 holds in the real deployment: the English homepage and the retired gallery redirect permanently in one hop, the old WordPress sitemap address redirects to the new one, the retired WordPress endpoints return `410 Gone`, and unknown addresses return a genuine `404`. The generated sitemap contains only the ten canonical pages, all on the production origin, and the link and media crawler found zero broken internal references.

The contact form was the one piece that needed real credentials, and it exposed a useful lesson. The first live test returned a delivery failure, and the Resend logs showed the cause clearly: the code was still sending from `website@hiihtogreeni.fi`, but the verified sending domain in Resend is `levifinland.fi`. The fix was twofold. First, the sender address was changed to `hiihtogreeni@levifinland.fi` to match the verified domain. Second, we discovered Vercel had been running an older commit, because the local edits had not yet been committed and pushed; once the change was deployed, the form delivered successfully. Messages now arrive at `hiihtogreeni@hiihtogreeni.fi` with the visitor's address as the reply-to. We also added a customer confirmation email: after a successful submission the visitor receives a short bilingual acknowledgment (reply-to points back to the business), while a failure to send that copy never blocks the main delivery.

A small CI fix was needed along the way. The GitHub workflow read the Node version from `.nvmrc`, but the runner image had moved on and no longer had that version preinstalled, so the build step failed. Pinning the Node version explicitly in the workflow resolved it, and we also silenced a lint warning about the intentional direct `<img>` tags used to preserve the legacy `/wp-content/uploads/` image URLs, which is a deliberate Phase 3 decision rather than an oversight.

What remains before launch is partly human and partly owner-access work, captured in a Phase 10 checklist file. The hands-on review (keyboard and screen-reader testing, WCAG 2.2 AA, responsive and reduced-motion behavior, and Lighthouse budgets per page) needs a person in a browser against the staging URL. The hosting-level rules (HTTPS, apex to `www`, trailing-slash, TLS, caching) and the WordPress rollback rehearsal need access to DNS and the old hosting, and they are validated at the cutover itself rather than on the preview.

Phase 10 automated validation took about [TIME] and cost [COST] in AI usage, using the free hy3 model in Kilo Code. The remaining step is the manual browser review and the pre-cutover host and rollback checks.


