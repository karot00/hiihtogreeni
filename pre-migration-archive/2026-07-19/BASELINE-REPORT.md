# Pre-Migration Baseline Report: hiihtogreeni.fi

- **Crawl date:** 2026-07-19
- **Source:** https://www.hiihtogreeni.fi
- **Total pages indexed:** 11
- **Languages:** Finnish (fi), English (en-GB)
- **CMS:** WordPress 7.0.2
- **Report version:** 1.0

---

## 1. Page Inventory

### 1.1 Finnish Pages (fi)

| # | URL | Slug | Title | Lang | Robots Meta | Canonical | Meta Description | OG Tags | Twitter Card | JSON-LD | h1 | Hreflang Alternates | Sitemap Lastmod |
|---|-----|------|-------|------|-------------|-----------|------------------|---------|--------------|---------|-----|---------------------|-----------------|
| 1 | `https://www.hiihtogreeni.fi/` | `/` | Hiihtogreeni | fi | max-image-preview:large | `https://www.hiihtogreeni.fi/` | NONE | NONE | NONE | NONE | NONE (h2 used) | fi=self, en=`/en/home/` | 2026-06-15T15:22:32+02:00 |
| 2 | `https://www.hiihtogreeni.fi/mokki/` | `/mokki/` | Mökki – Hiihtogreeni | fi | max-image-preview:large | `https://www.hiihtogreeni.fi/mokki/` | NONE | NONE | NONE | NONE | NONE | NONE | 2023-06-13T15:29:02+02:00 |
| 3 | `https://www.hiihtogreeni.fi/kuvagalleria/` | `/kuvagalleria/` | Kuvagalleria – Hiihtogreeni | fi | max-image-preview:large | `https://www.hiihtogreeni.fi/kuvagalleria/` | NONE | NONE | NONE | NONE | NONE | NONE | 2025-07-29T11:16:47+02:00 |
| 4 | `https://www.hiihtogreeni.fi/hinnoittelu/` | `/hinnoittelu/` | Hinnoittelu – Hiihtogreeni | fi | max-image-preview:large | `https://www.hiihtogreeni.fi/hinnoittelu/` | NONE | NONE | NONE | NONE | NONE | NONE | 2026-04-29T11:53:36+02:00 |
| 5 | `https://www.hiihtogreeni.fi/yhteystiedot/` | `/yhteystiedot/` | Yhteystiedot – Hiihtogreeni | fi | max-image-preview:large | `https://www.hiihtogreeni.fi/yhteystiedot/` | NONE | NONE | NONE | NONE | NONE | NONE | 2026-03-03T09:37:43+02:00 |

### 1.2 English Pages (en-GB)

| # | URL | Slug | Title | Lang | Robots Meta | Canonical | Meta Description | OG Tags | Twitter Card | JSON-LD | h1 | Hreflang Alternates | Sitemap Lastmod |
|---|-----|------|-------|------|-------------|-----------|------------------|---------|--------------|---------|-----|---------------------|-----------------|
| 1 | `https://www.hiihtogreeni.fi/en/home/` | `/en/home/` | Hiihtogreeni | en-GB | max-image-preview:large | `https://www.hiihtogreeni.fi/en/home/` | NONE | NONE | NONE | NONE | NONE (h2 used) | fi=`/`, en=self | 2026-06-15T15:23:30+02:00 |
| 2 | `https://www.hiihtogreeni.fi/en/cabin/` | `/en/cabin/` | Cabin – Hiihtogreeni | en-GB | max-image-preview:large | `https://www.hiihtogreeni.fi/en/cabin/` | NONE | NONE | NONE | NONE | NONE | NONE | 2022-11-09T11:36:21+02:00 |
| 3 | `https://www.hiihtogreeni.fi/en/gallery/` | `/en/gallery/` | Gallery – Hiihtogreeni | en-GB | max-image-preview:large | `https://www.hiihtogreeni.fi/en/gallery/` | NONE | NONE | NONE | NONE | NONE | NONE | 2025-07-29T11:15:01+02:00 |
| 4 | `https://www.hiihtogreeni.fi/en/photo-gallery/` | `/en/photo-gallery/` | Photo Gallery – Hiihtogreeni | en-GB | max-image-preview:large | `https://www.hiihtogreeni.fi/en/photo-gallery/` | NONE | NONE | NONE | NONE | NONE | NONE | 2024-07-30T10:47:19+02:00 |
| 5 | `https://www.hiihtogreeni.fi/en/rates/` | `/en/rates/` | Rates – Hiihtogreeni | en-GB | max-image-preview:large | `https://www.hiihtogreeni.fi/en/rates/` | NONE | NONE | NONE | NONE | NONE | NONE | 2026-04-29T11:55:45+02:00 |
| 6 | `https://www.hiihtogreeni.fi/en/contact-information/` | `/en/contact-information/` | Contact Information – Hiihtogreeni | en-GB | max-image-preview:large | `https://www.hiihtogreeni.fi/en/contact-information/` | NONE | NONE | NONE | NONE | NONE | NONE | 2026-03-03T09:37:29+02:00 |

