# GA4 Measurement Plan — Hiihtogreeni.fi (Phase 14)

Owner-supplied web-stream measurement ID: **`G-4963QM11X1`** (verify it maps to
the GA4 property configured for `https://www.hiihtogreeni.fi` before go-live).

## Consent model

GA4 is **not** a migration launch blocker. The tag is present whenever the
measurement ID is configured, but **collection** is gated behind the Phase 13
cookie-consent `analytics` category via **Google Consent Mode v2**:

- `gtag('consent','default', …)` sets `ad_storage`, `ad_user_data`,
  `ad_personalization`, and `analytics_storage` to **denied** before any config
  call. No GA4 request or cookie is sent until explicit consent.
- `gtag('consent','update', {analytics_storage:'granted'|'denied'})` is pushed
  from the consent handlers (accept all / reject non-essential / save
  preferences), so a later revocation is honored immediately even though the
  script tag stays mounted.
- The gtag.js loader is injected **whenever `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is
  set** (so GA4 verification finds the tag). Collection is gated by consent, not
  by the script's presence: with Consent Mode default denied, no request or
  cookie leaves the browser until the analytics category is granted.

## Where the code lives

- `src/lib/analytics.ts` — helper functions (`buildConsentUpdate`,
  `safeOutboundHostname`, `trackEvent`, `GA4_EVENTS`, `GA4_MEASUREMENT_ID`).
- `src/components/GoogleAnalytics.tsx` — the gated gtag loader, Consent Mode
  defaults/updates, single-fire page views, and click tracking.
- Mounted once in `src/components/SiteShell.tsx` inside `CookieConsentProvider`.
- Conversion events are fired from `ContactForm.tsx` (form success) and
  `GalleryGrid.tsx` (lightbox open).
- Measurement ID comes from `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (set only in
  production; unset in staging/preview so they never pollute production).

## Events

Stable, bilingual-neutral event names (one taxonomy for Finnish and English):

| Event name               | Trigger                                              | Parameters (no PII)                       |
| ------------------------ | ---------------------------------------------------- | ----------------------------------------- |
| `page_view`              | First load (via `config`) + client navigations       | `page_path`, `page_location`, `page_title`, `language` |
| `contact_form_submit`    | `/api/contact` returns `200`                         | `language`                                |
| `contact_click`          | `tel:` or `mailto:` link click                       | `method` (`"tel"` / `"mailto"`) — email/phone value is NEVER sent |
| `outbound_click`         | Click to an external origin (approved destinations)  | `outbound_host` (hostname only, no path/query) |
| `gallery_lightbox_open`  | Gallery image opened in lightbox                     | `slide_index`, `language`                 |

The two approved external destinations are `levifinland.fi` (presentation pages)
and `greenfee.levifinland.fi` (green-fee booking), both opened with
`rel="noopener noreferrer"` per Phase 5.

## Privacy guardrails

- No names, email addresses, phone numbers, message contents, or other PII are
  ever passed to GA4. `mailto:` clicks send only `method: "mailto"`; outbound
  clicks send only the destination hostname.
- `safeOutboundHostname` strips path and query before any outbound event.

## GA4 property configuration (owner action, UI-side)

These are not code changes and must be configured in the GA4 UI before/at
go-live:

- **Verify the property/stream**: confirm `G-4963QM11X1` is the stream for
  `https://www.hiihtogreeni.fi` (not a stray/test property).
- **Internal-traffic filtering**: define the office/owner IPs as internal.
- **Unwanted-referral handling**: exclude `levifinland.fi` if cross-domain
  measurement is not enabled (see plan; currently out of scope — levifinland2026
  uses Umami, not GA4).
- **Data retention**: set to the minimum required (e.g. 2 months) rather than
  accepting the 14-month default unless a longer window is needed.
- **Enhanced measurement**: enable only what is useful (page changes via the
  SPA event above; disable scroll/deep-link otherwise noise).
- **Link GA4 with Google Search Console** for the verified property.
- **Cross-domain with `levifinland.fi`/`greenfee.levifinland.fi`**: deferred to a
  separate decision; there is currently no receiving GA4 property on that side.

## Validation

- Consent-denied: no `_ga`/`_ga_4963QM11X1` cookies set; no `collect` requests
  in browser Network/GA4 DebugView.
- Consent-granted: `_ga` cookies set; `page_view` appears in Realtime/DebugView.
- Revoke-after-grant: a fresh `consent update` (denied) stops new
  `analytics_storage` use; no further `collect` requests.
- No duplicate `page_view` on the initial load (config-driven only).
- Performance: no material layout shift; JS budget unchanged (gtag loads
  `afterInteractive`, only after consent).

## Cookie inventory (Phase 13 table)

The `_ga` and `_ga_4963QM11X1` rows in `CONSENT_INVENTORY` are now marked
`active: true` (they were registered as deferred before this phase shipped).
