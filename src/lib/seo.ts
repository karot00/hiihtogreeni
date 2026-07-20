import type { Metadata } from "next";
import { SITE_CONFIG } from "./config.ts";
import { ROUTES } from "./routes.ts";
import type { Lang, NavKey } from "../content/types.ts";

/** Absolute URL for a social-sharing (Open Graph / Twitter) image in /public/og. */
function ogImageUrl(file: string): string {
  return `${SITE_CONFIG.url}/og/${file}`;
}

/** Approved social-sharing images generated in Phase 3. */
export const OG_IMAGES = {
  default: ogImageUrl("default.jpg"),
  homeFi: ogImageUrl("home-fi.jpg"),
  homeEn: ogImageUrl("home-en.jpg"),
} as const;

/**
 * Canonical absolute URLs for each page pair, keyed by route key.
 * Finnish URLs use the root, English URLs live under /en/.
 */
const CANONICAL_PATHS: Record<NavKey, { fi: string; en: string }> = {
  home: { fi: ROUTES.fi.home, en: ROUTES.en.home },
  cabin: { fi: ROUTES.fi.cabin, en: ROUTES.en.cabin },
  gallery: { fi: ROUTES.fi.gallery, en: ROUTES.en.gallery },
  rates: { fi: ROUTES.fi.rates, en: ROUTES.en.rates },
  contact: { fi: ROUTES.fi.contact, en: ROUTES.en.contact },
};

/** Absolute canonical URL for a page in a given language. */
export function canonicalUrl(lang: Lang, key: NavKey): string {
  const path = CANONICAL_PATHS[key][lang];
  return `${SITE_CONFIG.url}${path}`;
}

/**
 * Reciprocal hreflang alternates for a page pair, including an `x-default`
 * that points to the Finnish (primary) version of the same page.
 */
export function languageAlternates(key: NavKey): Record<string, string> {
  const fi = canonicalUrl("fi", key);
  const en = canonicalUrl("en", key);
  return {
    fi,
    "en-GB": en,
    "x-default": fi,
  };
}

interface PageSeoInput {
  lang: Lang;
  key: NavKey;
  title: string;
  description: string;
  /** Open Graph image absolute URL or null to inherit layout default. */
  ogImage?: string;
}

/**
 * Build the per-page Metadata for a canonical page: self-referencing absolute
 * canonical, reciprocal language alternates for the translation pair (with
 * x-default), and title/description. `metadataBase` is set on the root layouts,
 * so canonical/alternate values are emitted as absolute URLs regardless.
 */
export function buildPageMetadata({
  lang,
  key,
  title,
  description,
  ogImage,
}: PageSeoInput): Metadata {
  const url = canonicalUrl(lang, key);
  const locale = lang === "fi" ? "fi_FI" : "en_GB";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(key),
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale,
      siteName: SITE_CONFIG.name,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}
