export type Lang = "fi" | "en";

/** Stable key identifying each page across languages. */
export type NavKey = "home" | "cabin" | "teams" | "gallery" | "rates" | "contact";

export interface NavItem {
  key: NavKey;
  label: string;
  href: string;
}

export interface ExternalLinks {
  greenFee: string;
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
  /** Primary contact call-to-action label used in footer. */
  contactCta: string;
  /** Copyright/legal line prefix, rendered before the year and company name. */
  rightsReserved: string;
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