### 1.3 Page Status Summary

| Metric | Value |
|--------|-------|
| Total pages crawled | 11 |
| Pages in sitemap (fi) | 5 |
| Pages in sitemap (en) | 6 |
| Pages with meta description | 0 |
| Pages with OG tags | 0 |
| Pages with Twitter Card | 0 |
| Pages with JSON-LD | 0 |
| Pages with semantic h1 | 0 |
| Pages with hreflang alternates | 2 (homepages only) |
| Self-canonical pages | 11 |
| Orphan pages (in sitemap, not in nav) | 2 (`/en/gallery/`, `/en/photo-gallery/`) |

---

## 2. SEO Issues

| # | Severity | Issue | Affected Pages | Detail |
|---|----------|-------|----------------|--------|
| 1 | HIGH | No meta descriptions | All 11 pages | No page has a `<meta name="description">` tag |
| 2 | HIGH | No Open Graph tags | All 11 pages | No `og:title`, `og:description`, `og:image`, etc. |
| 3 | HIGH | No Twitter Card tags | All 11 pages | No `twitter:card`, `twitter:title`, etc. |
| 4 | HIGH | No JSON-LD structured data | All 11 pages | No `application/ld+json` script blocks |
| 5 | HIGH | No semantic h1 | All 11 pages | Site title uses `<h2>` instead of `<h1>` |
| 6 | MEDIUM | Incomplete hreflang coverage | 9 of 11 pages | Only `/` and `/en/home/` have hreflang alternates; all other pages lack cross-language links |
| 7 | MEDIUM | Orphan stale page in EN sitemap | `/en/gallery/` | Present in sitemap but NOT in English navigation; appears to be superseded by `/en/photo-gallery/` |
| 8 | MEDIUM | Orphan page in EN sitemap | `/en/photo-gallery/` | In sitemap but not in English navigation |
| 9 | MEDIUM | Finnish nav has no `/en/gallery/` equivalent | Navigation mismatch | FI has "Kuvagalleria" → `/kuvagalleria/`; EN has two gallery pages but nav only shows "Photo Gallery" |
| 10 | LOW | WordPress generator tag exposed | All 11 pages | `<meta name="generator" content="WordPress 7.0.2">` reveals CMS version |
| 11 | LOW | Shortlink URLs exposed | All 11 pages | `<link rel="shortlink">` with `/?p=XX` format leaks internal post IDs |
| 12 | LOW | Phone number inconsistency | Header (both langs) | `tel:` link uses `+358400633744` but visible text shows `+358 400 234 711` (FI) / `+358 400 234711` (EN) — different numbers |
| 13 | INFO | Title format inconsistency | Homepage (both langs) | Homepage title is "Hiihtogreeni" (no site name suffix); subpages use "PageName – Hiihtogreeni" format |
| 14 | INFO | Language switcher uses base64 flag images | All pages | Flag images are base64-encoded inline, not external assets |

---

## 3. Technology Stack

| Component | Name | Version |
|-----------|------|---------|
| CMS | WordPress | 7.0.2 |
| Page Builder | Elementor | 3.23.0 |
| Page Builder Pro | Elementor Pro | 3.23.0 |
| Theme | Hello Elementor | 3.1.0 |
| Cookie Consent | CookieYes (cookie-law-info plugin) | 3.2.4 |
| Font Provider | Google Fonts | — |
| Font Family 1 | Montserrat | — |
| Font Family 2 | Fira Sans | — |

---

## 4. Asset Inventory

### 4.1 Favicons

