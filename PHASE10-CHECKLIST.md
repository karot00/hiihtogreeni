# Phase 10 — Staging & Pre-Launch SEO Validation (working checklist)

Staging target: https://hiihtogreeni.vercel.app
Production origin (substituted in metadata checks): https://www.hiihtogreeni.fi

## A. Automated checks — DONE (0 blockers)

- [x] Page parity vs production origin: all 10 pages `200`, correct `lang`
      (`fi` / `en-GB`), exact title, exactly one `h1`, no `noindex`, full
      reciprocal hreflang (`fi` / `en-GB` / `x-default`), self-canonical on
      `www.hiihtogreeni.fi`. (No staging canonical leakage.)
- [x] Redirects / legacy responses: `/en/`→`/en/home/`, `/en/gallery/`→
      `/en/photo-gallery/`, `/wp-sitemap.xml`→`/sitemap.xml` all `308` one hop;
      WP feeds / `wp-json` / `wp-admin` → `410`; unknown → `404`. No soft 404s.
- [x] `sitemap.xml`: 10 URLs, all on production origin. `robots.txt` references it.
- [x] Link / media crawl: 0 broken same-origin refs across 22 crawled URLs.
- [x] Resend delivery from staging: `200 {"ok":true,"id":...}` from
      `hiihtogreeni@levifinland.fi` → `hiihtogreeni@hiihtogreeni.fi`
      (`replyTo` = visitor). Customer confirmation email added
      (best-effort second send, `replyTo` = business).
- [x] CI green: Node pinned to 22 in workflow; intentional `<img>` rule muted
      (Phase 3 legacy `/wp-content/uploads` preservation).

## B. Manual QA — HUMAN IN BROWSER (against the Vercel preview)

### Keyboard & screen reader
- [ ] Tab order + visible focus on every nav/link/button (desktop + mobile menu).
- [ ] Language switcher reaches the matching translation page; `aria-current`.
- [ ] Skip link first Tab → moves focus to `#main`.
- [ ] Gallery lightbox: open/close (Esc), focus in/out restores, prev/next labeled.
- [ ] Contact form: keyboard reachable, errors in `role="status"`, submit disables.
- [ ] SR (VoiceOver/NVDA): one `h1`/page, nav landmark, lang switch announced.

### WCAG 2.2 AA
- [ ] Contrast ≥ 4.5:1 body, 3:1 large/UI. Informative `alt` present; deco `alt=""`.
- [ ] Touch targets ≥ 24×24 px. No content flashing > 3/sec. Status msgs determinable.

### Responsive & motion
- [ ] 320 px → ~1440 px: no horizontal scroll; nav collapses to disclosure menu.
- [ ] Portrait + landscape; browser zoom 200%; `prefers-reduced-motion` respected;
      high-contrast mode legible.

### Performance (Lighthouse, mobile, per template)
- [ ] Perf ≥ 90; LCP ≤ 2.5 s; CLS ≤ 0.1; TBT ≤ 200 ms.
- [ ] Little/no page-specific client JS; images correct ratio/sizes/format; LCP prioritized.

### Structured data & content diff
- [ ] JSON-LD (Organization + TouristAccommodation) valid in Rich Results + Schema.org.
- [ ] Rendered text/headings/links/images vs signed-off matrix; no dup titles/descs;
      no unexpected indexable URLs; no staging host / `noindex` / secret in HTML.

## C. Host / CDN / DNS — NEEDS OWNER ACCESS (pre-cutover)

- [ ] HTTPS upgrade (`http`→`https`) — Vercel default; verify by curl.
- [ ] Apex → `www`: `hiihtogreeni.fi` and `http(s)://hiihtogreeni.fi` →
      `https://www.hiihtogreeni.fi` (Vercel domain config).
- [ ] Trailing slash already enforced by `trailingSlash: true` (verified).
- [ ] TLS cert for `www` + apex; `strict-transport-security` already emitted.
- [ ] Caching: fingerprinted `/_next/static/*` long immutable (Vercel default);
      HTML suitable; confirm `POST /api/contact` not cached (dynamic route).

### Verify scheme/host/path normalization (before DNS cutover)
- [ ] `http://hiihtogreeni.fi/en/gallery` → `https://www.hiihtogreeni.fi/en/photo-gallery/`
- [ ] `http://hiihtogreeni.fi/en/` → `https://www.hiihtogreeni.fi/en/home/`
- [ ] `http://hiihtogreeni.fi/wp-sitemap.xml` → `…/sitemap.xml`

## D. Rollback rehearsal (to WordPress) — NEEDS OWNER ACCESS

- [ ] Record current WP hosting state (provider, WP/PHP version, DB + uploads + DNS backup).
- [ ] Keep WordPress recoverable but read-only during the rollback window.
- [ ] Runbook: cutover = DNS → Vercel; rollback = repoint DNS to WP + purge/shorten TTL.
      Named owner + RTT estimate from TTL.
- [ ] Lower DNS TTL ahead of cutover (e.g. 300 s); raise after stability window.
- [ ] Freeze WP content edits before final diff.

## Rollback triggers (plan)
Any canonical page `5xx`/`404`, production-wide `noindex`/wrong canonical,
redirect loop on a primary route, missing primary content across pages, or
failed contact delivery with no fallback.

## Resend notes
- Verified domain: `levifinland.fi` (SPF + DKIM verified; "Partially Verified"
  is only the optional tracking CNAME). Sender `hiihtogreeni@levifinland.fi`
  is valid; Return-Path uses the `send` subdomain (Resend standard).
- `RESEND_API_KEY` set in Vercel (Masked). `CONTACT_RECIPIENT` defaults to
  `hiihtogreeni@hiihtogreeni.fi`. Confirm both business + confirmation emails
  arrive and replies route correctly.
