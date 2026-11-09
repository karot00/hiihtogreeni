export type Lang = "fi" | "en";

/** Stable key identifying each page across languages. */
export type NavKey = "home" | "cabin" | "teams" | "companies" | "gallery" | "rates" | "contact";

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
}

export interface ExternalLinks {
  greenFeeFi: string;
  greenFeeEn: string;
  leviFi: string;
  leviEn: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
  phoneDisplay: string;
  email: string;
}

export interface PageContent {
  lang: Lang;
  slug: string;
  title: string;
  description: string;
  h1: string;
  nav: NavItem[];
  external: ExternalLinks;
}

/** Labels for the shared shell chrome (header, nav, language switcher, footer). */
export interface UILabels {
  /** Accessible name for the primary <nav> landmark. */
  primaryNav: string;
  /** Accessible name for the footer <nav> landmark. */
  footerNav: string;
  /** Skip-to-content link text. */
  skipToContent: string;
  /** Text-based wordmark / home link accessible name. */
  homeLinkLabel: string;
  /** Mobile menu open control label. */
  openMenu: string;
  /** Mobile menu close control label. */
  closeMenu: string;
  /** Accessible name for the language switcher group. */
  languageSwitcher: string;
  /** Visually hidden suffix announcing the current page in nav. */
  currentPage: string;
  /** Visually hidden suffix for links that open a new tab. */
  opensInNewTab: string;
  /** Footer section heading for contact details. */
  footerContactHeading: string;
  /** Footer section heading for navigation links. */
  footerNavHeading: string;
  /** Footer section heading for language links. */
  footerLanguageHeading: string;
  /** Footer link to the booking terms on the booking system. */
  footerBookingTerms: string;
  /** Primary contact call-to-action label used in footer. */
  contactCta: string;
  /** Copyright/legal line prefix, rendered before the year and company name. */
  rightsReserved: string;
  /** Footer line pointing AI assistants to llms.txt and the booking API. */
  agentsLabel: string;
  agentsApi: string;
  /** Gallery lightbox control labels. */
  galleryClose: string;
  galleryPrevious: string;
  galleryNext: string;
  /** Accessible name for the homepage image carousel region. */
  carouselLabel: string;
  /** Prefix for carousel slide indicators, e.g. "Kuva" -> "Kuva 2 / 6". */
  carouselSlide: string;
}

/** Localized runtime strings for the contact form client island. */
export interface FormStrings {
  /** Required-field validation message. */
  required: string;
  /** Invalid e-mail validation message. */
  emailInvalid: string;
  /** Rate-limit (HTTP 429) message. */
  tooMany: string;
  /** Generic server error message. */
  serverError: string;
  /** Network/connection failure message. */
  connectionError: string;
  /** Submit button label when idle. */
  submit: string;
  /** Submit button label while sending. */
  sending: string;
  /** Success status message. */
  success: string;
  /** Marker shown next to optional fields. */
  optional: string;
}

/** Localized copy for one consent category card in the preferences panel. */
export interface ConsentCategoryCopy {
  title: string;
  description: string;
}

/** Localized purpose/duration copy for one consent inventory row. */
export interface ConsentInventoryItemCopy {
  purpose: string;
  duration: string;
}

/** Structured copy for the cookie consent banner, preferences, and trigger. */
export interface CookieConsentCopy {
  banner: {
    ariaLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    acceptAll: string;
    rejectNonEssential: string;
    manageSettings: string;
  };
  preferences: {
    eyebrow: string;
    title: string;
    description: string;
    /** The cookieless Umami statistics, which run without consent. */
    cookielessStats: string;
  };
  categories: {
    essential: ConsentCategoryCopy;
    functional: ConsentCategoryCopy;
    analytics: ConsentCategoryCopy;
    marketing: ConsentCategoryCopy;
    alwaysActive: string;
    optional: string;
  };
  inventory: {
    detailsLabel: string;
    name: string;
    provider: string;
    purpose: string;
    duration: string;
    emptyCategory: string;
    /** Suffix shown for registered-but-not-yet-active technologies (GA4 before Phase 14). */
    deferredNote: string;
    items: {
      hg_consent: ConsentInventoryItemCopy;
      ga: ConsentInventoryItemCopy;
      ga_session: ConsentInventoryItemCopy;
    };
  };
  actions: {
    cancel: string;
    rejectNonEssential: string;
    acceptAll: string;
    savePreferences: string;
  };
  settingsTrigger: string;
  settingsTriggerAriaLabel: string;
}