| Type | Path | Size |
|------|------|------|
| Favicon (32x32) | `/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-32x32.png` | 32x32 PNG |
| Favicon (192x192) | `/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-192x192.png` | 192x192 PNG |
| Apple Touch Icon | `/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-180x180.png` | 180x180 PNG |
| MS Tile | `/wp-content/uploads/2022/11/cropped-hiihtogreeni-favicon-270x270.png` | 270x270 PNG |

### 4.2 Fonts

| Font | Source | Usage |
|------|--------|-------|
| Montserrat | Google Fonts | Primary typeface |
| Fira Sans | Google Fonts | Secondary typeface |

### 4.3 Plugins Detected

| Plugin | Purpose | Detection Method |
|--------|---------|-----------------|
| Elementor | Page builder | HTML source comments |
| Elementor Pro | Page builder (pro) | HTML source comments |
| Hello Elementor | Theme | Theme metadata |
| CookieYes (cookie-law-info) | Cookie consent | Script references |

---

## 5. Navigation Structure

### 5.1 Finnish Navigation

| Order | Label | URL | Sitemap Match |
|-------|-------|-----|---------------|
| 1 | Etusivu | `/` | Yes |
| 2 | Mökki | `/mokki/` | Yes |
| 3 | Kuvagalleria | `/kuvagalleria/` | Yes |
| 4 | Hinnoittelu | `/hinnoittelu/` | Yes |
| 5 | Yhteystiedot | `/yhteystiedot/` | Yes |

### 5.2 English Navigation

| Order | Label | URL | Sitemap Match |
|-------|-------|-----|---------------|
| 1 | Home | `/en/home/` | Yes |
| 2 | Cabin | `/en/cabin/` | Yes |
| 3 | Photo Gallery | `/en/photo-gallery/` | Yes |
| 4 | Rates | `/en/rates/` | Yes |
| 5 | Contact Information | `/en/contact-information/` | Yes |

### 5.3 Navigation Notes

- `/en/gallery/` is **NOT** in English navigation — orphan/stale page
- Finnish "Kuvagalleria" (`/kuvagalleria/`) has no direct English nav equivalent; EN has both `/en/gallery/` and `/en/photo-gallery/`
- Language switcher on Finnish non-home pages links English to `/en/home/` (generic), not the page-specific translation

---

## 6. Language Alternate Mapping (hreflang)

| Finnish Page | fi hreflang | en hreflang | Notes |
|-------------|-------------|-------------|-------|
| `/` | self | `/en/home/` | Only page pair with full hreflang |
| `/mokki/` | NONE | NONE | Missing cross-language link |
| `/kuvagalleria/` | NONE | NONE | Missing cross-language link; ambiguous EN target (`/en/gallery/` or `/en/photo-gallery/`?) |
| `/hinnoittelu/` | NONE | NONE | Missing cross-language link |
| `/yhteystiedot/` | NONE | NONE | Missing cross-language link |

| English Page | en hreflang | fi hreflang | Notes |
|-------------|-------------|-------------|-------|
| `/en/home/` | self | `/` | Only page pair with full hreflang |
| `/en/cabin/` | NONE | NONE | Missing cross-language link |
| `/en/gallery/` | NONE | NONE | Orphan; no FI equivalent identified |
| `/en/photo-gallery/` | NONE | NONE | Missing cross-language link |
| `/en/rates/` | NONE | NONE | Missing cross-language link |
| `/en/contact-information/` | NONE | NONE | Missing cross-language link |

---

## 7. WordPress Endpoints Requiring Treatment

These endpoints are exposed and should be handled (redirected, blocked, or preserved) during migration:

| Endpoint | Type | Action Needed |
|----------|------|---------------|
| `/wp-admin/` | Admin panel | Block/404 (already disallowed in robots.txt) |
| `/wp-admin/admin-ajax.php` | AJAX handler | Block/404 (allowed in robots.txt for WP) |
| `/wp-json/` | REST API root | Block or redirect |
| `/wp-json/wp/v2/*` | REST API endpoints | Block or redirect |
| `/feed/` | RSS feed (FI) | Redirect or preserve if needed |
| `/comments/feed/` | Comments RSS (FI) | Redirect or 404 |
| `/en/feed/` | RSS feed (EN) | Redirect or preserve if needed |
| `/en/comments/feed/` | Comments RSS (EN) | Redirect or 404 |
| `/?p=XX` | Shortlink/permalink | Set up 301 redirects for all post IDs |
| `/wp-sitemap.xml` | Sitemap index | Replace with new sitemap |
| `/wp-sitemap-posts-page-1.xml` | FI sitemap | Replace |
| `/en/wp-sitemap-posts-page-1.xml` | EN sitemap | Replace |
| `/wp-sitemap-index-0.xsl` | Sitemap stylesheet | Remove |
| `/wp-content/uploads/` | Media uploads | Migrate or redirect |
| `/wp-content/plugins/` | Plugin assets | Remove/redirect |
| `/wp-content/themes/` | Theme assets | Remove/redirect |
| oEmbed endpoints (`/wp-json/oembed/`) | oEmbed discovery | Block or 404 |

