import { ROUTES } from "../../src/lib/routes.ts";
import { SITE_CONFIG } from "../../src/lib/config.ts";

export interface PageSmokeFixture {
  /** Trailing-slash canonical path. */
  path: string;
  /** Expected html lang attribute: `fi` or `en-GB`. */
  lang: "fi" | "en";
  /** Exact title as published by the page metadata. */
  title: string;
  /** Canonical host; must equal the production www host. */
  canonicalHost: string;
}

/**
 * Single source of truth for page-level smoke assertions. Each entry pairs a
 * canonical path with its expected document language and exact title, plus the
 * production canonical host. The live test renders the production build and
 * asserts `200`, correct `lang`, exact `title`, self-canonical production URL,
 * exactly one `h1`, no `noindex`, and the full reciprocal hreflang set.
 */
export const PAGE_SMOKE_FIXTURES: PageSmokeFixture[] = [
  { path: ROUTES.fi.home, lang: "fi", title: "Hiihtogreeni - Vuokramökki Levillä", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.fi.cabin, lang: "fi", title: "Mökki - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.fi.gallery, lang: "fi", title: "Kuvagalleria - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.fi.rates, lang: "fi", title: "Hinnoittelu - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.fi.contact, lang: "fi", title: "Yhteystiedot - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.en.home, lang: "en", title: "Hiihtogreeni - Cabin for Rent in Levi", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.en.cabin, lang: "en", title: "Cabin - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.en.gallery, lang: "en", title: "Photo Gallery - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.en.rates, lang: "en", title: "Rates - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
  { path: ROUTES.en.contact, lang: "en", title: "Contact Information - Hiihtogreeni", canonicalHost: "www.hiihtogreeni.fi" },
];

void SITE_CONFIG;
