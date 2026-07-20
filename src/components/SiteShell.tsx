import type { Lang, NavKey } from "../content/types.ts";
import { getUI } from "../content/index.ts";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import { CookieConsent } from "./CookieConsent.tsx";
import { JsonLd } from "./JsonLd.tsx";

interface SiteShellProps {
  lang: Lang;
  /** The nav key of the current page, used to mark active nav/switcher state. */
  activeKey?: NavKey;
  children: React.ReactNode;
}

/**
 * Shared site shell: skip link, semantic header, main landmark, footer, and
 * the reserved cookie-consent boundary. Pages pass their `activeKey` so active
 * states render correctly. Server component — the only client islands are the
 * mobile nav disclosure and the cookie-consent boundary.
 */
export function SiteShell({ lang, activeKey, children }: SiteShellProps) {
  const ui = getUI(lang);

  return (
    <>
      <a href="#main" className="skip-link">
        {ui.skipToContent}
      </a>
      <Header lang={lang} activeKey={activeKey} />
      <main id="main">{children}</main>
      <Footer lang={lang} />
      <CookieConsent lang={lang} />
      <JsonLd lang={lang} />
    </>
  );
}
