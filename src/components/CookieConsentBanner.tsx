"use client";

import type { Lang } from "../content/types.ts";
import { getCookieConsentCopy } from "../content/index.ts";
import { useCookieConsent } from "../lib/cookie-consent/context.tsx";

interface CookieConsentBannerProps {
  lang: Lang;
}

const PRIMARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] bg-fjord-dark px-4 font-display text-sm font-semibold text-white transition-colors hover:bg-pine focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";
const SECONDARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] border border-fjord px-4 font-display text-sm font-semibold text-fjord-dark transition-colors hover:bg-fjord/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";
const GHOST_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-control)] px-4 font-display text-sm font-semibold text-fjord-dark underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord";

/**
 * First-visit cookie banner. Renders only while no consent choice has been
 * recorded in the `hg_consent` cookie. Ported from levifinland2026 and
 * restyled with this project's tokens.
 */
export function CookieConsentBanner({ lang }: CookieConsentBannerProps) {
  const copy = getCookieConsentCopy(lang);
  const { isBannerVisible, acceptAll, rejectNonEssential, openSettings } =
    useCookieConsent();

  if (!isBannerVisible) {
    return null;
  }

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-50 border-t border-frost/70 bg-white px-4 py-4 shadow-overlay sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[min(26rem,calc(100vw-2.5rem))] sm:rounded-[var(--radius-card)] sm:border sm:px-5 sm:py-5"
      aria-live="polite"
      aria-label={copy.banner.ariaLabel}
    >
      <p className="eyebrow">{copy.banner.eyebrow}</p>
      <h2 className="mt-1 font-display text-base font-bold text-ink">
        {copy.banner.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        {copy.banner.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={PRIMARY_BUTTON} onClick={acceptAll}>
          {copy.banner.acceptAll}
        </button>
        <button
          type="button"
          className={SECONDARY_BUTTON}
          onClick={rejectNonEssential}
        >
          {copy.banner.rejectNonEssential}
        </button>
        <button type="button" className={GHOST_BUTTON} onClick={openSettings}>
          {copy.banner.manageSettings}
        </button>
      </div>
    </aside>
  );
}
