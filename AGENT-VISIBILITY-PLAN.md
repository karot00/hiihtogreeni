# Agent visibility plan: hiihtogreeni.fi readable and bookable by AI

**Status:** IN PROGRESS (steps 1–3 and 5 done; step 4 on `feature/rates-from-api`; booking API live as levifinland2026 PR #36, robots there PR #37; next: step 6, then cabins 7.8.4–7.8.5)
**Created:** 2026-10-25 (reviewed and corrected the same day)
**Reference implementation:** experiencelevi.fi (repo `chaletnulkka`, `docs/agent-first.md`, `docs/analytics.md`). In its first 36 hours of analytics that site had 51 sessions, 32 of them from ChatGPT (`utm_source=chatgpt.com`), 16 of those reached the booking page, and one sent a booking request. ChatGPT recommends it first for "cabin in Levi" questions because it can read prices and availability from the HTML.

This plan applies the same principle to hiihtogreeni.fi without breaking the rules in `REBUILD-PLAN.md` (no invented prices or availability, no content hidden behind client-side JavaScript, no runtime database on this site, minimal dependencies, one task at a time with owner approval).

## 1. Where hiihtogreeni.fi stands today

| Area | State | Gap for an AI agent |
|---|---|---|
| Rendering | All 12 routes are static server components; copy is in the HTML | Good |
| Prices and availability | Only inside the cross-origin iframe `cabins.levifinland.fi/embed/{lang}/hiihtogreeni`, fetched client-side; the embed page is `noindex` | **Invisible to every crawler.** The rates pages publish no euro amounts for accommodation |
| Seasons text | The A/B/C cards were removed (PR #2, merged 2026-10-11); the rates page now points to the calendar ("a Saturday-to-Saturday week is the best value") | No contradiction, but no numbers either |
| robots.txt | `*` allow all, no AI-bot rules | Works, but add named allows so a future agency change cannot silently block them |
| llms.txt | None | Missing |
| JSON-LD | `Organization` + `TouristAccommodation` without telephone, geo, priceRange or offers; `FAQPage` only on the teams pages | No price range, no `potentialAction`, thin entity |
| Contact | Phone and email loaded on click from `/api/contact-details` | Bots never see them; the phone is in the CTA HTML, email is not |
| Analytics | GA4 with Consent Mode v2 and a cookie banner | AI-referred traffic is invisible until the visitor accepts; most do not |
| Public API / MCP | None on this site; the booking logic lives in `levifinland2026/apps/cabin` (server actions, not callable) | Agents cannot check availability or send a request |
| Copy consistency | Copy is correct (14 per apartment, 28 whole house), but `SITE_CONFIG` in `src/lib/config.ts` duplicated capacity, contacts and address from `shared.ts` (used only by tests) | Two sources can drift |

## 2. Target state

An AI assistant answering "large cabin in Levi for 20 people in March, price?" can read from hiihtogreeni.fi: capacity, apartments A/B, the price per night per apartment for the asked dates or at least the season range, whether the dates are free, the terms, and how to send a request. An agent acting for a guest can do the same through a documented JSON API and an MCP server, and the owner can tell from the inquiry whether it came from a person or an agent.

## 3. Architecture decision

The data (`hg_rates`, `hg_inventory_nights`, `hg_bookings`) lives in the Hiihtogreeni Turso database used by `levifinland2026/apps/cabin`. hiihtogreeni.fi must not get its own database (`REBUILD-PLAN.md` l.162). Two options:

- **A. Public read API in `apps/cabin`, consumed server-side by hiihtogreeni.fi (recommended).** `apps/cabin` already has the deals feed (`/api/public/hiihtogreeni/deals`) as a pattern. Add `/api/v1/hiihtogreeni/{property,pricing,availability,quote}` and `POST .../inquiries` (paths as in `levifinland2026/plans/agent_visibility_plan.md` §3), with OpenAPI and an MCP route. The cabins `robots.ts` must stop disallowing `/api/` wholesale so agents can reach `/api/v1/`. hiihtogreeni.fi fetches rates and the next months' availability at request time with ISR (15 min) and renders them as HTML tables and a calendar, exactly like the last-minute banner is already rendered. One source of truth, no database here, agents get the API on cabins.levifinland.fi.
- **B. A Go service like chaletnulkka for Hiihtogreeni.** Proven, fast, but a third codebase for the same cabin and a second place that writes `hg_bookings`. Only worth it if `apps/cabin` becomes a bottleneck.

Go with A. The API work is specified in `levifinland2026/plans/agent_visibility_plan.md` §3; this plan covers the hiihtogreeni.fi side and assumes that API exists (steps 1–3 below do not depend on it).

**Pricing model (owner decision 2026-09-29, `0006_weekly_price.sql`):** a full Saturday-to-Saturday week costs the weekly price; any other night costs the nightly price (about 1.15 × the old nightly rate). Everything that shows prices (table, JSON-LD, llms.txt) must show both, or a week looks ~15 % more expensive than it is. Cleaning and linen come from `hg_addon_rates`.

## 4. Work in order (one step per owner approval, as REBUILD-PLAN requires)

1. **One set of facts (1 h).** Remove the duplicated `SITE_CONFIG.{address,contact,maintenance,capacity,booking,languages}` so `src/content/shared.ts` is the only source; point the tests at it. Add `telephone` (already public in the CTAs) and `geo` (the Google Business Profile pin, same as cabins.levifinland.fi) to the JSON-LD. Email stays click-to-load and therefore also stays out of llms.txt.
2. **robots and llms.txt (1–2 h).** `src/app/robots.ts`: keep `*` allow, add named allows for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Bingbot. A crawler obeys only its own group, so repeat the WordPress disallows in every named group (test it). Google-Extended (also Gemini grounding) and Applebot-Extended (Apple model training) are allowed too (owner, 2026-10-25). Check-in 17:00 / check-out 11:00 (booking terms v1.3 §8) are now in `STAY_TIMES` in `shared.ts` and in the terms list on both rates pages, so llms.txt reads them from there; `checkinTime`/`checkoutTime` go into the JSON-LD in step 5, where the type becomes `LodgingBusiness` (those properties are not defined for `TouristAccommodation`). Add `src/app/llms.txt/route.ts` (and `llms-full.txt`) generated from `shared.ts` + `fi.ts`/`en.ts`: company, address, capacity (14 per apartment, 28 whole house), apartments, check-in/out, distances, terms link, booking URL, phone, page list. Until step 4 exists, say "prices and availability: see the booking calendar at …" rather than inventing numbers. Add a test that llms.txt and JSON-LD carry the same facts as `shared.ts`.
3. **Measurement baseline (2–3 h).** Add the self-hosted Umami at stats.experiencelevi.fi (website "Hiihtogreeni"; cookieless, Do Not Track honoured, script tag only, no package) *alongside* GA4, which stays consent-gated. Track `book_cta_click` and `contact_click`; watch `utm_source=chatgpt.com`. Decide on removing GA4 + the banner after 30–60 days of data. The Umami host is Chalet Nulkka's server; both companies have the same owner, so no DPA is needed (owner, 2026-10-25). The cookie settings panel describes the cookieless statistics (owner approved). Website id in Vercel as `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (Config, Production only); the tracker also only counts `www.hiihtogreeni.fi`.
4. **Rates and availability in HTML (1–2 days, needs the API; no interim static export, a hand-copied list goes stale silently).** *Done 2026-10-25: `src/lib/booking-api.ts` reads `/api/v1/hiihtogreeni/{pricing,availability}`; both rates pages show the season table (weekly and nightly per apartment), extras, minimum stay, the last-minute offer, and free periods for the whole house and each apartment as date ranges instead of a grid; llms.txt / llms-full.txt carry the same; `priceRange` + `AggregateOffer` (nightly and weekly) on the rates pages' JSON-LD. Pages and llms files revalidate every 15 min; without the API they fall back to the calendar text.* On `/hinnoittelu/` and `/en/rates/`: a server-rendered table of seasons with the weekly (Sat–Sat) and nightly price per apartment, the cleaning and linen fees, min/max nights, and a server-rendered month view of availability (next 6 months) with each free night marked, revalidated every 15 minutes. The iframe widget stays for the interactive flow. Reuse the `getLastMinuteDeal()` fetch pattern (`next.revalidate`, timeout, graceful fallback to "see calendar" if the API is down). This satisfies "do not invent prices": they come from the booking system.
5. **JSON-LD upgrade (half a day).** *Done without prices (2026-10-25): `LodgingBusiness` built in `src/lib/structured-data.ts`, apartments A/B as `Apartment` (pets in A, booking terms §9), amenities from the visible cabin list, stay times, `ReserveAction`, and a visible FAQ + `FAQPage` on both rates pages. Left for step 4: `priceRange` and `AggregateOffer`.* `LodgingBusiness` with `containsPlace` for apartments A and B, `amenityFeature`, `checkinTime`/`checkoutTime`, `priceRange` and an `AggregateOffer` whose low/high come from the same API response as the table (never hardcoded; the cabins site currently hardcodes 500–1000 and should stop). Add `potentialAction: ReserveAction` pointing at the booking page. `FAQPage` on the rates page with the real questions (changeover days, linen, payment terms).
6. **Agent surfaces and inquiry event (1–2 h, after the API and MCP exist).** `<link rel="alternate" type="application/json">` to the property JSON, llms.txt mentions `/openapi.json` and `/mcp` on cabins.levifinland.fi, footer "For agents" block like experiencelevi.fi. `inquiry_submitted` via a `postMessage` from the embed (needs a change in levifinland2026: add `hiihtogreeni-embed:inquiry` with nights, apartments, lead days, no personal data).
7. **UTM links in (30 min).** From levifinland.fi, cabins.levifinland.fi and experiencelevi.fi (sister box) with the convention in chaletnulkka `docs/analytics.md`.

## 5. Not doing

- No separate booking engine on hiihtogreeni.fi; cabins.levifinland.fi remains the booking destination (REBUILD-PLAN l.39).
- No ratings/reviews in structured data until there is a verifiable source.
- No per-night prices in llms.txt beyond what the API returns (the file is generated, not typed).

## 6. Success criteria (60 days after step 4)

- hiihtogreeni.fi shows in ChatGPT/Perplexity answers for "large cabin Levi groups", with a price quoted.
- `utm_source=chatgpt.com` sessions and their share reaching the rates page, compared with experiencelevi.fi.
- At least one inquiry whose session started from an AI referral; later, one inquiry via the API with `channel=api|mcp`.
- Monthly: the fixed questions from the levifinland2026 plan §7 asked in ChatGPT, Perplexity and Claude; record whether hiihtogreeni.fi is cited and whether the quoted price matches the table.
