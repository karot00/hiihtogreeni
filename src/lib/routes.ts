export const ROUTES = {
  fi: {
    home: "/",
    cabin: "/mokki/",
    gallery: "/kuvagalleria/",
    rates: "/hinnoittelu/",
    contact: "/yhteystiedot/",
  },
  en: {
    home: "/en/home/",
    cabin: "/en/cabin/",
    gallery: "/en/photo-gallery/",
    rates: "/en/rates/",
    contact: "/en/contact-information/",
  },
} as const;

import { APP_REDIRECTS } from "./redirects.ts";

export const MIGRATION_REDIRECTS = APP_REDIRECTS.map((r) => ({
  source: r.source,
  destination: r.destination,
  permanent: r.permanent,
})) as Array<{ source: string; destination: string; permanent: boolean }>;

export type Language = "fi" | "en";
export type RouteKey = keyof typeof ROUTES.fi;

/** Add a trailing slash to a route path (root "/" is already canonical). */
function withTrailingSlash(path: string): string {
  if (path === "/") return path;
  return path.endsWith("/") ? path : `${path}/`;
}

/** Canonical trailing-slash href for a page in a given language. */
export function getHref(lang: Language, route: RouteKey): string {
  return withTrailingSlash(ROUTES[lang][route]);
}

/** Canonical trailing-slash href of the translated page in the target language. */
export function getTranslation(fromLang: Language, fromRoute: RouteKey, toLang: Language): string {
  return getHref(toLang, fromRoute);
}

export function getAlternateLanguages(currentLang: Language): Language[] {
  return currentLang === "fi" ? ["en"] : ["fi"];
}
