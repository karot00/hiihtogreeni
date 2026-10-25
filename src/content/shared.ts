import type { ContactPerson, ExternalLinks, Lang, LanguageOption } from "./types.ts";

export const COMPANY = {
  name: "Levin Hiihtogreeni Oy",
  vatId: "FI19085526",
  address: {
    street: "Puttipolku 4",
    postalCode: "99130",
    city: "LEVI",
    country: "Finland",
  },
  // The Google Business Profile pin, same as cabins.levifinland.fi (owner, 2026-09-29).
  geo: { latitude: 67.801561, longitude: 24.900871 },
  airportDistance: "16 km (n. 20 min) Kittilän lentoasemalta",
  builtYear: 2006,
} as const;

export const RENTAL_CONTACT: ContactPerson = {
  name: "Karo Tammela",
  phone: "+358500633744",
  phoneDisplay: "+358 500 633 744",
  email: "hiihtogreeni@hiihtogreeni.fi",
};

export const MAINTENANCE_CONTACT: ContactPerson = {
  name: "Jens Pitkänen",
  phone: "+358443456001",
  phoneDisplay: "+358 44 345 6001",
  email: "jens.pitkanen@aavalevi.fi",
};

export const CAPACITY = {
  apartments: 2,
  guestsPerApartment: 14,
  bedrooms: 7,
  bathrooms: 7,
  area: "150 m²",
} as const;

/** Booking terms v1.3 §8 (cabins.levifinland.fi): no late check-out, early check-in on request. */
export const STAY_TIMES = {
  checkIn: "17:00",
  checkOut: "11:00",
} as const;

export const EXTERNAL_LINKS: ExternalLinks = {
  greenFee: "https://greenfee.levifinland.fi",
  leviFi: "https://www.levifinland.fi/fi/blog/levin-hiihtogreeni",
  leviEn: "https://www.levifinland.fi/en/blog/levin-hiihtogreeni",
} as const;

/**
 * The booking calendar and inquiry form are the cabins.levifinland.fi booking
 * system (levifinland2026 repo); this site shows its widget in an iframe, so
 * the calendar and booking flow are maintained in one place.
 * NEXT_PUBLIC_BOOKING_ORIGIN points it at another deployment for testing.
 */
export const BOOKING_ORIGIN =
  process.env.NEXT_PUBLIC_BOOKING_ORIGIN || "https://cabins.levifinland.fi";
export const bookingEmbedUrl = (lang: Lang) => `${BOOKING_ORIGIN}/embed/${lang}/hiihtogreeni`;
export const bookingPageUrl = (lang: Lang) => `${BOOKING_ORIGIN}/${lang}/hiihtogreeni`;
export const bookingTermsUrl = (lang: Lang) => `${BOOKING_ORIGIN}/${lang}/hiihtogreeni/terms`;

/**
 * Language options for the page-aware switcher. Order is stable across the site.
 * `hrefLang` matches the document language emitted by each root layout.
 */
export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { key: "fi", short: "FI", name: "Suomi", hrefLang: "fi" },
  { key: "en", short: "EN", name: "English", hrefLang: "en-GB" },
] as const;
