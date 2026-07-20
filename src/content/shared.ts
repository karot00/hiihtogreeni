import type { ContactPerson, ExternalLinks, LanguageOption } from "./types.ts";

export const COMPANY = {
  name: "Levin Hiihtogreeni Oy",
  vatId: "FI19085526",
  address: {
    street: "Puttipolku 4",
    postalCode: "99130",
    city: "LEVI",
    country: "Finland",
  },
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

export const EXTERNAL_LINKS: ExternalLinks = {
  greenFee: "https://greenfee.levifinland.fi",
  leviFi: "https://www.levifinland.fi/fi/blog/levin-hiihtogreeni",
  leviEn: "https://www.levifinland.fi/en/blog/levin-hiihtogreeni",
} as const;

export const RATES_PDF = {
  href: "/wp-content/uploads/2022/10/Varausehdot2020.pdf",
  label: "Varausehdot2020.pdf",
} as const;

/**
 * Language options for the page-aware switcher. Order is stable across the site.
 * `hrefLang` matches the document language emitted by each root layout.
 */
export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { key: "fi", short: "FI", name: "Suomi", hrefLang: "fi" },
  { key: "en", short: "EN", name: "English", hrefLang: "en-GB" },
] as const;
