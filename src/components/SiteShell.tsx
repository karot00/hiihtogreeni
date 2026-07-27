import type { Lang, NavKey } from "../content/types.ts";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { CookieConsentProvider } from "../lib/cookie-consent/context.tsx";
import { CookieConsentBanner } from "./CookieConsentBanner.tsx";
import { CookieConsentPreferences } from "./CookieConsentPreferences.tsx";
import { GoogleAnalytics } from "./GoogleAnalytics.tsx";
import { JsonLd } from "./JsonLd.tsx";

interface SiteShellProps {
  lang: Lang;
  /** The nav key of the current page, used to mark active nav/switcher state. */
  activeKey?: NavKey;
  children: React.ReactNode;
}

/**
 * Hero image per page, used to preload the LCP image during HTML parse.
 * Maps to the optimized /hero/* assets generated for the LCP element.
 */
const HERO_KEY: Record<Lang, Partial<Record<NavKey, string>>> = {
  fi: { home: "home-fi", cabin: "cabin", teams: "teams", gallery: "gallery", rates: "rates", contact: "contact" },
  en: { home: "home-en", cabin: "cabin", teams: "teams", gallery: "gallery", rates: "rates", contact: "contact" },
};

/**
 * Shared site shell: skip link, semantic header, main landmark, footer, and
 * the cookie-consent boundary (provider + banner + preferences dialog ported
 * from levifinland2026). Pages pass their `activeKey` so active states render
 * correctly. Server component — the only client islands are the mobile nav
 * disclosure and the cookie-consent components.
 */
export function SiteShell({ lang, activeKey, children }: SiteShellProps) {
  const heroKey = activeKey ? HERO_KEY[lang]?.[activeKey] : undefined;
  const heroAvif = heroKey ? `/hero/${heroKey}.avif` : undefined;
  return (
    <CookieConsentProvider>
      {heroAvif ? (
        <link rel="preload" as="image" href={heroAvif} type="image/avif" fetchPriority="high" />
      ) : null}
      <Header lang={lang} activeKey={activeKey} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <CookieConsentBanner lang={lang} />
      <CookieConsentPreferences lang={lang} />
      <GoogleAnalytics lang={lang} />
      <JsonLd lang={lang} />
    </CookieConsentProvider>
  );
}
