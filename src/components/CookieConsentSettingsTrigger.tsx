"use client";

import type { Lang } from "../content/types.ts";
import { getCookieConsentCopy } from "../content/index.ts";
import { useCookieConsent } from "../lib/cookie-consent/context.tsx";

interface CookieConsentSettingsTriggerProps {
  lang: Lang;
}

/**
 * Footer link that reopens the cookie preferences dialog after the visitor's
 * first choice. Styled to match the surrounding footer links on the dark
 * pine background.
 */
export function CookieConsentSettingsTrigger({
  lang,
}: CookieConsentSettingsTriggerProps) {
  const copy = getCookieConsentCopy(lang);
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      aria-label={copy.settingsTriggerAriaLabel}
      className="rounded-[var(--radius-control)] text-sm underline-offset-2 hover:underline focus-visible:underline"
    >
      {copy.settingsTrigger}
    </button>
  );
}
