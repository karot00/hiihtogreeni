"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../content/types.ts";
import { getUI } from "../content/index.ts";

interface CookieConsentProps {
  lang: Lang;
}

const CONSENT_STORAGE_KEY = "hg-consent";

/**
 * Reserved boundary for the future cookie consent banner. The actual consent
 * UI (accept/reject + settings) is deferred; this component only establishes a
 * stable mount point and persists a stub consent flag so the boundary is real
 * and scriptable. Renders nothing once a choice has been recorded.
 */
export function CookieConsent({ lang }: CookieConsentProps) {
  const ui = getUI(lang);
  const [needsChoice, setNeedsChoice] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      // Deliberate post-mount read: avoids SSR/hydration mismatch on storage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNeedsChoice(window.localStorage.getItem(CONSENT_STORAGE_KEY) === null);
    } catch {
      setNeedsChoice(false);
    }
  }, []);

  if (needsChoice !== true) return null;

  const acknowledge = () => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "deferred");
    } catch {
      /* storage unavailable — boundary still dismisses for this view */
    }
    setNeedsChoice(false);
  };

  return (
    <div
      role="region"
      aria-label={ui.cookieSettings}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-frost/70 bg-white px-4 py-4 shadow-overlay"
    >
      <div className="container-page flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink">{ui.cookieSettings}</p>
        <button
          type="button"
          onClick={acknowledge}
          className="inline-flex min-h-11 items-center rounded-[var(--radius-control)] bg-fjord-dark px-4 font-display text-sm font-semibold text-white transition-colors hover:bg-fjord focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fjord"
        >
          {ui.cookieSettings}
        </button>
      </div>
    </div>
  );
}