---

## 8. Contact Information Extracted

| Field | Value |
|-------|-------|
| Phone (tel link) | `+358400633744` |
| Phone (visible FI) | `+358 400 234 711` |
| Phone (visible EN) | `+358 400 234711` |
| Email | `hiihtogreeni@hiihtogreeni.fi` |
| Address | Puttipolku 4, 99130 LEVI |

**Note:** The `tel:` link number (`+358400633744`) does not match the visible phone numbers (`+358 400 234 711`). This is a data integrity issue that should be resolved during migration.

---

## 9. Redirect & URL Behavior

| Observation | Detail |
|-------------|--------|
| Trailing slashes | All URLs use trailing slashes |
| WWW prefix | All canonical URLs use `www.` subdomain |
| HTTPS | All URLs served over HTTPS |
| URL structure (FI) | Flat: `/{slug}/` |
| URL structure (EN) | Prefixed: `/en/{slug}/` |
| Homepage (FI) | Root `/` |
| Homepage (EN) | `/en/home/` (not `/en/`) |

---

## 10. Accessibility Observations

| Feature | Status | Detail |
|---------|--------|--------|
| Skip link | Present | "Mene sisältöön" (FI) / "Skip to content" (EN) |
| Semantic h1 | Missing | All pages use h2 for site title |
| ARIA landmarks | Not assessed | Requires deeper audit |
| Alt text on images | Not assessed | Requires deeper audit |

---

## 11. Page-to-Page Translation Mapping (Inferred)

Based on navigation order and content purpose:

| Finnish Page | English Page | Confidence | Notes |
|-------------|-------------|------------|-------|
| `/` (Etusivu) | `/en/home/` (Home) | HIGH | Confirmed by hreflang |
| `/mokki/` (Mökki) | `/en/cabin/` (Cabin) | HIGH | Same nav position, direct translation |
| `/kuvagalleria/` (Kuvagalleria) | `/en/photo-gallery/` (Photo Gallery) | MEDIUM | Same nav position; `/en/gallery/` also exists as stale orphan |
| `/hinnoittelu/` (Hinnoittelu) | `/en/rates/` (Rates) | HIGH | Same nav position, direct translation |
| `/yhteystiedot/` (Yhteystiedot) | `/en/contact-information/` (Contact Information) | HIGH | Same nav position, direct translation |

---

## 12. Migration Checklist (Derived from Baseline)

- [ ] Migrate all 5 Finnish pages with content
- [ ] Migrate all 5 English nav pages with content
- [ ] Decide fate of `/en/gallery/` (orphan stale page) — redirect to `/en/photo-gallery/` or 404
- [ ] Add meta descriptions to all pages
- [ ] Add Open Graph tags to all pages
- [ ] Add Twitter Card tags to all pages
- [ ] Add JSON-LD structured data (at minimum: Organization, LocalBusiness, WebPage)
- [ ] Replace h2 site title with semantic h1 on all pages
- [ ] Add hreflang alternates to ALL page pairs (currently only on homepages)
- [ ] Resolve phone number inconsistency (tel link vs visible text)
- [ ] Set up 301 redirects for all `/?p=XX` shortlinks
- [ ] Block/redirect WordPress REST API endpoints
- [ ] Block/redirect RSS feed endpoints
- [ ] Migrate favicon assets and update paths
- [ ] Migrate Google Fonts (Montserrat + Fira Sans)
- [ ] Preserve trailing slash URL convention
- [ ] Preserve `www.` subdomain convention
- [ ] Update robots.txt for new platform
- [ ] Generate new XML sitemaps
- [ ] Preserve skip link accessibility feature
- [ ] Remove WordPress generator meta tag
- [ ] Remove shortlink link tags

---

*Report generated 2026-07-19. This document serves as the authoritative pre-migration baseline for hiihtogreeni.fi. All post-migration audits should compare against this report.*