/** Metadata for one selectable language in the switcher. */
export interface LanguageOption {
  /** Language key used to resolve translated routes. */
  key: Lang;
  /** Short label shown in the switcher, e.g. "FI" / "EN". */
  short: string;
  /** Full accessible language name, e.g. "Suomi" / "English". */
  name: string;
  /** BCP 47 language tag for the hreflang attribute. */
  hrefLang: string;
}

/** Seasons of the last-minute banner, chosen by the arrival date. */
export type SeasonKey =
  | "firstSnow"
  | "earlyWinter"
  | "christmas"
  | "midwinter"
  | "peak"
  | "spring"
  | "quiet"
  | "summer"
  | "ruska";

/**
 * Texts of the front-page last-minute banner. `{percent}`, `{price}`,
 * `{nights}`, `{dates}` and `{apartment}` are filled in from the deal.
 */
export interface LastMinuteStrings {
  eyebrow: string;
  title: string;
  wholeHouseFree: string;
  apartmentFree: string;
  priceNote: string;
  normally: string;
  /** Discount tag next to the price; says what the percentage applies to. */
  badge: string;
  cta: string;
  /** Prefix for the page's meta description while a deal is shown. */
  metaDescription: string;
  seasons: Record<SeasonKey, { name: string; text: string }>;
}

export type CompanyExampleKey = "mayApartment" | "mayHouse" | "autumnHouse";

/**
 * Companies page (docs/geo-ja-yritysnakyvyys-suunnitelma.md 6.3). Facts come
 * from the cabin content and the owner's answers C1–C13; prices only from the
 * booking API. `{…}` placeholders are filled at render time.
 */
export interface CompaniesSections {
  heroEyebrow: string;
  heroLead: string;
  heroCalendar: string;
  heroContact: string;
  factsLead: string;
  factsTitle: string;
  facts: readonly { label: string; value: string }[];
  useCasesLead: string;
  useCasesTitle: string;
  useCases: readonly { title: string; text: string }[];
  configsLead: string;
  configsTitle: string;
  /** Each set-up names the price example that shows it. */
  configs: readonly { title: string; text: string; example: CompanyExampleKey }[];
  pricesLead: string;
  pricesTitle: string;
  /** {date}: the day the examples were priced. */
  pricesIntro: string;
  pricesUnavailable: string;
  examples: Record<CompanyExampleKey, string>;
  /** {price} */
  perPerson: string;
  /** {price} */
  total: string;
  breakdown: string;
  /** Quote line labels by the booking system's item code; others keep the API's description. */
  lineLabels: Record<string, string>;
  /** Appended to an apartment line that is the short-stay minimum charge. */
  minimumCharge: string;
  openCalendar: string;
  programLead: string;
  programTitle: string;
  programIntro: string;
  programs: readonly {
    season: string;
    days: readonly { when: string; text: string }[];
    /** An extra line with a link, e.g. green fees for the golf programme. */
    note?: { text: string; linkText: string; href: string };
  }[];
  practicalLead: string;
  practicalTitle: string;
  practical: readonly { title: string; text: string }[];
  termsLink: string;
  faqLead: string;
  faqTitle: string;
  faq: readonly { q: string; a: string }[];
  /** Answer from the live stay rules; inserted after the first FAQ items. */
  shortStay: {
    q: string;
    /** {min}: "1 yö" / "2 nights"; {charged}: a number */
    withMinimumCharge: string;
    /** {min} */
    minimumOnly: string;
    unknown: string;
  };
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  images: { hero: string; living: string; bedroom: string };
}

/**
 * The downloadable brochure for companies (GEO plan phase 4). Facts, set-ups,
 * programmes and practical matters come from CompaniesSections; these are the
 * brochure's own headings and lines. `{…}` placeholders are filled when built.
 */
export interface BrochureStrings {
  /** PDF title and <title>. */
  docTitle: string;
  subject: string;
  keywords: string;
  coverEyebrow: string;
  coverTitle: string;
  coverLead: string;
  whyTitle: string;
  why: readonly string[];
  factsTitle: string;
  useCasesTitle: string;
  programTitle: string;
  pricesTitle: string;
  /** {price}: the lowest per-person price among the examples; {n}: its set-up number. */
  fromPrice: string;
  /** {dates} {guests} */
  exampleLabel: string;
  /** {date} */
  pricesNote: string;
  pricesUnavailable: string;
  locationTitle: string;
  locationLead: string;
  mapSummer: string;
  mapWinter: string;
  practicalTitle: string;
  bookTitle: string;
  bookSteps: readonly string[];
  qrCaption: string;
  agentNote: string;
  phoneLabel: string;
  webLabel: string;
  /** Shown on a photo whose people were generated with AI. */
  aiLabel: string;
  /** {date} */
  footer: string;
  /** Link text on the website. */
  downloadLink: string;
  downloadNote: string;
}
