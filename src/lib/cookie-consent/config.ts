import type { ConsentCategory } from "./types.ts";

export type ConsentCategoryConfig = {
  id: ConsentCategory;
  required: boolean;
};

/** Stable ids for localized purpose/duration copy in the content modules. */
export type ConsentInventoryItemId = "hg_consent" | "ga" | "ga_session";

export type ConsentInventoryItem = {
  id: ConsentInventoryItemId;
  name: string;
  provider: string;
  type: "cookie";
  category: ConsentCategory;
  required: boolean;
  /**
   * `false` marks a technology that is registered ahead of time but not yet
   * set by the site (the GA4 cookies stay deferred until Phase 14 ships the
   * tag). Deferred rows are labelled as such in the preferences table.
   */
  active: boolean;
};

export const CONSENT_CATEGORY_CONFIG: ReadonlyArray<ConsentCategoryConfig> = [
  { id: "essential", required: true },
  { id: "functional", required: false },
  { id: "analytics", required: false },
  { id: "marketing", required: false },
];

/**
 * Truthful cookie/technology inventory, built from evidence (2026-07-27
 * production scrape: no Set-Cookie headers; WordPress-era CookieYes cookies
 * confirmed retired). `functional` and `marketing` are intentionally empty —
 * the site sets nothing in those categories and no placeholder rows may be
 * invented. The two GA4 cookies are registered and active now that Phase 14
 * ships the tag (gated behind the analytics consent category + Consent Mode v2).
 */
export const CONSENT_INVENTORY: ReadonlyArray<ConsentInventoryItem> = [
  {
    id: "hg_consent",
    name: "hg_consent",
    provider: "hiihtogreeni.fi",
    type: "cookie",
    category: "essential",
    required: true,
    active: true,
  },
  {
    id: "ga",
    name: "_ga",
    provider: "Google Analytics",
    type: "cookie",
    category: "analytics",
    required: false,
    active: true,
  },
  {
    id: "ga_session",
    name: "_ga_4963QM11X1",
    provider: "Google Analytics",
    type: "cookie",
    category: "analytics",
    required: false,
    active: true,
  },
];
