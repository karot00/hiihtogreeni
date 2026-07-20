export * from "./types.ts";
export * from "./shared.ts";
export * from "./fi.ts";
export * from "./en.ts";

import type { Lang, NavItem, UILabels } from "./types.ts";
import { FI_NAV, FI_UI } from "./fi.ts";
import { EN_NAV, EN_UI } from "./en.ts";

/** Resolve the navigation items for a language. */
export function getNav(lang: Lang): NavItem[] {
  return lang === "fi" ? FI_NAV : EN_NAV;
}

/** Resolve the shared shell UI labels for a language. */
export function getUI(lang: Lang): UILabels {
  return lang === "fi" ? FI_UI : EN_UI;
}
