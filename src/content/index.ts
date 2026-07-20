export * from "./types.ts";
export * from "./shared.ts";
export * from "./fi.ts";
export * from "./en.ts";

import type { Lang, NavItem, UILabels, FormStrings } from "./types.ts";
import { FI_NAV, FI_UI, FI_FORM_STRINGS } from "./fi.ts";
import { EN_NAV, EN_UI, EN_FORM_STRINGS } from "./en.ts";

/** Resolve the navigation items for a language. */
export function getNav(lang: Lang): NavItem[] {
  return lang === "fi" ? FI_NAV : EN_NAV;
}

/** Resolve the shared shell UI labels for a language. */
export function getUI(lang: Lang): UILabels {
  return lang === "fi" ? FI_UI : EN_UI;
}

/** Resolve the localized contact-form runtime strings for a language. */
export function getFormStrings(lang: Lang): FormStrings {
  return lang === "fi" ? FI_FORM_STRINGS : EN_FORM_STRINGS;
}
